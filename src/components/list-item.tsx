import React from 'react';

interface IProps {
  song: any;
  index: number;
  active: boolean;
  play: (index: number) => void;
}

function ListItem(props: IProps) {
  const { song, play, index, active } = props;

  return (
    <li className={active ? 'active' : ''} onClick={() => play(index)}>
      <p className="filename">{song.FileName}</p>
    </li>
  );
}

export default ListItem;
