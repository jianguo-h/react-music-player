import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  setShowDetail, setAudio, 
  setIsPlayed, playSong } from '../store/actions';
import '../less/player.less';

@connect(
  state => ({
    audioSrc: state.audioSrc,
    loop: state.loop,
    canPlayed: state.canPlayed,
    isPlayed: state.isPlayed,
    showDetail: state.showDetail,
    curPlaySong: state.curPlaySong,
    curPlayImgSrc: state.curPlayImgSrc,
    paused: state.paused,
    lock: state.lock,
    modeType: state.modeType
  }),
  dispatch => ({
    setShowDetail(showDetail) { dispatch(setShowDetail(showDetail)); },
    setAudio(audio) { dispatch(setAudio(audio)); },
    setIsPlayed(isPlayed) { dispatch(setIsPlayed(isPlayed)); },
    playSong(curPlayIndex) { dispatch(playSong(curPlayIndex)); },
  })
)
class Player extends Component {
  constructor() {
    super();
    this.canplay = this.canplay.bind(this);
    this.ended = this.ended.bind(this);
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
      showDetail, isPlayed, 
      paused, curPlaySong } = this.props;
    let footerSingerClass = 'footer-singer';
    footerSingerClass = isPlayed ? footerSingerClass + ' rotate' : footerSingerClass;
    footerSingerClass = paused ? footerSingerClass + ' paused' : footerSingerClass;
    return canPlayed ? (
      <div id = "player" className = 'fade'>
        <div className = "footer-play" style = {{ visibility: !showDetail ? 'visible' : 'hidden' }}>
          <div className = "footer-left" onClick = { this.props.setShowDetail.bind(this, true) }>
            <div className = { footerSingerClass }>
              <img src = { curPlayImgSrc } alt = '歌手图片' />
            </div>
            <div className = "footer-playerInfo">
              <p className = "song-name">{ curPlaySong.SongName }</p>
              <p className = "singer-name">{ curPlaySong.SingerName }</p>
            </div>
          </div>
        </div>
        <div className = "audio">
          <audio src = {audioSrc }
            loop = { loop }
            ref = { el => this.audio = el } 
            onCanPlay = { this.canplay } 
            onEnded = { this.ended }>
          </audio>
        </div>
      </div>
    ) : null;
  }
}

export default Player;