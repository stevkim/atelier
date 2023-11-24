import React, { useState, useEffect } from 'react';
import ImgMain from './ImgMain.jsx';
import ThumbnailView from './ThumbnailView.jsx';

const ImageView = ({ photos }) => {
  const [thumbnail, setThumbnail] = useState(0);
  const [inExpandedView, setInExpandedView] = useState(false);

  useEffect(() => {
    console.log(thumbnail);
  }, [thumbnail])

  const updateThumbnail = (int) => {
    setThumbnail(int);
  }

  const incrementThumbnail = (increment) => {
    let newThumbnail = (thumbnail + increment) % Object.keys(photos).length;
    if (newThumbnail < 0) {
      newThumbnail = Object.keys(photos).length + newThumbnail;
    }
    setThumbnail(newThumbnail)
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
        updateThumbnail={updateThumbnail}
        incrementThumbnail={incrementThumbnail} />
    </div>
  );
}

export default ImageView;