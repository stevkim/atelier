import React, { useState } from 'react';
import ImgMain from './ImgMain.jsx';
import ThumbnailView from './ThumbnailView.jsx';
import './styles.css';

const ImageView = ({ photos, expanded, changeView }) => {
  const [thumbnail, setThumbnail] = useState(0);

  const updateThumbnail = (int) => {
    setThumbnail(int);
  };

  return (
    <div className='overview-image-view' id='overview-image-view'>
      <ImgMain
        url={photos?.length > 0 ? photos[thumbnail]?.url : 'https://i.imgur.com/re3s4Yh.png'}
        expanded={expanded}
        changeView={changeView}
      />

      <ThumbnailView
        thumbnails={photos?.length > 0 ? photos : [{ thumbnail_url: 'https://i.imgur.com/re3s4Yh.png' }]}
        thumbnail={thumbnail}
        expanded={expanded}
        updateThumbnail={updateThumbnail}
      />
    </div>
  );
};

export default ImageView;
