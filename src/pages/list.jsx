import React, { Component } from 'react';
import ListItem from '../components/list-item';
import '../less/list.less';

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
      const songList = res.data.data;
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
  }
  render() {
    return (
      <div id = "content">
        <div className = "list">
          <ul>
            {
              this.state.songList.map((song, index) => {
                const listItemProps = {
                  play: this.play.bind(this, index),
                  song
                }
                return <ListItem { ...listItemProps } key={index} />;
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default List;