import React from 'react';

interface IProps {
  curPlayLrcArr?: any[];
  translateY?: number;
  defaultColor?: string;
  activeColor?: string;
  activeLrcIndex?: number;
  lrcBoxRef: any;
}

function LrcScroll(props: IProps) {
  const {
    curPlayLrcArr = [],
    translateY = 0,
    activeLrcIndex = 0,
    defaultColor = '#b2f5b5',
    activeColor = '#d1c90e',
    lrcBoxRef
  } = props;

  return (
    <div
      className="lrc-box"
      ref={lrcBoxRef}
      style={{
        transform: 'translateY(-' + translateY + 'px)',
        color: defaultColor
      }}
    >
      {curPlayLrcArr.map((lrcObj, index) => {
        return (
          <p
            key={index}
            style={{ color: activeLrcIndex === index ? activeColor : '' }}
            data-starttime={lrcObj.startTime}
          >
            {lrcObj.curLrc}
          </p>
        );
      })}
    </div>
  );
}

export default LrcScroll;
