import React from 'react';

const StyleThumbnail = ({ url, isSelected, updateStyle, index }) => {
  if (isSelected) {
    return (
      <div className='overview-style-thumbnail'>&#10004;</div>
    );
  } else {
    return (
      <img className='overview-style-thumbnail' onClick={() => { updateStyle(index) }} src={url} />
    );
  }
}

export default StyleThumbnail;