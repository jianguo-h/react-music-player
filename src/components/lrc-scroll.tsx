import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@src/store';
import { ILrcConfig } from '@src/store/types';

interface IProps {
  translateY?: number;
  lrcBoxRef: any;
}

const LrcScroll: React.FC<IProps> = props => {
  const { translateY = 0, lrcBoxRef } = props;

  const lrcConfig = useSelector<IRootState, ILrcConfig>(
    state => state.lrcConfig
  );
  const curPlayLrcArr = useSelector<IRootState, any[]>(
    state => state.curPlayLrcArr
  );

  return (
    <div
      className='lrc-box'
      ref={lrcBoxRef}
      style={{
        transform: 'translateY(-' + translateY + 'px)',
        color: lrcConfig.defaultColor
      }}
    >
      {curPlayLrcArr.map((lrcObj, index) => {
        return (
          <p
            key={index}
            style={{
              color:
                lrcConfig.activeLrcIndex === index ? lrcConfig.activeColor : ''
            }}
            data-starttime={lrcObj.startTime}
          >
            {lrcObj.curLrc}
          </p>
        );
      })}
    </div>
  );
};

export default LrcScroll;
