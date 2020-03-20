import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import DropList from '../components/drop-list';
import api from '@src/api';
import debounce from 'lodash/debounce';
import '../less/header.less';

const Header: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const searchListCount = useSelector<any, number>(
    state => state.searchListCount
  );

  const [keyword, setKeyword] = useState<string>('');
  const [resultCount, setResultCount] = useState<number>(0);
  const [resultList, setResultList] = useState<any[]>([]);
  const [searchTip, setSearchTip] = useState<string>('');

  // 监听输入框的input事件
  const onInput = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.persist();
    setKeyword(evt.target.value);
    query(evt.target.value);
  }, []);

  // 根据关键字搜索(模糊查询)
  const query = debounce((queryText: string) => {
    if (queryText.trim() === '') return;

    setResultCount(0);
    setSearchTip('正在搜索...');

    api
      .search(queryText)
      .then(res => {
        console.log('>>> [res] 根据关键字搜索', res);
        if (res.status === 200 && res.statusText === 'OK') {
          const { RecordDatas, RecordCount } = res.data.data[0];
          setResultList(RecordDatas);
          setResultCount(RecordCount);
          if (RecordDatas.length <= 0) {
            setResultCount(0);
            setSearchTip('暂无结果...');
          }
        } else {
          setSearchTip('搜索出错, 请稍后重试');
        }
      })
      .catch(err => {
        console.log('>>> [err] 根据关键字搜索', err);
        setResultCount(0);
        setSearchTip('网络出现错误或服务不可用');
      });
  }, 600);

  // 点击搜索事件, keyword为关键字
  const search = (searchText: string) => () => {
    if (!searchText) {
      window.alert('请输入搜索内容');
      return;
    }
    history.push('/search/' + searchText);
    setKeyword('');
  };

  // 后退
  const goback = () => {
    history.go(-1);
  };

  const path = location.pathname.split('/')[1];
  const dropListProps = {
    resultCount,
    resultList,
    searchTip,
    search
  };

  return (
    <header id='header'>
      <div className='header-search'>
        <div className='logo'></div>
        <div className='search-form'>
          <input
            type='text'
            placeholder='歌手/歌名'
            value={keyword}
            onChange={onInput}
          />
          {keyword ? <DropList {...dropListProps} /> : null}
        </div>
        <div className='search' onClick={search(keyword)}></div>
      </div>
      {path !== 'search' ? (
        <div className='header-tab'>
          <ul>
            <li>
              <NavLink activeClassName='active' to='/new'>
                新歌
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName='active' to='/recommend'>
                推荐
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName='active' to='/local'>
                本地
              </NavLink>
            </li>
          </ul>
        </div>
      ) : (
        <div className='header-search-result'>
          <div className='goback' onClick={goback}></div>
          <div className='searchCount'>
            共有<em>{searchListCount}</em>条结果
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
