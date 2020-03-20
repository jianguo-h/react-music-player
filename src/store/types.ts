import { IRootState } from './index';

/* export interface IRootState {
  view: string;
  songList: any[];
  searchListCount: number;
  audio: AudioEle;
  audioSrc: string | null;
  isPlayed: boolean;
  canPlayed: boolean;
  paused: boolean;
  curPlaySong: IPlaySongInfo;
  curPlayImgSrc: string;
  curPlayLrcArr: any[];
  lock: boolean;
  loop: boolean;
  modeType: string;
  lrcConfig: ILrcConfig;
  lrcSwitch: boolean;
} */

export interface IPlaySongInfo {
  index: number;
  FileName: string;
  SongName: string;
  SingerName: string;
}

export interface ILrcConfig {
  activeColor?: string;
  defaultColor?: string;
  activeLrcIndex: number;
}

export interface IAction {
  type: string;
  payload: {
    [property: string]: any;
  };
}

export type GetStateFn = () => IRootState;

export type AudioEle = HTMLAudioElement | null;
