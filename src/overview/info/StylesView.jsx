import React, { useState, useEffect } from 'react';
import { v4 as key } from 'uuid';
import StyleThumbnail from './StyleThumbnail.jsx';

const StylesView = ({ styleIndex, styleInfo, updateStyle }) => {
  const [topThumbnailIndex, setTopThumbnailIndex] = useState(0);
  const sizeOfStyleView = 8;

  useEffect(() => {
    if (styleIndex === topThumbnailIndex - 1) {
      setTopThumbnailIndex(styleIndex);
    }
    if (styleIndex === topThumbnailIndex + sizeOfStyleView) {
      setTopThumbnailIndex(topThumbnailIndex + 1);
    }
  }, [styleIndex, topThumbnailIndex, sizeOfStyleView]);

  const incrementThumbnail = (increment) => {
    let newThumbnail = (topThumbnailIndex + increment);
    if (newThumbnail < 0 || newThumbnail > styleInfo.length) {
      newThumbnail = 0;
    }
    setTopThumbnailIndex(newThumbnail);
  };

  return (
    <div className='styles-view-wrapper'>
      <div aria-label='stylesView' className='overview-styles-view'>
        {styleInfo.slice(topThumbnailIndex, topThumbnailIndex + sizeOfStyleView).map((style, index) => (
          <StyleThumbnail
            key={key()}
            url={style.photos[0].thumbnail_url}
            isSelected={styleIndex === index}
            updateStyle={updateStyle}
            index={index}
          />

        ))}
      </div>
      {styleInfo.length > 8 ? (
        <div className='overview-styles-view-buttons'>
          <button className='overview-styles-view-up' type='button' onClick={() => incrementThumbnail(-8)}>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' strokeWidth='1.5' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18' />
            </svg>
          </button>
          <button className='overview-styles-view-down' type='button' onClick={() => incrementThumbnail(+8)}>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' strokeWidth='1.5' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3' />
            </svg>
          </button>
        </div>
      ) : ''}
    </div>
  );
};

export default StylesView;
