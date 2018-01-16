import { connect } from 'react-redux';
import React, { Component } from 'react';
import { togglePlayStatus, playSong } from '../store/actions';
import '../less/play-operate.less';

@connect(
  state => ({
    paused: state.paused,
    showDetail: state.showDetail,
    curPlaySong: state.curPlaySong
  }),
  dispatch => ({
    togglePlayStatus() { dispatch(togglePlayStatus()) },
    playSong(curPlayIndex) { dispatch(playSong(curPlayIndex)); }
  })
)
class PlayOperate extends Component {
  changePlay(operate) {
    let newCurPlayIndex = this.props.curPlaySong.index;
    operate === "next" ? newCurPlayIndex++ : newCurPlayIndex--;

    this.props.playSong(newCurPlayIndex);
  }
  render() {
    const { showDetail, paused } = this.props;
    const opearteClass = showDetail ? 'play-operate play-detail' : 'play-operate';
    const playClass = paused ? 'play pause' : 'play';
    return (
      <div className = { opearteClass }>
        <span className = "prev" onClick = { this.changePlay.bind(this, 'prev') }></span>
        <span className = { playClass } onClick = { this.props.togglePlayStatus.bind(this) }></span>
        <span className = "next" onClick = { this.changePlay.bind(this, 'next') }></span>
      </div>
    );
  }
}

export default PlayOperate;