import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _cloneDeep from 'lodash/cloneDeep';
import ListItem from '../components/list-item';
import {
  setView,
  setSongList,
  setSearchListCount,
  playSong,
} from '../store/actions';
import { getList as apiGetList, getSongInfo as apiGetSongInfo } from '@src/api';
import { Toast } from 'antd-mobile';
import '../less/list.less';
import { useRouteMatch, useParams } from 'react-router';
import { RootState } from '@src/store';
import { IPlaySongInfo } from '@src/types';
import { ISong } from '@src/types';

const List: React.FC = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const params = useParams<{ keyword?: string }>();
  const searchObj = useRef({
    page: 1,
    totalPage: 0,
    loading: false,
    allLoaded: false,
  });

  const view = useSelector<RootState, string>(state => state.view);
  const curPlaySong = useSelector<RootState, IPlaySongInfo>(
    state => state.curPlaySong
  );
  const isPlayed = useSelector<RootState, boolean>(state => state.isPlayed);

  const [list, setList] = useState<ISong[]>([]);

  const path = match.path.split('/')[1];

  // 渲染静态数据(song.json中的)列表数据
  const getStaticList = () => {
    Toast.loading('加载中...', 0);
    apiGetList(path)
      .then(res => {
        console.log('>>> [res] 渲染列表数据', res);
        setTimeout(() => {
          Toast.hide();
          setList(prevList => [...prevList, ...res.data.data]);
        }, 800);
      })
      .catch(err => {
        Toast.hide();
        Toast.fail('请求出错');
        console.log('>>> [err] 渲染列表数据', err);
      });
  };

  // 获取根据关键字搜索后得到的歌曲列表
  const getSearchList = () => {
    if (!params.keyword) {
      return;
    }

    searchObj.current.loading = true;
    Toast.loading('加载中...', 0);

    apiGetSongInfo(params.keyword, searchObj.current.page)
      .then(res => {
        Toast.hide();
        console.log('>>> [res] 搜索后得到的歌曲列表', res);
        const data = _cloneDeep(res.data.data);
        if (res.status === 200 && res.statusText === 'OK') {
          const searchListCount = data.total;
          searchObj.current.totalPage = Math.ceil(searchListCount / 20);
          const searchSongList = data.lists.map((song: ISong) => {
            return {
              SingerName: song.SingerName,
              SongName: song.SongName,
              FileName: song.FileName,
            };
          });
          searchObj.current.loading = false;
          setList(prevList => [...prevList, ...searchSongList]);
          dispatch(setSearchListCount(searchListCount));
        }
      })
      .catch(err => {
        Toast.hide();
        console.log('>>> [err] 搜索后得到的歌曲列表', err);
        Toast.fail('网络出现错误或服务暂时不可用');
      });
  };

  // 播放歌曲
  const onPlay = (curPlayIndex: number) => {
    dispatch(setView(path));
    dispatch(setSongList(list));
    dispatch(playSong(curPlayIndex));
  };

  // 滑动加载
  const scrollLoad = () => {
    if (searchObj.current.loading || searchObj.current.allLoaded) {
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

    if (offsetHeight <= 100) {
      if (searchObj.current.page < searchObj.current.totalPage) {
        searchObj.current.page += 1;
        getSearchList();
      } else {
        searchObj.current.allLoaded = true;
        document.onscroll = null; // 注销事件
        Toast.info('已加载全部数据！');
      }
    }
  };

  useEffect(() => {
    if (path !== 'search') {
      getStaticList();
    } else {
      getSearchList();
    }

    let timer: NodeJS.Timeout | undefined;
    document.onscroll = () => {
      if (timer !== undefined) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        if (path === 'search') {
          scrollLoad();
        }
      }, 100);
    };

    return () => {
      document.onscroll = null;
    };
  }, []);

  return (
    <div id='content'>
      <div className='list'>
        <ul>
          {list.map((song, index) => {
            const listItemProps = {
              onPlay,
              song,
              index,
              active: view === path && index === curPlaySong.index && isPlayed,
            };
            return <ListItem {...listItemProps} key={index} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default List;
