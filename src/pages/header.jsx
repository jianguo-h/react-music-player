import { connect } from 'react-redux';
import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
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
@connect(state => ({
  searchListCount: state.searchListCount
}))
class Header extends Component {
  constructor() {
    super();
    this.timer = null;
    this.state = {
      keyword: '',                // 搜索的关键字
      resultCount: 0,             // 得到的结果数量
      resultList: [],             // 搜索得到的结果列表
      searchTip: '正在搜索...'     // 搜索时的提示信息
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  // 监听输入框的input事件
  input(evt) {
    this.setState({
      keyword: evt.target.value
    });
    // 函数节流，防止多次触发
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.query();
    }, 800);
  }
  // 根据关键字搜索(模糊查询)
  query() {
    const keyword = this.state.keyword;
    if(keyword.trim() === '') return;

    this.setState({
      resultCount: 0,
      searchTip: '正在搜索...'
    });
    window.api.search(keyword).then(res => {
      console.log('>>> [res] 根据关键字搜索', res);
      if(res.status === 200 && res.statusText === 'OK') {
        const { RecordDatas, RecordCount } = res.data.data[0];
        this.setState({
          resultList: RecordDatas,
          resultCount: RecordCount
        });
        if(RecordDatas.length <= 0) {
          this.setState({
            resultCount: 0,
            searchTip: '暂无结果...'
          });
        }
      }
      else {
        this.setState({
          searchTip: '搜索出错, 请稍后重试'
        });
      }
    }).catch(err => {
      console.log('>>> [err] 根据关键字搜索', err);
      this.setState({
        resultCount: 0,
        searchTip: '网络出现错误或服务不可用'
      });
    })
  }
  // 点击搜索事件, keyword为关键字
  search(keyword) {
    if(!keyword) {
      window.alert("请输入搜索内容");
      return;
    }
    this.props.history.push('/search/' + keyword);
    this.setState({
      keyword: ''
    });
  }
  // 后退
  goback() {
    this.props.history.go(-1);
  }
  render() {
    const path = this.props.location.pathname.split('/')[1];
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
        {
          path !== 'search' ? (
            <div className = "header-tab">
              <ul>
                {
                  tabs.map((tab, index)  => {
                    return <li key = { index }><NavLink to = { tab.path } activeClassName = 'active'>{ tab.name }</NavLink></li>;
                  })
                }
              </ul>
            </div>
          ) : (
            <div className = "header-search-result">
              <div className = "goback" onClick = { this.goback.bind(this) }></div>
              <div className = "searchCount">共有<em>{ this.props.searchListCount }</em>条结果</div>
            </div>
          )
        }
      </header>
    );
  }
}

export default withRouter(Header);