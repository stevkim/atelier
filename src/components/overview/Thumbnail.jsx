import React from 'react';

const Thumbnail = ({url, isSelected, updateThumbnail, index}) => {
  return (
    <img className='overview-thumbnail'
      onClick={() => {updateThumbnail(index)}}
      src={isSelected
      ? 'https://th.bing.com/th/id/OIP.7Vo3_7R0oiUNmKPPK6CgyQHaG1?rs=1&pid=ImgDetMain'
      : url} />
  );
}

export default Thumbnail;