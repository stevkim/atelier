import React from 'react';

const ImgMain = ({ url, expanded, changeView }) => {
  let thisImg = document.getElementById('overview-img-main');
  let zoomBox = document.getElementById('zoom-box');
  let container = document.getElementById('overview');

  return (
    <>
      <button
        className='overview-img-main-default'
        id='overview-img-main'
        style={{
          backgroundImage: `url('${url}')`,
          backgroundSize: '100% 100%'
        }}
        onClick={() => {
          if (!expanded) {
            container.style.transform = `scale(1, 1.125)`;
            container.style.paddingTop = '4%';
            container.style.paddingBottom = '3%';
            container.style.marginBottom = '8%';
            thisImg.style.transform = 'scale(2, 1)';
            thisImg.style.translate = '40% 0%';
            changeView();
          } else {
            container.addEventListener('mousemove', (e) => {
              // Set up relative zooming
              const rect = thisImg.getBoundingClientRect();
              const scaleX = thisImg.offsetWidth / (rect.width); // zoom power
              const scaleY = thisImg.offsetHeight / (rect.height);
              const mouseX = e.clientX;
              const mouseY = e.clientY;

              // Set up zoom box position and size
              const zoomSize = 200;
              const zoomRectangleX = mouseX - zoomSize / 2;
              const zoomRectangleY = mouseY - zoomSize / 2;

              // Apply to zoom box
              zoomBox.style.width = zoomSize + 'px';
              zoomBox.style.height = zoomSize + 'px';
              // zoomBox.style.transform = `scale(${scaleX}, ${scaleY})`;
              zoomBox.style.backgroundImage = thisImg.style.backgroundImage;
              zoomBox.style.backgroundSize = `${rect.right * scaleX}px ${rect.height * scaleY}px`;
              zoomBox.style.backgroundPosition = `-${(mouseX - 2 * rect.left) * scaleX}px -${(mouseY - 2 * rect.top) * scaleY}px`;
              zoomBox.style.left = zoomRectangleX + 'px';
              zoomBox.style.top = zoomRectangleY + 'px';
              zoomBox.style.display = 'block';
              zoomBox.style.objectFit = 'fill';
            })
            thisImg.addEventListener('mouseenter', () => {
              zoomBox.style.display = 'block';
            })
            thisImg.addEventListener('mouseleave', () => {
              zoomBox.style.display = 'none';
            })
          }
        }} />
      <div id='zoom-box'>

      </div>
    </>
  );
}

export default ImgMain;