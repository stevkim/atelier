import React, { useState, useEffect } from 'react';
import Thumbnail from './Thumbnail.jsx';

const ThumbnailView = ({ thumbnails, thumbnail, updateThumbnail }) => {
  const [topThumbnailIndex, setTopThumbnailIndex] = useState(0);

  useEffect(() => {
    updateThumbnail(topThumbnailIndex);
  }, [topThumbnailIndex])

  const changeThumbnailIndex = () => {
    if (topThumbnailIndex + 1 === thumbnails.length) {
      setTopThumbnailIndex(0);
    } else {
      setTopThumbnailIndex(topThumbnailIndex + 1);
    }
  };

  const rotatingSliceOf5 = (arr) => {
    let sliceOf5 = arr.slice(topThumbnailIndex, Math.min(topThumbnailIndex + 5, thumbnails.length))
    for (var i = 0; sliceOf5.length < Math.min(5, arr.length); i++) {
      sliceOf5.push(arr[i]);
    }
    return sliceOf5;
  }

  return (
    <div className='overview-thumbnail-view'>
      {rotatingSliceOf5(thumbnails).map((photo, index) => {
        return (
          <Thumbnail key={'overview-thumbnail-' + index}
            thumbnail={thumbnail}
            updateThumbnail={updateThumbnail}
            url={photo.thumbnail_url}
            index={index} />
        );
      })}
      <button
        className='overview-thumbnail-button'
        onClick={() => { changeThumbnailIndex() }}
      > DOWN </button>
    </div>
  );
}

export default ThumbnailView;