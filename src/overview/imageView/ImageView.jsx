import React, { useState, useEffect } from 'react';
import ImgMain from './ImgMain.jsx';
import ThumbnailView from './ThumbnailView.jsx';
import './styles.css'

const ImageView = ({ photos, expanded, changeView }) => {
  const [thumbnail, setThumbnail] = useState(0);

  useEffect(() => {
    console.log(thumbnail);
  }, [thumbnail])

  const updateThumbnail = (int) => {
    setThumbnail(int);
  }

  return (
    <div className='overview-image-view'>
      < ImgMain
        url={photos[thumbnail].url}
        expanded={expanded}
        changeView={changeView} />

      < ThumbnailView
        thumbnails={photos}
        thumbnail={thumbnail}
        expanded={expanded}
        updateThumbnail={updateThumbnail} />
    </div>
  );
}

export default ImageView;