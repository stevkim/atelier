import React from 'react';

const StyleThumbnail = ({ url, isSelected, updateStyle, index }) => {
  return (
    <img className='overview-style-thumbnail' onClick={() => { updateStyle(index) }}
      src={isSelected
        ? 'https://th.bing.com/th/id/OIP.7Vo3_7R0oiUNmKPPK6CgyQHaG1?rs=1&pid=ImgDetMain'
        : url} />
  );
}

export default StyleThumbnail;