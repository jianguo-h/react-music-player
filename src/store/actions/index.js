import api from '../../api';
import { Toast } from 'antd-mobile';
import _cloneDeep from 'lodash/cloneDeep';

// action creators function
export function setView(view) {
  return {
    type: 'setView',
    view
  };
}

export function setSongList(songList) {
  return {
    type: 'setSongList',
    songList
  };
}

export function setSearchListCount(searchListCount) {
  return {
    type: 'setSearchListCount',
    searchListCount
  };
}

export function setAudio(audio) {
  return {
    type: 'setAudio',
    audio
  };
}

export function setAudioSrc(audioSrc) {
  return {
    type: 'setAudioSrc',
    audioSrc
  };
}

export function setIsPlayed(isPlayed) {
  return {
    type: 'setIsPlayed',
    isPlayed
  };
}

export function setCanPlayed(canPlayed) {
  return {
    type: 'setCanPlayed',
    canPlayed
  };
}

export function setPaused(paused) {
  if(paused !== undefined) {
    return {
      type: 'setPaused',
      paused
    };
  }
  return {
    type: 'setPaused'
  };
}

export function setCurPlayImgSrc(curPlayImgSrc) {
  return {
    type: 'setCurPlayImgSrc',
    curPlayImgSrc
  };
}

export function setCurPlayLrcArr(lyrics) {
  return {
    type: 'setCurPlayLrcArr',
    lyrics
  };
}

export function setLock(lock) {
  return {
    type: 'setLock',
    lock
  };
}

export function setLoop(loop) {
  return {
    type: 'setLoop',
    loop
  };
}

export function setModeType(modeType) {
  return {
    type: 'setModeType',
    modeType
  };
}

export function setLrcConfig(lrcConfig) {
  return {
    type: 'setLrcConfig',
    lrcConfig
  };
}

export function setLrcSwitch(lrcSwitch) {
  return {
    type: 'setLrcSwitch',
    lrcSwitch
  };
}

export function setCurPlaySong(curPlaySong) {
  return {
    type: 'setCurPlaySong',
    curPlaySong
  }
}

export function togglePlayStatus() {
  return (dispatch, getState) => {
    const state = getState();
    if(!state.audioSrc) {
      dispatch(setPaused(false));
      return;
    }
    dispatch(setPaused());

    const { audio, paused } = getState();
    if(paused) {
      audio && audio.pause();
    }
    else {
      audio && audio.play();
    }
  };
}

export function playSong(curPlayIndex) {
  return async (dispatch, getState) => {
    Toast.loading('加载中...', 0);
    
    dispatch(setIsPlayed(false));
    dispatch(setAudioSrc(''));
    dispatch(setCurPlayLrcArr([]));
    dispatch(setCurPlayImgSrc('/singer-default.jpg'));
    dispatch(togglePlayStatus());
    dispatch(setLock(false));
    dispatch(setLrcConfig({
      activeLrcIndex: 0
    }));
    
    const state = getState();
    const songList = _cloneDeep(state.songList);
    if(curPlayIndex < 0) {
      curPlayIndex = songList.length - 1;
    }
    else if(curPlayIndex >= songList.length) {
      curPlayIndex = 0;
    }
    const curPlaySong = _cloneDeep(songList[curPlayIndex]);
    curPlaySong.index = curPlayIndex;
    dispatch(setCurPlaySong(curPlaySong));

    try {
      const songName = curPlaySong.FileName;
      const infoRes = await api.getSongInfo(songName);
      console.log('>>> [res] 获取歌曲的一些信息', infoRes);
      if(infoRes.status === 200 && infoRes.statusText === 'OK') {
        let rightSong = '';
        for(const song of infoRes.data.data.lists) {
          if(song.FileName === songName) {
            rightSong = _cloneDeep(song);
            break;
          }
        }
        const hash = rightSong.FileHash;
        try {
          const playRes = await api.play(hash);
          console.log('>>> [res] 根据hash值获取歌曲的播放信息', playRes);
          if(playRes.status === 200 && playRes.statusText === 'OK') {
            const data = _cloneDeep(playRes.data.data);
            Toast.hide();
            if(!data.play_url) {
              Toast.filf('暂无播放来源',);
              return;
            }
            const audioSrc = data.play_url;
            const curPlayImgSrc = data.img;
            const lyrics = data.lyrics;
            dispatch(setCanPlayed(true));
            dispatch(setAudioSrc(audioSrc));
            dispatch(setCurPlayLrcArr(lyrics));
            dispatch(setCurPlayImgSrc(curPlayImgSrc));
          }
          else {
            Toast.hide();
            Toast.fail('播放歌曲失败');
            return;
          }
        }
        catch(err) {
          Toast.hide();
          console.log('>>> [err] 获取歌曲的信息', err);
          Toast.fail('网络出现错误或服务暂时不可用');
        }
      }
      else {
        Toast.hide();
        Toast.fail('播放歌曲失败');
        return;
      }
    }
    catch(err) {
      Toast.hide();
      Toast.fail('网络出现错误或服务暂时不可用');
      throw new Error(err);
    }
  }
}