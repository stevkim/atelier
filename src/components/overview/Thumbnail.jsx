import React from 'react';

const Thumbnail = ({ url, isSelected, updateThumbnail, index }) => {
  if (isSelected) {
    return (
      <div
        style={{
          backgroundImage: `url('${url}')`,
          backgroundSize: '100% 100%'
        }}
        className='overview-thumbnail'>&#10004;</div>
    );
  } else {
    return (
      <div
        style={{
          backgroundImage: `url('${url}')`,
          backgroundSize: '100% 100%'
        }}
        className='overview-thumbnail'
        onClick={() => { updateThumbnail(index) }} />
    );
  }
}

export default Thumbnail;