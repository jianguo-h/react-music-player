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
  }
  componentWillMount() {
    const path = this.props.match.path.slice(1);
    this.getStaticList(path);
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
  // 播放歌曲
  play(curPlayIndex) {
    console.log('>>> curPlayIndex', curPlayIndex);
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