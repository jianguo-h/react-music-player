import { connect } from 'react-redux';
import PlayDetail from './play-detail';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PlayOperate from '../components/play-operate';
import {
  setAudio, setIsPlayed,
  playSong, togglePlayStatus } from '../store/actions';
import '../less/player.less';

@connect(
  state => ({
    audioSrc: state.audioSrc,
    loop: state.loop,
    canPlayed: state.canPlayed,
    isPlayed: state.isPlayed,
    curPlaySong: state.curPlaySong,
    curPlayImgSrc: state.curPlayImgSrc,
    paused: state.paused,
    lock: state.lock,
    modeType: state.modeType
  }),
  dispatch => ({
    ...bindActionCreators({
      togglePlayStatus,
      setAudio,
      setIsPlayed,
      playSong
    }, dispatch)
  })
)
class Player extends Component {
  constructor() {
    super();
    this.state = {
      showDetail: false
    };
  }
  setShowDetail(showDetail) {
    this.setState({
      showDetail
    });
  }
  setCurrentTime(time) {
    this.audio.currentTime = time;
    console.log(this.audio.currentTime);
  }
  canplay() {
    const { lock } = this.props;
    if(lock) return;

    const audio = this.audio;
    if(audio.readyState === 4) {
      audio.play();
      this.props.setAudio(audio);
      this.props.setIsPlayed(true);
    }
    else {
      window.Toast.fail('歌曲暂时无法播放, 请稍后重试');
    }
  }
  ended() {
    const { modeType, curPlaySong } = this.props;
    if(modeType !== "order") return;

    const nextPlayIndex = curPlaySong.index + 1;
    this.props.playSong(nextPlayIndex);
  }
  render() {
    const {
      canPlayed, audioSrc,
      loop, curPlayImgSrc,
      isPlayed, paused, curPlaySong } = this.props;

    // 传递给 PlayOperate 组件的props
    const playOperateProps = {
      paused,
      showDetail: this.state.showDetail,
      curPlaySong,
      togglePlayStatus: this.props.togglePlayStatus,
      playSong: this.props.playSong
    }

    const playDetailProps = {
      showDetail: this.state.showDetail,
      setShowDetail: this.setShowDetail.bind(this),
      setCurrentTime: this.setCurrentTime.bind(this)
    }

    let footerSingerClass = 'footer-singer';
    footerSingerClass = isPlayed ? footerSingerClass + ' rotate' : footerSingerClass;
    footerSingerClass = paused ? footerSingerClass + ' paused' : footerSingerClass;
    return canPlayed ? (
      <div id = "player" className = 'fade'>
        <div className = "footer-play" style = {{ visibility: !this.state.showDetail ? 'visible' : 'hidden' }}>
          <div className = "footer-left" onClick = { this.setShowDetail.bind(this, true) }>
            <div className = { footerSingerClass }>
              <img src = { curPlayImgSrc } alt = '歌手图片' />
            </div>
            <div className = "footer-playerInfo">
              <p className = "song-name">{ curPlaySong.SongName }</p>
              <p className = "singer-name">{ curPlaySong.SingerName }</p>
            </div>
          </div>
          <div className = "footer-right">
            <PlayOperate { ...playOperateProps }></PlayOperate>
          </div>
        </div>
        { /* 播放详情组件 */ }
        <PlayDetail { ...playDetailProps }></PlayDetail>
        <div className = "audio">
          <audio src = { audioSrc }
            loop = { loop }
            ref = { el => this.audio = el }
            onCanPlay = { this.canplay.bind(this) }
            onEnded = { this.ended.bind(this) }>
          </audio>
        </div>
      </div>
    ) : null;
  }
}

export default Player;