import React from 'react';

const StyleThumbnail = ({ url, isSelected, updateStyle, index }) => {
  if (isSelected) {
    return (
      <button
        style={{
          backgroundImage: `url('${url}')`,
          backgroundSize: '100% 100%',
        }}
        className='overview-style-thumbnail'
      >
        &#10004;
      </button>
    );
  }
  return (
    <button
      style={{
        backgroundImage: `url('${url}')`,
        backgroundSize: '100% 100%',
      }}
      className='overview-style-thumbnail'
      onClick={() => { updateStyle(index); }}
    />
  );
};

export default StyleThumbnail;
