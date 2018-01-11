import React, { Component } from 'react';
import DropList from '../components/drop-list';
import '../less/header.less';

const tabs = [
  {
    path: "/new",
    name: "新歌"
  },
  {
    path: "/recommend",
    name: "推荐"
  },
  {
    path: "/local",
    name: "本地"
  }
];
class Header extends Component {
  constructor() {
    super();
    this.state = {
      keyword: '',                // 搜索的关键字
      resultCount: 0,             // 得到的结果数量
      resultList: [],             // 搜索得到的结果列表
      searchTip: '正在搜索...',    // 搜索时的提示信息
    }
  }
  // 监听输入框的input事件
  input(evt) {
    this.setState({
      keyword: evt.target.value
    });
    this.query();
  }
  // 根据关键字搜索(模糊查询)
  query() {

  }
  // 点击搜索事件, keyword为关键字
  search(keyword) {
    console.log('>>> keyword', keyword);
  }
  render() {
    const keyword = this.state.keyword.trim();
    const dropListProps = {
      resultCount: this.state.resultCount,
      resultList: this.state.resultList,
      searchTip: this.state.searchTip,
      search: this.search.bind(this)
    }
    return (
      <header id = 'header'>
        <div className = "header-search">
          <div className = "logo"></div>
          <div className = "search-form">
            <input type = 'text' placeholder = "歌手/歌名" value = { keyword } onChange = { this.input.bind(this) } />
            { keyword ? <DropList { ...dropListProps } /> : null }
          </div>
          <div className = "search" onClick = { this.search.bind(this, keyword) }></div>
        </div>
        <div className = "header-tab">
          <ul>
            {
              tabs.map((tab, index)  => {
                return <li key = { index }>{ tab.name }</li>;
              })
            }
          </ul>
        </div>
      </header>
    );
  }
}

export default Header;