import PropTypes from 'prop-types';
import React, { Component } from 'react';

class LrcColor extends Component {
  static propTypes = {
    changeLrcColor: PropTypes.func.isRequired,
    lrcColorList: PropTypes.array
  }
  static defaultProps = {
    lrcColorList: []
  }
  render() {
    const { lrcColorList, changeLrcColor } = this.props;
    return (
      <div className = "color-list"> 
        {
          lrcColorList.map((currentObj, index) => {
            return (
              <li key = { index } style = {{ backgroundImage: 'url(' + require('../static' + currentObj.currentImgSrc) + ')' }} onClick = { changeLrcColor.bind(this, index) }>
              </li>
            );
          })
        }
      </div>
    );
  }
}

export default LrcColor;