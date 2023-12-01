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
          height='165'
          width='165'
          className='review-item-image'
          onError={(e) => { e.target.src = 'https://i.imgur.com/mYzivnl.png'; }}
        />
      ))
    }
  </>
);

export default ReviewItemImages;
