import PropTypes from 'prop-types';
import React, { Component } from 'react';

class TimeWrap extends Component {
  static propTypes = {
    updateProgress: PropTypes.func.isRequired,
    curPlayTime: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    progress: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    endTime: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
  }
  static defaultProps = {
    curPlayTime: 0,
    progress: 0,
    endTime: 0,
  }
  // 进度条时间过滤器
  formatTime(time) {
    let minutes = parseInt(time / 60);
    let seconds = parseInt(time % 60);
    if(minutes < 10) {
      minutes = `0${minutes}`;
    }
    if(seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }
  render() {
    const { curPlayTime, progress, endTime, updateProgress, progressBarRef } = this.props;
    return (
      <div className = "time-wrap">
        <div className = "start-time">{ this.formatTime(curPlayTime) }</div>
        <div className = "progress-wrap">
          <div className = "progress-bar" onClick = { updateProgress } ref = { progressBarRef }></div>
          <div className = "progress" style = {{ width: progress + '%' }}></div>
          <div className = "progress-dot" style = {{ marginLeft: progress + '%' }}></div>
        </div>
        <div className = "end-time">{ this.formatTime(endTime) }</div>
      </div>
    );
  }
}

export default TimeWrap;