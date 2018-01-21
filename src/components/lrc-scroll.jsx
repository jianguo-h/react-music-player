import PropTypes from 'prop-types';
import React, { Component } from 'react';

class LrcScroll extends Component {
  static propTypes = {
    curPlayLrcArr: PropTypes.array,
    translateY: PropTypes.number,
    defaultColor: PropTypes.string,
    activeColor: PropTypes.string,
    curLrcIndex: PropTypes.number
  }
  static defaultProps = {
    curPlayLrcArr: [],
    translateY: 0,
    curLrcIndex: 0,
    defaultColor: "#b2f5b5",
    activeColor: "#d1c90e",
  }
  render() {
    const { curPlayLrcArr, translateY, curLrcIndex, defaultColor, activeColor, lrcBoxRef } = this.props;
    return (
      <div className = "lrc-box" ref = { lrcBoxRef } style = {{ transform: 'translateY(-' + translateY + 'px)', color: defaultColor }}>
        {
          curPlayLrcArr.map((lrcObj, index) => {
            return (
              <p key = { index } style = {{ color: curLrcIndex === index ? activeColor : '' }} starttime = { lrcObj.startTime }>
                { lrcObj.curLrc }
              </p>
            );
          })
        }
      </div>
    );
  }
}

export default LrcScroll;