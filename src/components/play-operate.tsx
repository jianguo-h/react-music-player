import React from 'react';
import '../less/play-operate.less';

interface IProps {
  paused?: boolean;
  showDetail?: boolean;
  curPlaySong?: {
    [property: string]: any;
  };
  playSong: (index: number) => void;
  togglePlayStatus: () => void;
}

function PlayOperate(props: IProps) {
  const {
    paused = false,
    showDetail = false,
    curPlaySong = {},
    playSong,
    togglePlayStatus
  } = props;

  const opearteClass = showDetail ? 'play-operate play-detail' : 'play-operate';
  const playClass = paused ? 'play pause' : 'play';

  const changePlay = (operate: 'prev' | 'next') => () => {
    let newCurPlayIndex = curPlaySong.index;
    operate === 'next' ? newCurPlayIndex++ : newCurPlayIndex--;

    playSong(newCurPlayIndex);
  };

  return (
    <div className={opearteClass}>
      <span className='prev' onClick={changePlay('prev')}></span>
      <span className={playClass} onClick={() => togglePlayStatus()}></span>
      <span className='next' onClick={changePlay('next')}></span>
    </div>
  );
}

export default PlayOperate;
