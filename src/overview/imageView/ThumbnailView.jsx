import React, { useState, useEffect, expanded } from 'react';
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
      // top thumb is 1
    }
  }, [thumbnail]);

  const changeThumbnailIndex = () => {
    if (topThumbnailIndex + 1 === thumbnails.length) {
      setTopThumbnailIndex(0);
    } else {
      setTopThumbnailIndex(topThumbnailIndex + 1);
    }
  };

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
            key={`overview-thumbnail-${index}`}
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
        >
          {' '}
          DOWN
          {' '}
        </button>
      </div>
      <button className='overview-left-button' onClick={() => { incrementThumbnail(-1); }}>{'<-'}</button>
      <button className='overview-right-button' onClick={() => { incrementThumbnail(+1); }}>{'->'}</button>
    </>
  );
};

export default ThumbnailView;
