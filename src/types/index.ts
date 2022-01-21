import { Action } from 'redux';

export enum SongType {
  new = 'new',
  local = 'local',
  recommend = 'recommend',
}

export type SongTypes = SongType.new | SongType.local | SongType.recommend;

export interface ISong {
  FileName?: string;
  SongName?: string;
  SingerName?: string;
}

export interface ILrcColor {
  defaultColor: string;
  activeColor: string;
  currentImgSrc: string;
}

export interface IPlayLrc {
  startTime: string;
  curLrc: string;
  index: number;
}

export interface IPlaySongInfo extends ISong {
  index?: number;
}

export interface ILrcConfig {
  activeColor?: string;
  defaultColor?: string;
  activeLrcIndex: number;
}

export interface IAction extends Action<string> {
  payload: {
    [property: string]: any;
  };
}

export type AudioEle = HTMLAudioElement | null;
