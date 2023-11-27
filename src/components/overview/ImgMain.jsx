import React from 'react';

const ImgMain = ({ url, expanded, changeView }) => {
  return (
    <>
      <div
        className='overview-img-main-default'
        id='overview-img-main'
        style={{
          backgroundImage: `url('${url}')`,
          backgroundSize: '100% 100%'
        }}
        onClick={() => {
          let thisImg = document.getElementById('overview-img-main');
          let container = document.getElementById('overview');
          container.style.transform = `scale(1, 1.25)`;
          container.style.paddingTop = '8%';
          container.style.paddingBottom = '3%';
          container.style.marginBottom = '8%';
          thisImg.style.transform = 'scale(2, 1)';
          thisImg.style.translate = '40% 0%';
          changeView();
          console.log(thisImg.offsetHeight);
          console.log('hi');
        }} />
    </>
  );
}

export default ImgMain;