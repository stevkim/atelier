import React from 'react';
import Thumbnail from './Thumbnail.jsx';

const ThumbnailView = ({thumbnails, thumbnail, updateThumbnail}) => {
  return (
    <div id='overview-thumbnail-view'>
      {thumbnails.map((photo, index) => {
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