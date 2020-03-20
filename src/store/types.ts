import { IRootState } from './index';

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
