import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import _cloneDeep from 'lodash/cloneDeep';
import PropTypes from 'prop-types';
import { List, Switch } from 'antd-mobile';
import PlayOperate from '../components/play-operate';
import LrcScroll from '../components/lrc-scroll';
import TimeWrap from '../components/time-wrap';
import DetailList from '../components/detail-list';
import LrcColor from '../components/lrc-color';
import {
  setModeType, setLrcSwitch,
  setLrcConfig, setLock,
  playSong, togglePlayStatus,
  setLoop } from '../store/actions'
import '../less/play-detail.less';

const lrcColorList = [                 // 歌词颜色列表数组
  {
    defaultColor: "#b2f5b5",
    activeColor: "#d1c90e",
    currentImgSrc: "/current-type1.png"
  },
  {
    defaultColor: "#c1f3dc",
    activeColor: "#33a3f5",
    currentImgSrc: "/current-type2.png"
  },
  {
    defaultColor: "#a0f533",
    activeColor: "#f32d2d",
    currentImgSrc: "/current-type3.png"
  },
  {
    defaultColor: "#eff366",
    activeColor: "#21d10e",
    currentImgSrc: "/current-type4.png"
  },
  {
    defaultColor: "#efe8b2",
    activeColor: "#d200d2",
    currentImgSrc: "/current-type5.png"
  }
]
@connect(
  state => ({
    lrcConfig: state.lrcConfig,
    view: state.view,
    audio: state.audio,
    curPlaySong: state.curPlaySong,
    songList: state.songList,
    isPlayed: state.isPlayed,
    paused: state.paused,
    curPlayImgSrc: state.curPlayImgSrc,
    curPlayLrcArr: state.curPlayLrcArr,
    lock: state.lock,
    modeType: state.modeType,
    lrcSwitch: state.lrcSwitch
  }),
  dispatch => ({
    ...bindActionCreators({
      togglePlayStatus,
      setModeType,
      setLrcSwitch,
      setLrcConfig,
      setLock,
      playSong,
      setLoop
    }, dispatch)
  })
)
class PlayDetail extends Component {
  static propTypes = {
    showDetail: PropTypes.bool,
    setShowDetail: PropTypes.func.isRequired,
    setCurrentTime: PropTypes.func.isRequired
  }
  static defaultProps = {
    showDetail: false
  }
  constructor() {
    super();
    this.progressTimer = null;        // 控制进度条的定时器
    this.rollTimer = null;            // 控制歌词滚动的定时器
    this.endTime = 0;                 // 歌曲结束时间(秒为单位)
    this.progressSpeed = 0;           // 进度条前进的速度
    this.modeSwitch = false;          // 防止连续点击
    this.mode = 1;                    // 初始化播放模式的数字
    this.state = {
      isShowList: false,              // 是否显示歌曲列表
      curPlayTime: 0,                 // 当前播放时间(秒为单位)
      progress: 0,                    // 当前歌曲播放进度
      translateY: 0,                  // 歌词滚动的距离
      modeTip: '顺序播放',            // 播放模式提示
      showModeTip: false,             // 是否显示提示
      currentImgSrc: "",              // 当前颜色的背景图
      isShowColorList: false          // 是否显示颜色列表
    }
  }
  componentWillMount() {
    this.init();
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.isPlayed !== nextProps.isPlayed) {
      if(nextProps.isPlayed) {
        this.initPlay(nextProps);
      }
    }
    if(this.props.paused !== nextProps.paused) {
      if(nextProps.paused) {
        this.clearTimer();
      }
      else {
        this.progressTimer = setTimeout(() => {
          this.progressGo();
        }, 1000);
        this.rollTimer = setTimeout(() => {
          this.lrcRoll(nextProps);
        }, 100);
      }
    }
  }
  // 根据localStorage中的数据初始化播放信息
  init() {
    let mode = 1;
    let { currentColorObj, modeType, lrcSwitch } = window.localStorage;
    if(currentColorObj) {
      currentColorObj = JSON.parse(currentColorObj);
    }
    else {
      currentColorObj = _cloneDeep(lrcColorList[0]);
    }
    console.log('init', lrcSwitch);
    if(!modeType) {
      modeType = "order";
    }
    if(modeType === "loop") {
      mode = 2;
    }
    else if(modeType === "random") {
      mode = 3;
    }
    if(lrcSwitch === 'false') {
      lrcSwitch = false;
    }
    else {
      lrcSwitch = true
    }
    this.props.setModeType(modeType);
    this.props.setLrcSwitch(lrcSwitch);
    this.props.setLrcConfig({
      defaultColor: currentColorObj.defaultColor,
      activeColor: currentColorObj.activeColor
    });

    this.mode = mode;
    this.setState({
      currentImgSrc: currentColorObj.currentImgSrc
    });
  }
  // 初始化播放信息
  initPlay(nextProps) {
    this.endTime = parseInt(nextProps.audio.duration);
    this.progressSpeed = Number((100 / this.endTime).toFixed(2));
    this.props.setCurrentTime.bind(this, 0);
    this.setState({
      progress: 0,
      curPlayTime: 0
    });
    if(this.progressTimer) {
      this.clearTimer();
    }
    this.progressGo();
    this.lrcRoll(nextProps);
  }
  // 时间进度条前进
  progressGo() {
    this.setState(prevState => ({
      curPlayTime: prevState.curPlayTime + 1,
      progress: prevState.progress + this.progressSpeed
    }));
    if(this.state.progress < 100) {
      this.progressTimer = setTimeout(() => {
        this.progressGo();
      }, 1000);
    }
    else {
      this.setState({
        progress: 100,
        curPlayTime: this.endTime
      });
      this.dealMode();
    }
  }
  // 歌词滚动
  lrcRoll(nextProps) {
    const curPlayLrcArr = _cloneDeep(nextProps.curPlayLrcArr);
    const lrcLen = curPlayLrcArr.length;
    const currentTime = Number(nextProps.audio.currentTime.toFixed(2));
    for(let [index, curPlayLrc] of curPlayLrcArr.entries()) {
      if(Number(curPlayLrc.startTime) >= currentTime) {
        if(index === 0) {
          index = 1;
        }
        else if(index === lrcLen - 1) {
          index = lrcLen - 1;
        }
        this.translateLrc(index - 1);
        break;
      }
      // 为了处理点击进度条时直接点击在最后面时的情况
      else if(currentTime >= Number(curPlayLrcArr[lrcLen - 1].startTime)) {
        this.translateLrc(lrcLen - 1);
      }
    }
    if(currentTime < this.endTime) {
      this.rollTimer = setTimeout(() => {
        this.lrcRoll(nextProps);
      }, 100);
    }
    else {
      return;
    }
  }
  // 根据当前高亮歌词行的索引值来计算滚动的距离
  translateLrc(newCurLrcIndex) {
    this.props.setLrcConfig({
      activeLrcIndex: newCurLrcIndex
    });
    if(!this.props.showDetail) return;

    const prevTranslateY = this.state.translateY;
    const lrcBoxHeight = this.lrcBox.offsetHeight;
    const childHeight = this.lrcBox.firstChild.offsetHeight;
    const curShowNum = Math.floor(lrcBoxHeight / childHeight);
    const nextTranslateY = childHeight * (newCurLrcIndex - curShowNum + 1);
    if(newCurLrcIndex >= curShowNum - 1) {
      this.setState({
        translateY: childHeight * (newCurLrcIndex - curShowNum + 1)
      });
    }
    else {
      this.setState({
        translateY: 0
      });
    }
  }
  // 点击进度条更新时间
  updateProgress(evt) {
    /*
     * 这里不能写 const offsetX = evt.offsetX
     * 不知是什么原因获取不到
     */
    const parentOffsetLeft = this.progressBar.parentNode.offsetLeft;
    const offsetX = evt.pageX - parentOffsetLeft;
    const targetWidth = this.progressBar.offsetWidth;
    const newProgress = Number((offsetX / targetWidth * 100).toFixed(2));
    const newCurPlayTime = parseInt((this.endTime * newProgress / 100).toFixed(2));
    this.setState({
      progress: newProgress,
      curPlayTime: newCurPlayTime
    });
    this.props.setCurrentTime(newCurPlayTime)
    this.props.setLock(true);
  }
  // 切换播放模式
  switchMode() {
    const { showModeTip } = this.state;
    if(this.modeSwitch) return;

    let modeType = 'order';
    let modeTip = '顺序播放';
    let loop = false;
    this.mode++;
    this.modeSwitch = true;
    this.setState({
      showModeTip: true
    });
    if(this.mode % 3 === 1) {
      modeTip = "顺序播放";
      modeType = "order";
    }
    else if(this.mode % 3 === 2) {
      modeTip = "循环播放";
      modeType = "loop";
      loop = true;
    }
    else {
      modeTip = "随机播放";
      modeType = "random";
    }
    this.setState({
      modeTip
    });
    this.props.setLoop(loop);
    this.props.setModeType(modeType);
    window.localStorage.modeType = modeType;
    setTimeout(() => {
      this.modeSwitch = false;
      this.setState({
        showModeTip: false
      });
    }, 3000);
  }
  // 歌曲结束时根据播放模式来处理
  dealMode() {
    this.props.setLock(false);
    if(this.props.modeType === "random") {
      const randomIndex = Math.floor(Math.random() * this.props.songList.length);
      this.props.playSong(randomIndex)
    }
    else if(this.props.modeType === "loop") {
      this.initPlay(this.props);
    }
  }
  // 清除定时器
  clearTimer() {
    clearTimeout(this.progressTimer);
    clearTimeout(this.rollTimer);
  }
  // 点击列表时播放歌曲
  playSong(curPlayIndex) {
    this.props.playSong(curPlayIndex);
    this.setState({
      isShowList: false
    });
  }
  // 点击改变歌词颜色
  changeLrcColor(index) {
    const currentItem = _cloneDeep(lrcColorList[index]);
    this.setState({
      ...currentItem,
      isShowColorList: false
    });
    this.props.setLrcConfig({
      defaultColor: currentItem.defaultColor,
      activeColor: currentItem.activeColor
    });

    // 存入localStorage中
    window.localStorage.currentColorObj = JSON.stringify(currentItem);
  }
  // 悬浮歌词开关
  toggleLrcSwitch(lrcSwitch) {
    lrcSwitch = !lrcSwitch;
    this.props.setLrcSwitch(lrcSwitch);
    window.localStorage.lrcSwitch = lrcSwitch;
  }
  // 是否显示歌曲列表
  toggleShowList() {
    this.setState(prevState => ({
      isShowList: !prevState.isShowList
    }));
  }
  // 是否显示歌词颜色列表
  toggleShowColorList() {
    this.setState(prevState => ({
      isShowColorList: !prevState.isShowColorList
    }));
  }
  render() {
    const {
      curPlaySong, curPlayImgSrc,
      curPlayLrcArr, modeType,
      showDetail, paused,
      lrcConfig, songList, lrcSwitch } = this.props;
    const {
      modeTip, isShowList, translateY,
      curPlayTime, progress, showModeTip,
      currentImgSrc, isShowColorList } = this.state;

    // 传递给 PlayOperate 组件的props
    const playOperateProps = {
      paused,
      showDetail,
      curPlaySong,
      togglePlayStatus: this.props.togglePlayStatus,
      playSong: this.props.playSong
    }
    // 传递给 LrcScrollP 组件的props
    const lrcScrollProps = {
      curPlayLrcArr,
      translateY,
      ...lrcConfig,
      lrcBoxRef: el => this.lrcBox = el
    }
    // 传递给 TimeWrap 组件的props
    const TimeWrapProps = {
      curPlayTime,
      progress,
      endTime: this.endTime,
      updateProgress: this.updateProgress.bind(this),
      progressBarRef: el => this.progressBar = el
    }
    // 传递给 DetailList 组件的props
    const DetailListProps = {
      playSong: this.playSong.bind(this),
      songList,
      curPlaySong
    }
    // 传递给 LrcColor 组件的props
    const LrcColorProps = {
      changeLrcColor: this.changeLrcColor.bind(this),
      lrcColorList
    }
    return (
      <div id = 'playDetail' className = { showDetail ? 'slideIn' : '' } style = {{ backgroundImage: 'url(' + curPlayImgSrc + ')' }}>
        <div className = "playDetail-mark"></div>
        <div className = "playDetail-top">
          <div className = "goback" onClick = { this.props.setShowDetail.bind(this, false) }></div>
          <div className = "playDetail-title">{ curPlaySong.FileName }</div>
        </div>
        <div className = "playDetail-center">
          { /* 歌词滚动组件 */ }
          <LrcScroll { ...lrcScrollProps }></LrcScroll>
        </div>
        <div className = "playDetail-bottom">
          <div className = "lrc-switch">
            { /* 歌词开关组件 */ }
            <Switch color = '#2ca2f9' checked = { lrcSwitch } onClick = { this.toggleLrcSwitch.bind(this, lrcSwitch) }></Switch>
          </div>
          <div className = "lrcColor-box">
            <div className = "cur-lrcColor" style = {{ backgroundImage: 'url(' + currentImgSrc + ')' }} onClick = { this.toggleShowColorList.bind(this) }></div>
            { /* 歌词颜色列表组件 */}
            { isShowColorList ? <LrcColor { ...LrcColorProps } /> : null }
          </div>
          { /* 时间进度条组件 */ }
          <TimeWrap { ...TimeWrapProps }></TimeWrap>
          <div className = "play-operateBox">
            <div className = { 'listen-mode order-play ' + modeType + '-play' } onClick = { this.switchMode.bind(this) }>
              { showModeTip ? <div className = "mode-tip">{ modeTip }</div> : null }
            </div>
            { /* 歌曲前进后退功能组件 */ }
            <PlayOperate { ...playOperateProps }></PlayOperate>
            <div className = "detail-list">
              <div className = { isShowList ? 'icon-list active-list' : 'icon-list' } onClick = { this.toggleShowList.bind(this) }></div>
              { /* 详情页歌曲列表组件 */ }
              { isShowList ? <DetailList { ...DetailListProps } /> : null }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayDetail;