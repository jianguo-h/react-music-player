import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@src/store';
import { playSong, togglePlayStatus } from '@src/store/actions';
import '../less/play-operate.less';
import { IPlaySongInfo } from '@src/store/types';

interface IProps {
  showDetail?: boolean;
}

const PlayOperate: React.FC<IProps> = props => {
  const { showDetail = false } = props;

  const dispatch = useDispatch();

  const paused = useSelector<IRootState, boolean>(state => state.paused);
  const curPlaySong = useSelector<IRootState, IPlaySongInfo>(
    state => state.curPlaySong
  );

  const opearteClass = showDetail ? 'play-operate play-detail' : 'play-operate';
  const playClass = paused ? 'play pause' : 'play';

  const changePlay = (operate: 'prev' | 'next') => () => {
    let newCurPlayIndex = curPlaySong.index;
    operate === 'next' ? newCurPlayIndex++ : newCurPlayIndex--;

    dispatch(playSong(newCurPlayIndex));
  };

  return (
    <div className={opearteClass}>
      <span className='prev' onClick={changePlay('prev')}></span>
      <span
        className={playClass}
        onClick={() => dispatch(togglePlayStatus())}
      ></span>
      <span className='next' onClick={changePlay('next')}></span>
    </div>
  );
};

export default PlayOperate;
