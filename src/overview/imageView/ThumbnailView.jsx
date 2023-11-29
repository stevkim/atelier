import React, { useState, useEffect } from 'react';
import { v4 as key } from 'uuid';
import Thumbnail from './Thumbnail.jsx';

const ThumbnailView = ({ thumbnails, thumbnail, expanded, updateThumbnail }) => {
  const [topThumbnailIndex, setTopThumbnailIndex] = useState(0);
  const sizeOfThumbnailView = 7;

  useEffect(() => {
    if (thumbnail === topThumbnailIndex - 1) {
      setTopThumbnailIndex(thumbnail);
    }
    if (thumbnail === topThumbnailIndex + sizeOfThumbnailView) {
      setTopThumbnailIndex(topThumbnailIndex + 1);
    }
  }, [thumbnail]);

  /*
    const changeThumbnailIndex = () => {
      if (topThumbnailIndex + 1 === thumbnails.length) {
        setTopThumbnailIndex(0);
      } else {
        setTopThumbnailIndex(topThumbnailIndex + 1);
      }
    };
  */

  const rotatingSlice = (arr) => {
    const slice = arr.slice(topThumbnailIndex, Math.min(topThumbnailIndex + sizeOfThumbnailView, thumbnails.length));
    for (let i = 0; slice.length < Math.min(sizeOfThumbnailView, arr.length); i++) {
      slice.push(arr[i]);
    }
    return slice;
  };

  const incrementThumbnail = (increment) => {
    let newThumbnail = (thumbnail + increment) % Object.keys(thumbnails).length;
    if (newThumbnail < 0) {
      newThumbnail = Object.keys(thumbnails).length + newThumbnail;
    }
    updateThumbnail(newThumbnail);
  };

  return (
    <>
      <div className={`overview-thumbnail-view-${expanded}`}>
        {rotatingSlice(thumbnails).map((photo, index) => (
          <Thumbnail
            key={key()}
            url={photo.thumbnail_url}
            isSelected={(index + topThumbnailIndex) % thumbnails.length === thumbnail}
            expanded={expanded}
            updateThumbnail={updateThumbnail}
            index={(index + topThumbnailIndex) % thumbnails.length}
          />
        ))}
        <button
          className='overview-thumbnail-button'
          onClick={() => { incrementThumbnail(+1); }}
          type='button'
        >
          {' '}
          DOWN
          {' '}
        </button>
      </div>
      {thumbnails.length > 0 ? <button className='overview-left-button' onClick={() => { incrementThumbnail(-1); }} type='button'>{'<-'}</button> : ''}
      {thumbnails.length > 0 ? <button className='overview-right-button' onClick={() => { incrementThumbnail(+1); }} type='button'>{'->'}</button> : ''}
    </>
  );
};

export default ThumbnailView;
