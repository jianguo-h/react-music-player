import axios, { AxiosRequestConfig } from 'axios';

async function callApi(requestConfig: AxiosRequestConfig, title: string) {
  try {
    console.log('[request.title] ' + title);
    console.log(requestConfig.data ?? requestConfig.params);
    return await axios(requestConfig);
  } catch (err) {
    throw err;
  }
}

// 根据关键字搜索(模糊查询用到)
export async function search(keyword: string) {
  return await callApi(
    {
      method: 'post',
      url: '/searchtip',
      data: { keyword },
    },
    '搜索'
  );
}

// 获取静态json数据中的歌曲列表
export async function getList(path: string) {
  return await callApi(
    {
      method: 'get',
      url: '/api/' + path,
    },
    '获取静态json数据中的歌曲列表'
  );
}

// 获取歌曲的一些信息
export async function getSongInfo(songName: string, page: number = 1) {
  return await callApi(
    {
      method: 'get',
      url: '/songsearch',
      params: {
        page,
        pagesize: 20,
        keyword: songName,
        platform: 'WebFilter',
        userid: -1,
        iscorrection: 1,
        privilege_filter: 0,
        filter: 2,
      },
    },
    '获取歌曲信息'
  );
}

// 根据hash值获取歌曲的信息
export async function play(hash: string) {
  return await callApi(
    {
      method: 'get',
      url: '/play',
      params: {
        r: 'play/getdata',
        hash,
      },
    },
    '根据hash值获取歌曲的信息'
  );
}
