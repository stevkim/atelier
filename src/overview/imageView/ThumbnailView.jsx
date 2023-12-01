import React, { useState, useEffect } from 'react';
import { v4 as key } from 'uuid';
import Thumbnail from './Thumbnail.jsx';
import rotatingSlice from '../helper-funcs/rotatingSlice.js';

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
        {rotatingSlice(thumbnails, topThumbnailIndex, sizeOfThumbnailView).map((photo, index) => (
          <Thumbnail
            key={key()}
            url={photo.thumbnail_url}
            isSelected={(index + topThumbnailIndex) % thumbnails.length === thumbnail}
            expanded={expanded}
            updateThumbnail={updateThumbnail}
            index={(index + topThumbnailIndex) % thumbnails.length}
          />
        ))}
        {!expanded ? (

          <button
            className='overview-thumbnail-button'
            onClick={() => { incrementThumbnail(+1); }}
            type='button'
            aria-label='next-thumbnail'
          >
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3' />
            </svg>

          </button>
        )
          : ''}
      </div>
      {thumbnails.length > 0
        ? (
          <button className='overview-left-button' aria-label='style-left' onClick={() => { incrementThumbnail(-1); }} type='button'>

            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
            </svg>

          </button>
        ) : ''}
      {thumbnails.length > 0 ? (
        <button className='overview-right-button' aria-label='style-right' onClick={() => { incrementThumbnail(+1); }} type='button'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3' />
          </svg>
        </button>
      ) : ''}
    </>
  );
};

export default ThumbnailView;
