import React from 'react';

interface IProps {
  resultCount: number;
  searchTip: string;
  resultList: any[];
  search: (keyword: string) => void;
}

function DropList(props: IProps) {
  const {
    resultCount = 0,
    searchTip = '正在搜索...',
    resultList = [],
    search
  } = props;

  return (
    <div className='search-list'>
      {resultCount > 0 ? (
        <ul>
          {resultList.map((item, index) => {
            return (
              <li key={index} onClick={() => search(item.HintInfo)}>
                {item.HintInfo}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>{searchTip}</p>
      )}
    </div>
  );
}

export default DropList;
