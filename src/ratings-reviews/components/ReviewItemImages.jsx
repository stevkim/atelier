import React from 'react';

const ReviewItemImages = ({ photos }) => (
  <>
    {
      photos.map((photo) => (
        <img
          key={photo.id}
          aria-label={photo.id}
          src={photo.url}
          alt='Reviewer upload'
          className='review-item-image'
          onError={(e) => { e.target.src = 'https://i.imgur.com/mYzivnl.png'; }}
        />
      ))
    }
  </>
);

export default ReviewItemImages;
