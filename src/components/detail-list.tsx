import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playSong } from '@src/store/actions';
import { RootState } from '@src/store';
import { IPlaySongInfo, ISong } from '@src/types';

const DetailList: React.FC = () => {
  const dispatch = useDispatch();
  const songList = useSelector<RootState, ISong[]>(state => state.songList);
  const curPlaySong = useSelector<RootState, IPlaySongInfo>(
    state => state.curPlaySong
  );

  const onPlay = (index: number) => () => {
    dispatch(playSong(index));
  };

  return (
    <div className='play-list'>
      <ul>
        {songList.map((song, index) => {
          return (
            <li
              key={index}
              className={curPlaySong.index === index ? 'active' : ''}
              onClick={onPlay(index)}
            >
              {index + 1}. {song.FileName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DetailList;
