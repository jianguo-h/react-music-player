import _cloneDeep from 'lodash/cloneDeep';

// reducers
export const view = (state = '', action) => {
  if(action.type === 'setView') {
    return action.view;
  }
  return state;
}

export const songList = (state = [], action) => {
  if(action.type === 'setSongList') {
    return action.songList;
  }
  return state;
}

export const searchCount = (state = 0, action) => {
  if(action.type === 'setSearchCount') {
    return action.searchCount;
  }
  return state;
}

export const audio = (state = null, action) => {
  if(action.type === 'setAudio') {
    return action.audio;
  }
  return state;
}

export const audioSrc = (state = null, action) => {
  if(action.type === 'setAudioSrc') {
    return action.audioSrc;
  }
  return state;
}

export const isPlayed = (state = false, action) => {
  if(action.type === 'setIsPlayed') {
    return action.isPlayed;
  }
  return state;
}

export const canPlayed = (state = false, action) => {
  if(action.type === 'setCanPlayed') {
    return action.canPlayed;
  }
  return state;
}

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
  index: -1,
  FileName: '',
  SongName: '',
  SingerName: '',
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

export const curPlayImgSrc = (state = '/singer-default.jpg', action) => {
  if(action.type === 'setCurPlayImgSrc') {
    return action.curPlayImgSrc;
  }
  return state;
}

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

export const lock = (state = false, action) => {
  if(action.type === 'setLock') {
    return action.lock;
  }
  return state;
}

export const loop = (state = false, action) => {
  if(action.type === 'setLoop') {
    return action.loop;
  }
  return state;
}

export const modeType = (state = 'order', action) => {
  if(action.type === 'setModeType') {
    return action.modeType;
  }
  return state;
}

// 当前歌词高亮行
export const curLrcIndex = (state = 0, action) => {
  if(action.type === 'setCurLrcIndex') {
    return action.curLrcIndex;
  }
  return state;
}

const defaultLrcColor = {
  defaultColor: "#b2f5b5",
  activeColor: "#d1c90e"
}
export const lrcColor = (state = defaultLrcColor, action) => {
  if(action.type === 'setLrcColor') {
    return {
      ...state,
      ...action.lrcColor
    };
  }
  return state;
}

export const lrcSwitch = (state = false, action) => {
  if(action.type === 'setLrcSwitch') {
    return action.lrcSwitch;
  }
  return state;
}