import { connect } from 'react-redux';
import React, { Component } from 'react';
import _cloneDeep from 'lodash/cloneDeep';
import ListItem from '../components/list-item';
import { 
  setView, setSongList, 
  setSearchCount, playSong } from '../store/actions';
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
    setSearchCount(searchCount) { dispatch(setSearchCount(searchCount)); },
    playSong(curPlayIndex) { dispatch(playSong(curPlayIndex)); }
  })
)
class List extends Component {
  constructor() {
    super();
    this.state = {
      songList: []            // 存储歌曲列表的数组
    }
    this.page = 1;            // 加载的页数
    this.totalPage = 0;       // 总页数
    this.allLoaded = false;   // 数据是否全部加载完毕
    this.allLoaded = false;   // 是否处于加载中
  }
  componentWillMount() {
    const path = this.props.match.path.split('/')[1];
    const keyword = this.props.match.params.keyword;
    if(path !== 'search') {
      this.getStaticList(path);
    }
    else {
      this.getSearchList(keyword);
    }
  }
  // 渲染静态数据(song.json中的)列表数据
  getStaticList(path) {
    window.Toast.loading('加载中...', 0);
    window.api.getList(path).then(res => {
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
  getSearchList(keyword) {
    const page = this.page;
    this.isLoading = true;
    window.Toast.loading('加载中...', 0);
    window.api.getSongInfo(keyword, page).then(res => {
      window.Toast.hide();
      console.log('>>> [res] 搜索后得到的歌曲列表', res);
      const data = _cloneDeep(res.data.data);
      /*if(res.status === 200 && res.statusText === 'OK') {
        const searchCount = data.total;
        this.totalPage = Math.ceil(searchCount / 20);
        const searchSongList = data.lists.map(song => {
          return {
            SingerName: song.SingerName,
            SongName: song.SongName,
            FileName: song.FileName
          };
        });
        this.isLoading = false;
        this.setState(prevState => ({
          songList: prevState.songList.concat[searchSongList]
        }));
        this.props.setSearchCount(searchCount);
      }*/
    }).catch(err => {
      window.Toast.hide();
      console.log('>>> [err] 搜索后得到的歌曲列表', err);
      window.Toast.fail('网络出现错误或服务暂时不可用');
    });
  }
  // 播放歌曲
  play(curPlayIndex) {
    const view = this.props.match.path.slice(1);
    const songList = _cloneDeep(this.state.songList);

    this.props.setView(view);
    this.props.setSongList(songList);
    this.props.playSong(curPlayIndex);
  }
  render() {
    const path = this.props.match.path.slice(1);
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
                  active: view === path && index === curPlaySong.index && isPlayed
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