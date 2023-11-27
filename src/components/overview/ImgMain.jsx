import React from 'react';

const ImgMain = ({
  url, inExpandedView, changeView, incrementThumbnail,
}) => (
  <>
    {!inExpandedView
      ? <img className="overview-img-main-default" src={url} onClick={() => { changeView(); }} />
      : <img className="overview-img-main-expanded" src={url} onClick={() => { console.log('Zoom!'); }} />}
  </>
);

export default ImgMain;
