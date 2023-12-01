import React from 'react';

const StyleThumbnail = ({ url, isSelected, updateStyle, index }) => {
  if (isSelected) {
    return (
      <button
        style={{
          backgroundImage: `url('${url}')`,
          backgroundSize: '100% 100%',
          objectFit: 'fill',
        }}
        className='overview-style-thumbnail'
        type='button'
        aria-label={`styles-thumbnail-${index}`}
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
        objectFit: 'fill',
      }}
      type='button'
      aria-label={`styles-thumbnail-${index}`}
      className='overview-style-thumbnail'
      onClick={() => { updateStyle(index); }}
    />
  );
};

export default StyleThumbnail;
