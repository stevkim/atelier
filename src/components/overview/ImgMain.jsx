import React from 'react';

const ImgMain = ({ url, inExpandedView, changeView, incrementThumbnail }) => {
  return (
    <>
      {!inExpandedView
        ? <div
          className='overview-img-main-default'
          style={{
            backgroundImage: `url('${url}')`,
            backgroundSize: '100% 100%'
          }}
          onClick={() => { changeView() }} />
        : <div
          className='overview-img-main-expanded'
          style={{
            backgroundImage: `url('${url}')`,
            backgroundSize: '100% 100%'
          }}
          onClick={() => { console.log('Zoom!') }} />
      }
    </>
  );
}

export default ImgMain;