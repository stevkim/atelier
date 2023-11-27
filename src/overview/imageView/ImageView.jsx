import React, { useState, useEffect } from 'react';
import ImgMain from './ImgMain.jsx';
import ThumbnailView from './ThumbnailView.jsx';
import './styles.css';

const ImageView = ({ photos, expanded, changeView }) => {
  const [thumbnail, setThumbnail] = useState(0);

  useEffect(() => {
    console.log(thumbnail);
  }, [thumbnail]);

  const updateThumbnail = (int) => {
    setThumbnail(int);
  };

<<<<<<< HEAD:src/overview/imageView/ImageView.jsx
=======
  const changeView = () => {
    setInExpandedView(!inExpandedView);
  };

>>>>>>> b1d04ad926e3fd85c6578aaca8b85c5e4e5df630:src/components/overview/ImageView.jsx
  return (
    <div className='overview-image-view'>
      <ImgMain
        url={photos[thumbnail].url}
<<<<<<< HEAD:src/overview/imageView/ImageView.jsx
        expanded={expanded}
        changeView={changeView} />
=======
        inExpandedView={inExpandedView}
        changeView={changeView}
      />
>>>>>>> b1d04ad926e3fd85c6578aaca8b85c5e4e5df630:src/components/overview/ImageView.jsx

      <ThumbnailView
        thumbnails={photos}
        thumbnail={thumbnail}
<<<<<<< HEAD:src/overview/imageView/ImageView.jsx
        expanded={expanded}
        updateThumbnail={updateThumbnail} />
=======
        updateThumbnail={updateThumbnail}
      />
>>>>>>> b1d04ad926e3fd85c6578aaca8b85c5e4e5df630:src/components/overview/ImageView.jsx
    </div>
  );
};

export default ImageView;
