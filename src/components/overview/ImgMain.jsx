import React from 'react';

const ImgMain = ({ url, inExpandedView, changeView }) => {
  return (
    <div>
      {!inExpandedView
        ? <img className='overview-img-main' id='default' src={url} onClick={() => { changeView() }} />
        : <img className='overview-img-main' id='expanded' src={url} onClick={() => { console.log('Zoom!') }} />
      }
    </div>
  );
}

export default ImgMain;