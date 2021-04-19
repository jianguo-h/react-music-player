import { useDispatch, useSelector } from 'react-redux';
import PlayDetail from './play-detail';
import React, { useState, useRef } from 'react';
import PlayOperate from '../components/play-operate';
import { Toast } from 'antd-mobile';
import { setAudio, setIsPlayed, playSong } from '@src/store/actions';
import { RootState } from '@src/store';
import { IPlaySongInfo } from '@src/types';
import '../less/player.less';
import { AudioEle } from '@src/types';

const Player: React.FC = () => {
  const dispatch = useDispatch();

  const audioSrc = useSelector<RootState, string | null>(
    state => state.audioSrc
  );
  const loop = useSelector<RootState, boolean>(state => state.loop);
  const canPlayed = useSelector<RootState, boolean>(state => state.canPlayed);
  const isPlayed = useSelector<RootState, boolean>(state => state.isPlayed);
  const curPlaySong = useSelector<RootState, IPlaySongInfo>(
    state => state.curPlaySong
  );
  const curPlayImgSrc = useSelector<RootState, string>(
    state => state.curPlayImgSrc
  );
  const paused = useSelector<RootState, boolean>(state => state.paused);
  const lock = useSelector<RootState, boolean>(state => state.lock);
  const modeType = useSelector<RootState, string>(state => state.modeType);

  const audioEl = useRef<AudioEle>(null);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const setCurrentTime = (time: number) => {
    if (audioEl.current) {
      audioEl.current.currentTime = time;
      console.log(audioEl.current.currentTime);
    }
  };

  const onCanplay = () => {
    if (lock) return;

    if (audioEl.current?.readyState === 4) {
      audioEl.current?.play();
      dispatch(setAudio(audioEl.current));
      dispatch(setIsPlayed(true));
    } else {
      Toast.fail('歌曲暂时无法播放, 请稍后重试');
    }
  };

  const onEnded = () => {
    if (modeType !== 'order') return;

    const nextPlayIndex = curPlaySong.index ?? 0 + 1;
    dispatch(playSong(nextPlayIndex));
  };

  const playDetailProps = {
    showDetail,
    setShowDetail,
    setCurrentTime,
  };

  let footerSingerClass = 'footer-singer';
  footerSingerClass = isPlayed
    ? footerSingerClass + ' rotate'
    : footerSingerClass;
  footerSingerClass = paused
    ? footerSingerClass + ' paused'
    : footerSingerClass;

  return canPlayed ? (
    <div id='player' className='fade'>
      <div
        className='footer-play'
        style={{ visibility: !showDetail ? 'visible' : 'hidden' }}
      >
        <div className='footer-left' onClick={() => setShowDetail(true)}>
          <div className={footerSingerClass}>
            <img src={curPlayImgSrc} alt='歌手图片' />
          </div>
          <div className='footer-playerInfo'>
            <p className='song-name'>{curPlaySong.SongName}</p>
            <p className='singer-name'>{curPlaySong.SingerName}</p>
          </div>
        </div>
        <div className='footer-right'>
          <PlayOperate showDetail={showDetail}></PlayOperate>
        </div>
      </div>
      {/* 播放详情组件 */}
      <PlayDetail {...playDetailProps}></PlayDetail>
      <div className='audio'>
        <audio
          src={audioSrc ?? ''}
          loop={loop}
          ref={audioEl}
          onCanPlay={onCanplay}
          onEnded={onEnded}
        ></audio>
      </div>
    </div>
  ) : null;
};

export default Player;
