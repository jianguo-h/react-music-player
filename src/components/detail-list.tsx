import React from 'react';

interface IProps {
  playSong: (index: number) => void;
  songList: any[];
  curPlaySong: {
    [property: string]: any;
  };
}

function DetailList(props: IProps) {
  const {
    playSong,
    songList = [],
    curPlaySong = {
      index: -1,
      FileName: '',
      SongName: '',
      SingerName: ''
    }
  } = props;

  return (
    <div className="play-list">
      <ul>
        {songList.map((song, index) => {
          return (
            <li
              key={index}
              className={curPlaySong.index === index ? 'active' : ''}
              onClick={() => playSong(index)}
            >
              {index + 1}. {song.FileName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DetailList;
