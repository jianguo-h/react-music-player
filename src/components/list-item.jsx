import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListItem extends Component {
  static propTypes = {
    song: PropTypes.object
  }
  static defaultProps = {
    song: {}
  }
  render() {
    const { song, play, index, active } = this.props;
    return (
      <li className={active ? 'active' : ''} onClick={play.bind(this, index)}>
        <p className="filename">{song.FileName}</p>
      </li>
    );
  }
}

export default ListItem;