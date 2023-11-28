import React from 'react';

const Thumbnail = ({
  url, isSelected, updateThumbnail, index,
}) => {
  if (isSelected) {
    return (
      <div className='overview-thumbnail'>&#10004;</div>
    );
  }
  return (
    <img className='overview-thumbnail' onClick={() => { updateThumbnail(index); }} src={url} />
  );
};

export default Thumbnail;
