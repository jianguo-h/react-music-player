import PropTypes from 'prop-types';
import React, { Component } from 'react';

class DetailList extends Component {
  static propTypes = {
    playSong: PropTypes.func.isRequired,
    songList: PropTypes.array,
    curPlaySong: PropTypes.object
  }
  static defaultProps = {
    songList: [],
    curPlaySong: {
      index: -1,
      FileName: '',
      SongName: '',
      SingerName: '',
    },
  }
  render() {
    const { songList, curPlaySong, playSong } = this.props;
    return (
      <div className = "play-list">
        <ul>
          { songList.map((song, index) => {
            return (
              <li key = { index } className = { curPlaySong.index === index ? 'active' : '' } onClick = { playSong.bind(this, index) }>
                { index + 1 }. { song.FileName }
              </li>
            );
          }) }
        </ul>
      </div>
    );
  }
}

export default DetailList;