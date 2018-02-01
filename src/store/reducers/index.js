// reducers
import _cloneDeep from 'lodash/cloneDeep';

// 当前播放歌曲所属的路由
export const view = (state = '', action) => {
  if(action.type === 'setView') {
    return action.view;
  }
  return state;
}

// 当前播放歌曲所属的歌词列表
export const songList = (state = [], action) => {
  if(action.type === 'setSongList') {
    return action.songList;
  }
  return state;
}

// 搜索框搜索后得到的歌曲数量
export const searchListCount = (state = 0, action) => {
  if(action.type === 'setSearchListCount') {
    return action.searchListCount;
  }
  return state;
}

// audio的dom节点
export const audio = (state = null, action) => {
  if(action.type === 'setAudio') {
    return action.audio;
  }
  return state;
}

// audioSrc播放来源
export const audioSrc = (state = null, action) => {
  if(action.type === 'setAudioSrc') {
    return action.audioSrc;
  }
  return state;
}

// 是否有音乐在播放
export const isPlayed = (state = false, action) => {
  if(action.type === 'setIsPlayed') {
    return action.isPlayed;
  }
  return state;
}

// 是否可以播放音乐
export const canPlayed = (state = false, action) => {
  if(action.type === 'setCanPlayed') {
    return action.canPlayed;
  }
  return state;
}

// 音频是否为暂停状态
export const paused  = (state = false, action) => {
  if(action.type === 'setPaused') {
    if(action.paused !== undefined) {
      return action.paused;
    }
    return !state;
  }
  return state;
}

/* const defaultCurPlaySong = {
  el: null,
  src: '',
  index: -1,
  FileName: '',
  SongName: '',
  SingerName: '',
  SingerImg: '/singer-default.jpg',
  paused: false,
  modeType: 'order',
  lrcArr: [],
  lrcIndex: 0,
  lrcColor: {
    defaultColor: "#b2f5b5",
    activeColor: "#d1c90e"
  },
  loop: false,
}
export const curPlaySong = (state = defaultCurPlaySong, action) => {
  switch (action.type) {
    case 'setSongInfo':
      return {
        ...state,
        ...action.songInfo
      }
    case 'setPaused': 
      return {
        ...state,
        action.
      }
    default: 
      return state;
  }
} */
const defaultCurPlaySong = {
  index: -1,            // 当前播放歌曲的索引
  FileName: '',         // 当前播放歌曲的全名
  SongName: '',         // 当前播放歌曲的歌曲名
  SingerName: '',       // 当前播放歌曲的歌手名
}
export const curPlaySong = (state = defaultCurPlaySong, action) => {
  if(action.type === 'setCurPlaySong') {
    return {
      ...state,
      ...action.curPlaySong
    };
  }
  return state;
}

// 歌手图片来源, 默认值
export const curPlayImgSrc = (state = '/singer-default.jpg', action) => {
  if(action.type === 'setCurPlayImgSrc') {
    return action.curPlayImgSrc;
  }
  return state;
}

// 歌词数组
export const curPlayLrcArr = (state = [], action) => {
  if(action.type === 'setCurPlayLrcArr') {
    const lyrics = _cloneDeep(action.lyrics)
    if(lyrics.length === 0) {
      return state;
    }
    const lrc = lyrics.replace(/\n/g, "").split("[").slice(1);
    const curPlayLrcArr = [];
    for(const [index, item] of lrc.entries()) {
      const times = item.split("]")[0].replace(".", ":").split(":");
      const time = Number(times[0]) * 60 + Number(times[1]) + Number(times[2]) / 1000;
      const obj = {
        index,
        startTime: time.toFixed(2),
        curLrc: item.split("]")[1]
      }
      curPlayLrcArr.push(obj);
    }
    return curPlayLrcArr;
  }
  return state;
}

// 事件开关, 防止canplay事件多次执行
export const lock = (state = false, action) => {
  if(action.type === 'setLock') {
    return action.lock;
  }
  return state;
}

// 歌曲是否循环播放
export const loop = (state = false, action) => {
  if(action.type === 'setLoop') {
    return action.loop;
  }
  return state;
}

// 播放模式
export const modeType = (state = 'order', action) => {
  if(action.type === 'setModeType') {
    return action.modeType;
  }
  return state;
}

// 歌词的默认配置
const defaultLrcConfig = {
  activeColor: '#d1c90e',                     // 高亮行的歌词颜色
  defaultColor: '#b2f5b5',                    // 其他行的歌词颜色
  activeLrcIndex: 0,                          // 高亮行歌词的索引
}
export const lrcConfig = (state = defaultLrcConfig, action) => {
  if(action.type === 'setLrcConfig') {
    return {
      ...state,
      ...action.lrcConfig
    };
  }
  return state;
}

// 是否显示悬浮歌词
export const lrcSwitch = (state = false, action) => {
  if(action.type === 'setLrcSwitch') {
    return action.lrcSwitch;
  }
  return state;
}