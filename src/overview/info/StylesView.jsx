import React from 'react';
import { v4 as key } from 'uuid';
import StyleThumbnail from './StyleThumbnail.jsx';

const StylesView = ({ styleIndex, styles, updateStyle }) => (
  <div className='overview-styles-view'>
    {styles.map((style, index) => (
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
