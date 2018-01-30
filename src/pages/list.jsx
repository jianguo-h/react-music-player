import { connect } from 'react-redux';
import React, { Component } from 'react';
import _cloneDeep from 'lodash/cloneDeep';
import ListItem from '../components/list-item';
import {
  setView, setSongList,
  setSearchListCount, playSong } from '../store/actions';
import '../less/list.less';

@connect(
  state => ({
    view: state.view,
    curPlaySong: state.curPlaySong,
    isPlayed: state.isPlayed
  }),
  dispatch => ({
    setView(view) { dispatch(setView(view)); },
    setSongList(songList) { dispatch(setSongList(songList)); },
    setSearchListCount(searchListCount) { dispatch(setSearchListCount(searchListCount)); },
    playSong(curPlayIndex) { dispatch(playSong(curPlayIndex)); }
  })
)
class List extends Component {
  constructor() {
    super();
    this.state = {
      songList: []            // 存储歌曲列表的数组
    }
    this.path = '';           // 当前路由的路径
    this.page = 1;            // 加载的页数
    this.totalPage = 0;       // 总页数
    this.allLoaded = false;   // 数据是否全部加载完毕
    this.allLoaded = false;   // 是否处于加载中
  }
  componentWillMount() {
    this.path = this.props.match.path.split('/')[1];

    if(this.path !== 'search') {
      this.getStaticList();
    }
    else {
      this.getSearchList();
    }
  }
  componentDidMount() {
    let timer = null;

    document.onscroll = null;
    document.onscroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if(this.path === 'search') {
          this.scrollLoad();
        }
      }, 100);
    }
  }
  // 渲染静态数据(song.json中的)列表数据
  getStaticList() {
    window.Toast.loading('加载中...', 0);
    window.api.getList(this.path).then(res => {
      console.log('>>> [res] 渲染列表数据', res);
      const songList = _cloneDeep(res.data.data);
      setTimeout(() => {
        window.Toast.hide();
        this.setState(prevState => ({
          songList: [...prevState.songList, ...songList]
        }));
      }, 800);
    }).catch(err => {
      window.Toast.hide();
      window.Toast.fail(window.errMsg);
      console.log('>>> [err] 渲染列表数据', err);
    });
  }
  // 获取根据关键字搜索后得到的歌曲列表
  getSearchList() {
    this.isLoading = true;
    const page = this.page;
    const keyword = this.props.match.params.keyword;
    window.Toast.loading('加载中...', 0);

    window.api.getSongInfo(keyword, page).then(res => {
      window.Toast.hide();
      console.log('>>> [res] 搜索后得到的歌曲列表', res);
      const data = _cloneDeep(res.data.data);
      if(res.status === 200 && res.statusText === 'OK') {
        const searchListCount = data.total;
        this.totalPage = Math.ceil(searchListCount / 20);
        const searchSongList = data.lists.map(song => {
          return {
            SingerName: song.SingerName,
            SongName: song.SongName,
            FileName: song.FileName
          };
        });
        this.isLoading = false;
        this.setState(prevState => ({
          songList: [...prevState.songList, ...searchSongList]
        }));
        this.props.setSearchListCount(searchListCount);
      }
    }).catch(err => {
      window.Toast.hide();
      console.log('>>> [err] 搜索后得到的歌曲列表', err);
      window.Toast.fail('网络出现错误或服务暂时不可用');
    });
  }
  // 播放歌曲
  play(curPlayIndex) {
    const songList = _cloneDeep(this.state.songList);

    this.props.setView(this.path);
    this.props.setSongList(songList);
    this.props.playSong(curPlayIndex);
  }
  // 滑动加载
  scrollLoad() {
    if(this.isLoading || this.allLoaded) {
      return;
    }
    const docEl = document.documentElement;
    /*
     scrollTop 元素滚动的高度
     scrollHeight 元素的实际高度(包括滚动的高度)
     clientHeight 元素在窗口可见的高度(不包括滚动的高度)
    */
    const { scrollTop, scrollHeight, clientHeight } = docEl;
    const offsetHeight = scrollHeight - scrollTop - clientHeight;

    if(offsetHeight <= 100) {
      if(this.page < this.totalPage) {
        this.page++;
        this.getSearchList();
      }
      else {
        this.allLoaded = true;
        document.onscroll = null;       // 注销事件
        window.Toast.info('已加载全部数据！');
      }
    }
  }
  render() {
    const { view, isPlayed, curPlaySong } = this.props;
    return (
      <div id = "content">
        <div className = "list">
          <ul>
            {
              this.state.songList.map((song, index) => {
                const listItemProps = {
                  play: this.play.bind(this, index),
                  song,
                  index,
                  active: view === this.path && index === curPlaySong.index && isPlayed
                }
                return <ListItem { ...listItemProps } key = { index } />;
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default List;