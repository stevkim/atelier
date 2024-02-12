import React, { memo } from 'react';

const AddReviewUserImages = ({ photos }) => (
  <div className='user-image-wrapper' data-testid='user-upload'>
    {
      photos.map((image) => <img key={image} width='165' height='165' src={image} alt='User upload' />)
    }
  </div>
);

export default memo(AddReviewUserImages);
