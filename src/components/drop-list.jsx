import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DropList extends Component {
  static propTypes = {
    resultCount: PropTypes.number,
    searchTip: PropTypes.string,
    resultList: PropTypes.array,
    search: PropTypes.func.isRequired
  }
  static defaultProps = {
    resultCount: 0,
    searchTip: '正在搜索...',
    resultList: []
  }
  render() {
    const { resultCount, searchTip, resultList, search } = this.props;
    let tipDom = <p>{ searchTip }</p>;
    let list = [];
    if(resultCount > 0) {
      list = resultList.map((item, index) => {
        return <li key = { index } onClick = { search.bind(this, item.HintInfo) }>{ item.HintInfo }</li>;
      });
    }
    return (
      <div className = "search-list">
        { resultCount > 0 ? <ul>{ list }</ul> : tipDom }
      </div>
    );
  }
}

export default DropList;