import React, { useState, useEffect, expanded } from 'react';
import Thumbnail from './Thumbnail.jsx';

<<<<<<< HEAD:src/overview/imageView/ThumbnailView.jsx
const ThumbnailView = ({ thumbnails, thumbnail, expanded, updateThumbnail, }) => {
=======
const ThumbnailView = ({ thumbnails, thumbnail, updateThumbnail }) => {
>>>>>>> b1d04ad926e3fd85c6578aaca8b85c5e4e5df630:src/components/overview/ThumbnailView.jsx
  const [topThumbnailIndex, setTopThumbnailIndex] = useState(0);
  const sizeOfThumbnailView = 7;

  useEffect(() => {
    // This should check if the thumbnail is immediately before or after the array
    // This is true if:
    // thumbnail === topThumb - 1, written as:
    // thumbnail === topThumb
    // thumbnail is 5, topThumb is 0
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

<<<<<<< HEAD:src/overview/imageView/ThumbnailView.jsx
  const rotatingSlice = (arr) => {
    let slice = arr.slice(topThumbnailIndex, Math.min(topThumbnailIndex + sizeOfThumbnailView, thumbnails.length))
    for (var i = 0; slice.length < Math.min(sizeOfThumbnailView, arr.length); i++) {
=======
  const rotatingSliceOf5 = (arr) => {
    const slice = arr.slice(topThumbnailIndex, Math.min(topThumbnailIndex + sizeOfThumbnailView, thumbnails.length));
    for (let i = 0; slice.length < Math.min(sizeOfThumbnailView, arr.length); i++) {
>>>>>>> b1d04ad926e3fd85c6578aaca8b85c5e4e5df630:src/components/overview/ThumbnailView.jsx
      slice.push(arr[i]);
    }
    return slice;
  };

  const incrementThumbnail = (increment) => {
    let newThumbnail = (thumbnail + increment) % Object.keys(thumbnails).length;
    if (newThumbnail < 0) {
      // thumbnail becomes 5
      newThumbnail = Object.keys(thumbnails).length + newThumbnail;
    }
    updateThumbnail(newThumbnail);
  };

  return (
    <>
<<<<<<< HEAD:src/overview/imageView/ThumbnailView.jsx
      <div className={'overview-thumbnail-view-' + expanded}>
        {rotatingSlice(thumbnails).map((photo, index) => {
          return (
            <Thumbnail key={'overview-thumbnail-' + index}
              url={photo.thumbnail_url}
              isSelected={(index + topThumbnailIndex) % thumbnails.length === thumbnail}
              expanded={expanded}
              updateThumbnail={updateThumbnail}
              index={(index + topThumbnailIndex) % thumbnails.length} />
          );
        })}
=======
      <div className='overview-thumbnail-view'>
        {rotatingSliceOf5(thumbnails).map((photo, index) => (
          <Thumbnail
            key={`overview-thumbnail-${index}`}
            url={photo.thumbnail_url}
            isSelected={(index + topThumbnailIndex) % thumbnails.length === thumbnail}
            updateThumbnail={updateThumbnail}
            index={(index + topThumbnailIndex) % thumbnails.length}
          />
        ))}
>>>>>>> b1d04ad926e3fd85c6578aaca8b85c5e4e5df630:src/components/overview/ThumbnailView.jsx
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
<<<<<<< HEAD:src/overview/imageView/ThumbnailView.jsx

}
=======
};
>>>>>>> b1d04ad926e3fd85c6578aaca8b85c5e4e5df630:src/components/overview/ThumbnailView.jsx

export default ThumbnailView;
