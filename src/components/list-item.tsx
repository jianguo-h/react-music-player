import React from 'react';

interface IProps {
  song: any;
  index: number;
  active: boolean;
  onPlay: (index: number) => void;
}

const ListItem: React.FC<IProps> = props => {
  const { song, onPlay, index, active } = props;

  return (
    <li className={active ? 'active' : ''} onClick={() => onPlay(index)}>
      <p className='filename'>{song.FileName}</p>
    </li>
  );
};

export default ListItem;
