import axios from 'axios';

// 统一管理各个请求
export default {
  // 根据关键字搜索(模糊查询用到)
  async search(keyword) {
    try {
      const params = { keyword };
      console.log('>>> [api.params] 根据关键字搜索', params);
      return await axios.post('/searchtip', params);
    }
    catch(err) {
      throw new Error(err);
    }
  },
  // 获取静态json数据中的歌曲列表
  async getList(path) {
    try {
      console.log('>>> [api.params] 获取静态json数据中的歌曲列表', path);
      return await axios.post('/api/' + path);
    }
    catch(err) {
      throw new Error(err);
    }
  },
  // 获取歌曲的一些信息
  async getSongInfo(songName, page = 1) {
    try {
      const params = {
        params: {
          page,
          pagesize: 20,
          keyword: songName,
          platform: "WebFilter",
          userid: -1,
          iscorrection: 1,
          privilege_filter: 0,
          filter: 2
        }
      };
      console.log('>>> [api.params] 获取歌曲的一些信息', params);
      return await axios.get('/songsearch', params);
    }
    catch(err) {
      throw new Error(err);
    }
  },
  // 根据hash值获取歌曲的信息
  async play(hash) {
    try {
      const params = {
        params: {
          r: "play/getdata",
          hash
        }
      }
      console.log('>>> [api.params] 根据hash值获取歌曲的信息', params);
      return await axios.get('/play', params);
    }
    catch(err) {
      throw new Error(err);
    }
  }
}