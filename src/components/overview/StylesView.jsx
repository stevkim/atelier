import React from 'react';
import StyleThumbnail from './StyleThumbnail.jsx';

const StylesView = ({styleIndex, styles, updateStyle}) => {
  return (
    <div className='overview-styles-view'>
      Thumbnails:
      {styles.map((style, index) => {
        return (
          <StyleThumbnail key={'overview-style-' + index}
          url={style.photos[0].thumbnail_url}
          isSelected={styleIndex === index}
          updateStyle={updateStyle}
          index={index}/>
        );
      })}
    </div>
  );
}

export default StylesView;