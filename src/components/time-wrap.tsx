import React from 'react';

interface IProps {
  updateProgress: (evt: React.MouseEvent<HTMLDivElement>) => void;
  curPlayTime?: number | string;
  progress?: number | string;
  endTime?: number | string;
  progressBarRef: any;
}

function formatTime(time: number): string {
  let minutes: number | string = Math.floor(time / 60);
  let seconds: number | string = Math.floor(time % 60);
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return minutes + ':' + seconds;
}

const TimeWrap: React.FC<IProps> = props => {
  const {
    curPlayTime = 0,
    progress = 0,
    endTime = 0,
    updateProgress,
    progressBarRef,
  } = props;

  return (
    <div className='time-wrap'>
      <div className='start-time'>{formatTime(Number(curPlayTime))}</div>
      <div className='progress-wrap'>
        <div
          className='progress-bar'
          onClick={updateProgress}
          ref={progressBarRef}
        ></div>
        <div className='progress' style={{ width: progress + '%' }}></div>
        <div
          className='progress-dot'
          style={{ marginLeft: progress + '%' }}
        ></div>
      </div>
      <div className='end-time'>{formatTime(Number(endTime))}</div>
    </div>
  );
};

export default TimeWrap;
