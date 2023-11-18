import React, { useState } from 'react';
import ImgMain from './ImgMain.jsx';
import ThumbnailView from './ThumbnailView.jsx';

const ImageView = ({ photos }) => {
  const [thumbnail, setThumbnail] = useState(0);
  const [inExpandedView, setInExpandedView] = useState(false);

  const updateThumbnail = (int) => {
    setThumbnail(int);
  }

  const changeView = () => {
    setInExpandedView(!inExpandedView);
  }

  return (
    <div className='overview-image-view'>
      < ImgMain
        url={photos[thumbnail].url}
        inExpandedView={inExpandedView}
        changeView={changeView} />

      < ThumbnailView
        thumbnails={photos}
        thumbnail={thumbnail}
        updateThumbnail={updateThumbnail} />
    </div>
  );
}

export default ImageView;