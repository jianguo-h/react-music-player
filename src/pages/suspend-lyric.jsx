import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLrcSwitch } from '../store/actions';
import '../less/suspend-lyric.less';

@connect(
  state => ({
    canPlayed: state.canPlayed,
    curPlayLrcArr: state.curPlayLrcArr,
    lrcConfig: state.lrcConfig,
    lrcSwitch: state.lrcSwitch
  }),
  dispatch => ({
    setLrcSwitch(lrcSwitch) { dispatch(setLrcSwitch(lrcSwitch)) }
  })
)
class SuspendLyric extends Component {
  constructor() {
    super();
    this.boundary = {      // 各个边界的值
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
    this.isDrag = false;   // 判断是否处于拖拽中
    this.startX = 0;       // 鼠标按下起始位置的x坐标
    this.startY = 0;       // 鼠标按下起始位置的y坐标
    this.offsetX = 0;      // 元素在x轴上的偏移量
    this.offsetY = 0;      // 元素在y轴上的偏移量

    this.state = {
      firstLrc: {},       // 第一行的歌词
      nextLrc: {}         // 第二行的歌词
    }
  }
  /*componentDidMount() {
    this.getBoundary();
  }*/
  componentWillReceiveProps(nextProps) {
    if(nextProps.lrcSwitch && nextProps.canPlayed) {
      this.getBoundary();
      if(this.props.lrcConfig.activeLrcIndex !== nextProps.lrcConfig.activeLrcIndex) {
        this.setSuspendLrc(nextProps);
      }
    }
  }
  getBoundary() {
    const left = 0;
    const right = document.body.offsetWidth - this.suspendLyric.offsetWidth;
    const top = 0;
    const bottom = document.body.offsetHeight - this.suspendLyric.offsetHeight;
    this.boundary = Object.assign({}, this.boundary, {
      left,       // 左边界
      right,      // 右边界
      top,        // 上边界
      bottom      // 下边界
    });
  }
  // 设置上下两行歌词
  setSuspendLrc(props) {
    console.log(">>>> setSuspendLrc props", props);
    let firstLrc = null;
    let nextLrc = null;
    const { curPlayLrcArr, lrcConfig } = props;
    const activeLrcIndex = lrcConfig.activeLrcIndex;
    if(activeLrcIndex === 0) {
      firstLrc = curPlayLrcArr[0];
    }
    else if((activeLrcIndex + 1) % 2 === 0) {
      firstLrc = curPlayLrcArr[activeLrcIndex + 1];
    }
    else {
      firstLrc = curPlayLrcArr[activeLrcIndex];
    }

    if(activeLrcIndex === 0 || activeLrcIndex === 1) {
      nextLrc = curPlayLrcArr[1];
    }
    else if((activeLrcIndex + 1) % 2 === 1) {
      if(!curPlayLrcArr[activeLrcIndex + 1]) {
        nextLrc = {
          ...curPlayLrcArr[activeLrcIndex],
          index: activeLrcIndex + 1,
          curLrc: ''
        };
      }
      else {
        nextLrc = curPlayLrcArr[activeLrcIndex + 1];
      }
    }
    else {
      nextLrc = curPlayLrcArr[activeLrcIndex]
    }

    this.setState({
      firstLrc,
      nextLrc
    });
  }
  touchstart(evt) {
    this.isDrag = true;
    this.startX = evt.targetTouches[0].pageX;
    this.startY = evt.targetTouches[0].pageY;
    this.offsetX = this.suspendLyric.offsetLeft;
    this.offsetY = this.suspendLyric.offsetTop;
  }
  touchmove(evt) {
    /*if(!evt.defaultPrevented) {
      evt.preventDefault();
    }*/
    const endX = evt.targetTouches[0].pageX;
    const endY = evt.targetTouches[0].pageY;
    let endLeft = endX - this.startX + this.offsetX;
    let endTop = endY - this.startY + this.offsetY;

    if(endLeft <= this.boundary.left) {
      endLeft = this.boundary.left;
    }
    else if(endLeft >= this.boundary.right) {
      endLeft = this.boundary.right;
    }
    if(endTop <= this.boundary.top) {
      endTop = this.boundary.top;
    }
    else if(endTop >= this.boundary.bottom) {
      endTop = this.boundary.bottom;
    }

    this.suspendLyric.style.left = endLeft + 'px';
    this.suspendLyric.style.top = endTop + 'px';
  }
  touchend() {
    this.isDrag = false;
  }
  // 关闭悬浮歌词
  close() {
    this.props.setLrcSwitch(false);
    window.localStorage.lrcSwitch = false;
  }
  render() {
    const { canPlayed, lrcConfig, lrcSwitch } = this.props;
    
    const { firstLrc, nextLrc } = this.state;
    const firstLrcStyle = {
      color: firstLrc.index === lrcConfig.activeLrcIndex ? lrcConfig.activeColor : lrcConfig.defaultColor
    };
    const nextLrcStyle = {
      color: nextLrc.index === lrcConfig.activeLrcIndex ? lrcConfig.activeColor : lrcConfig.defaultColor
    };
    return (
      <div 
        className = { canPlayed && lrcSwitch ? 'fadeIn' : '' }
        id = 'suspend-lyric' 
        ref = { el => this.suspendLyric = el }
        onTouchStart = { evt => { this.touchstart(evt) }} 
        onTouchMove = { evt => { this.touchmove(evt) }} 
        onTouchEnd = { evt => { this.touchend(evt) }}
      >
        <span className = 'close' onClick = { this.close.bind(this) }></span>
        <p style = { firstLrcStyle }>{ firstLrc.curLrc }</p>
        <p style = { nextLrcStyle }>{ nextLrc.curLrc }</p>
      </div>
    );
  }
}

export default SuspendLyric;