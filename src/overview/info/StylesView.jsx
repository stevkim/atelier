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
  </div>
);

export default StylesView;
