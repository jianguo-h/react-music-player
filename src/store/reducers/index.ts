// reducers
import _cloneDeep from 'lodash/cloneDeep';
import { IAction, IPlaySongInfo, ILrcConfig, AudioEle } from '../types';
import {
  SET_VIEW,
  SET_SONG_LIST,
  SET_SEARCH_LIST_COUNT,
  SET_AUDIO,
  SET_AUDIO_SRC,
  SET_IS_PLAYED,
  SET_CAN_PLAYED,
  SET_PAUSED,
  SET_CUR_PLAY_IMR_SRC,
  SET_CUR_PLAY_LRC_ARR,
  SET_CUR_PLAY_SONG,
  SET_LOCK,
  SET_LOOP,
  SET_MODE_TYPE,
  SET_LRC_CONFIG,
  SET_LRC_SWITCH,
} from '../actions';

// 当前播放歌曲所属的路由
export const view = (state: string = '', action: IAction): string => {
  if (action.type === SET_VIEW) {
    return action.payload.view;
  }
  return state;
};

// 当前播放歌曲所属的歌词列表
export const songList = (state: any[] = [], action: IAction): any[] => {
  if (action.type === SET_SONG_LIST) {
    return action.payload.songList;
  }
  return state;
};

// 搜索框搜索后得到的歌曲数量
export const searchListCount = (state: number = 0, action: IAction): number => {
  if (action.type === SET_SEARCH_LIST_COUNT) {
    return action.payload.searchListCount;
  }
  return state;
};

// audio的dom节点
export const audio = (state: AudioEle = null, action: IAction): AudioEle => {
  if (action.type === SET_AUDIO) {
    return action.payload.audio;
  }
  return state;
};

// audioSrc播放来源
export const audioSrc = (
  state: string | null = null,
  action: IAction
): string | null => {
  if (action.type === SET_AUDIO_SRC) {
    return action.payload.audioSrc;
  }
  return state;
};

// 是否有音乐在播放
export const isPlayed = (state: boolean = false, action: IAction): boolean => {
  if (action.type === SET_IS_PLAYED) {
    return action.payload.isPlayed;
  }
  return state;
};

// 是否可以播放音乐
export const canPlayed = (state: boolean = false, action: IAction): boolean => {
  if (action.type === SET_CAN_PLAYED) {
    return action.payload.canPlayed;
  }
  return state;
};

// 音频是否为暂停状态
export const paused = (state: boolean = false, action: IAction): boolean => {
  if (action.type === SET_PAUSED) {
    if (action.payload.paused !== undefined) {
      return action.payload.paused;
    }
    return !state;
  }
  return state;
};

const defaultCurPlaySong: IPlaySongInfo = {
  index: -1, // 当前播放歌曲的索引
  FileName: '', // 当前播放歌曲的全名
  SongName: '', // 当前播放歌曲的歌曲名
  SingerName: '', // 当前播放歌曲的歌手名
};
export const curPlaySong = (
  state: IPlaySongInfo = defaultCurPlaySong,
  action: IAction
): IPlaySongInfo => {
  if (action.type === SET_CUR_PLAY_SONG) {
    return {
      ...state,
      ...action.payload.curPlaySong,
    };
  }
  return state;
};

// 歌手图片来源, 默认值
export const curPlayImgSrc = (
  state: string = require('../../static/images/singer-default.jpg'),
  action: IAction
): string => {
  if (action.type === SET_CUR_PLAY_IMR_SRC) {
    return action.payload.curPlayImgSrc;
  }
  return state;
};

// 歌词数组
export const curPlayLrcArr = (state: any[] = [], action: IAction): any[] => {
  if (action.type === SET_CUR_PLAY_LRC_ARR) {
    const lyrics = _cloneDeep(action.payload.lyrics);
    if (lyrics.length === 0) {
      return state;
    }
    const lrc = lyrics.replace(/\n/g, '').split('[').slice(1);
    const curPlayLrcArr = [];
    for (const [index, item] of lrc.entries()) {
      const times = item.split(']')[0].replace('.', ':').split(':');
      const time =
        Number(times[0]) * 60 + Number(times[1]) + Number(times[2]) / 1000;
      const obj = {
        index,
        startTime: time.toFixed(2),
        curLrc: item.split(']')[1],
      };
      curPlayLrcArr.push(obj);
    }
    return curPlayLrcArr;
  }
  return state;
};

// 事件开关, 防止canplay事件多次执行
export const lock = (state: boolean = false, action: IAction): boolean => {
  if (action.type === SET_LOCK) {
    return action.payload.lock;
  }
  return state;
};

// 歌曲是否循环播放
export const loop = (state: boolean = false, action: IAction): boolean => {
  if (action.type === SET_LOOP) {
    return action.payload.loop;
  }
  return state;
};

// 播放模式
export const modeType = (state: string = 'order', action: IAction): string => {
  if (action.type === SET_MODE_TYPE) {
    return action.payload.modeType;
  }
  return state;
};

// 歌词的默认配置
const defaultLrcConfig: ILrcConfig = {
  activeColor: '#d1c90e', // 高亮行的歌词颜色
  defaultColor: '#b2f5b5', // 其他行的歌词颜色
  activeLrcIndex: 0, // 高亮行歌词的索引
};
export const lrcConfig = (
  state: ILrcConfig = defaultLrcConfig,
  action: IAction
): ILrcConfig => {
  if (action.type === SET_LRC_CONFIG) {
    return {
      ...state,
      ...action.payload.lrcConfig,
    };
  }
  return state;
};

// 是否显示悬浮歌词
export const lrcSwitch = (state: boolean = false, action: IAction): boolean => {
  if (action.type === SET_LRC_SWITCH) {
    return action.payload.lrcSwitch;
  }
  return state;
};
