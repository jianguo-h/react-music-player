import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../less/play-operate.less';

class PlayOperate extends Component {
  static propTypes = {
    paused: PropTypes.bool,
    showDetail: PropTypes.bool,
    curPlaySong: PropTypes.object,
    playSong: PropTypes.func.isRequired,
    togglePlayStatus: PropTypes.func.isRequired
  }
  static defaultProps = {
    paused: false,
    showDetail: false,
    curPlaySong: {}
  }
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