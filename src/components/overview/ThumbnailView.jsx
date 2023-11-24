import React from 'react';
import Thumbnail from './Thumbnail.jsx';

const ThumbnailView = ({thumbnails, thumbnail, updateThumbnail}) => {
  return (
    <div className='overview-thumbnail-view'>
      {thumbnails.slice(0, 5).map((photo, index) => {
        return (
          <Thumbnail key={'overview-thumbnail-' + index}
          thumbnail={thumbnail}
          updateThumbnail={updateThumbnail}
          url={photo.thumbnail_url}
          index={index} />
        );
      })}
    </div>
  );
}

export default ThumbnailView;