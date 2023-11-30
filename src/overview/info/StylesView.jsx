import React from 'react';
import { v4 as key } from 'uuid';
import StyleThumbnail from './StyleThumbnail.jsx';

const StylesView = ({ styleIndex, styleInfo, updateStyle }) => (
  <div aria-label='stylesView' className='overview-styles-view'>
    {styleInfo.map((style, index) => (
      <StyleThumbnail
        key={key()}
        url={style.photos[0].thumbnail_url}
        isSelected={styleIndex === index}
        updateStyle={updateStyle}
        index={index}
      />
    ))}
    <button className='styles-view-up' type='button'>
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18' />
      </svg>
    </button>
    <button className='styles-view-down' type='button'>
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3' />
      </svg>
    </button>
  </div>
);

export default StylesView;
