import React from 'react';

interface IProps {
  changeLrcColor: (index: number) => void;
  lrcColorList: any[];
}

function LrcColor(props: IProps) {
  const { lrcColorList, changeLrcColor } = props;
  return (
    <div className='color-list'>
      {lrcColorList.map((currentObj, index) => {
        return (
          <li
            key={index}
            style={{
              backgroundImage:
                'url(' + require('../static' + currentObj.currentImgSrc) + ')'
            }}
            onClick={() => changeLrcColor(index)}
          ></li>
        );
      })}
    </div>
  );
}

export default LrcColor;
