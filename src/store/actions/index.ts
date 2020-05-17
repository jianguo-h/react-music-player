// action creators function
import { getSongInfo as apiGetSongInfo, play as apiPlay } from '@src/api';
import { Toast } from 'antd-mobile';
import _cloneDeep from 'lodash/cloneDeep';
import {
  IAction,
  ILrcConfig,
  IPlaySongInfo,
  GetStateFn,
  AudioEle,
} from '../types';
import { Dispatch } from 'redux';

export const SET_VIEW = 'SET_VIEW';
export function setView(view: string): IAction {
  return {
    type: SET_VIEW,
    payload: {
      view,
    },
  };
}

export const SET_SONG_LIST = 'SET_SONG_LIST';
export function setSongList(songList: any[]): IAction {
  return {
    type: 'SET_SONG_LIST',
    payload: {
      songList,
    },
  };
}

export const SET_SEARCH_LIST_COUNT = 'SET_SEARCH_LIST_COUNT';
export function setSearchListCount(searchListCount: number): IAction {
  return {
    type: SET_SEARCH_LIST_COUNT,
    payload: {
      searchListCount,
    },
  };
}

export const SET_AUDIO = 'SET_AUDIO';
export function setAudio(audio: AudioEle): IAction {
  return {
    type: SET_AUDIO,
    payload: {
      audio,
    },
  };
}

export const SET_AUDIO_SRC = 'SET_AUDIO_SRC';
export function setAudioSrc(audioSrc: string | null): IAction {
  return {
    type: SET_AUDIO_SRC,
    payload: {
      audioSrc,
    },
  };
}

export const SET_IS_PLAYED = 'SET_IS_PLAYED';
export function setIsPlayed(isPlayed: boolean): IAction {
  return {
    type: SET_IS_PLAYED,
    payload: {
      isPlayed,
    },
  };
}

export const SET_CAN_PLAYED = 'SET_CAN_PLAYED';
export function setCanPlayed(canPlayed: boolean): IAction {
  return {
    type: SET_CAN_PLAYED,
    payload: {
      canPlayed,
    },
  };
}

export const SET_PAUSED = 'SET_PAUSED';
export function setPaused(paused?: boolean): IAction {
  if (paused !== undefined) {
    return {
      type: SET_PAUSED,
      payload: {
        paused,
      },
    };
  }
  return {
    type: SET_PAUSED,
    payload: {},
  };
}

export const SET_CUR_PLAY_IMR_SRC = 'SET_CUR_PLAY_IMR_SRC';
export function setCurPlayImgSrc(curPlayImgSrc: string): IAction {
  return {
    type: SET_CUR_PLAY_IMR_SRC,
    payload: {
      curPlayImgSrc,
    },
  };
}

export const SET_CUR_PLAY_LRC_ARR = 'SET_CUR_PLAY_LRC_ARR';
export function setCurPlayLrcArr(lyrics: any[]): IAction {
  return {
    type: SET_CUR_PLAY_LRC_ARR,
    payload: {
      lyrics,
    },
  };
}

export const SET_LOCK = 'SET_LOCK';
export function setLock(lock: boolean): IAction {
  return {
    type: SET_LOCK,
    payload: {
      lock,
    },
  };
}

export const SET_LOOP = 'SET_LOOP';
export function setLoop(loop: boolean): IAction {
  return {
    type: SET_LOOP,
    payload: {
      loop,
    },
  };
}

export const SET_MODE_TYPE = 'SET_MODE_TYPE';
export function setModeType(modeType: string): IAction {
  return {
    type: SET_MODE_TYPE,
    payload: {
      modeType,
    },
  };
}

export const SET_LRC_CONFIG = 'SET_LRC_CONFIG';
export function setLrcConfig(lrcConfig: ILrcConfig): IAction {
  return {
    type: SET_LRC_CONFIG,
    payload: {
      lrcConfig,
    },
  };
}

export const SET_LRC_SWITCH = 'SET_LRC_SWITCH';
export function setLrcSwitch(lrcSwitch: boolean): IAction {
  return {
    type: SET_LRC_SWITCH,
    payload: {
      lrcSwitch,
    },
  };
}

export const SET_CUR_PLAY_SONG = 'SET_CUR_PLAY_SONG';
export function setCurPlaySong(curPlaySong: IPlaySongInfo): IAction {
  return {
    type: SET_CUR_PLAY_SONG,
    payload: {
      curPlaySong,
    },
  };
}

export function togglePlayStatus() {
  return (dispatch: Dispatch<any>, getState: GetStateFn) => {
    const state = getState();
    if (!state.audioSrc) {
      dispatch(setPaused(false));
      return;
    }
    dispatch(setPaused());

    const { audio, paused } = getState();
    if (paused) {
      audio?.pause();
    } else {
      audio?.pause();
    }
  };
}

export function playSong(curPlayIndex: number) {
  return async (dispatch: Dispatch<any>, getState: GetStateFn) => {
    Toast.loading('加载中...', 0);

    dispatch(setIsPlayed(false));
    dispatch(setAudioSrc(''));
    dispatch(setCurPlayLrcArr([]));
    dispatch(
      setCurPlayImgSrc(require('../../static/images/singer-default.jpg'))
    );
    dispatch(togglePlayStatus());
    dispatch(setLock(false));
    dispatch(
      setLrcConfig({
        activeLrcIndex: 0,
      })
    );

    const state = getState();
    const songList = _cloneDeep(state.songList);
    if (curPlayIndex < 0) {
      curPlayIndex = songList.length - 1;
    } else if (curPlayIndex >= songList.length) {
      curPlayIndex = 0;
    }
    const curPlaySong = _cloneDeep(songList[curPlayIndex]);
    curPlaySong.index = curPlayIndex;
    dispatch(setCurPlaySong(curPlaySong));

    try {
      const songName = curPlaySong.FileName;
      const infoRes = await apiGetSongInfo(songName);
      console.log('>>> [res] 获取歌曲的一些信息', infoRes);
      if (infoRes.status === 200 && infoRes.statusText === 'OK') {
        let rightSong: any = '';
        for (const song of infoRes.data.data.lists) {
          if (song.FileName === songName) {
            rightSong = _cloneDeep(song);
            break;
          }
        }
        const hash = rightSong.FileHash;
        try {
          const playRes = await apiPlay(hash);
          console.log('>>> [res] 根据hash值获取歌曲的播放信息', playRes);
          if (playRes.status === 200 && playRes.statusText === 'OK') {
            const data = _cloneDeep(playRes.data.data);
            Toast.hide();
            if (!data.play_url) {
              Toast.fail('暂无播放来源');
              return;
            }
            const audioSrc = data.play_url;
            const curPlayImgSrc = data.img;
            const lyrics = data.lyrics;
            dispatch(setCanPlayed(true));
            dispatch(setAudioSrc(audioSrc));
            dispatch(setCurPlayLrcArr(lyrics));
            dispatch(setCurPlayImgSrc(curPlayImgSrc));
          } else {
            Toast.hide();
            Toast.fail('播放歌曲失败');
            return;
          }
        } catch (err) {
          Toast.hide();
          console.log('>>> [err] 获取歌曲的信息', err);
          Toast.fail('网络出现错误或服务暂时不可用');
        }
      } else {
        Toast.hide();
        Toast.fail('播放歌曲失败');
        return;
      }
    } catch (err) {
      Toast.hide();
      Toast.fail('网络出现错误或服务暂时不可用');
      throw new Error(err);
    }
  };
}
