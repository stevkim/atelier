import React from 'react';

const Thumbnail = ({ url, isSelected, expanded, updateThumbnail, index }) => {
  if (isSelected && expanded) {
    return (
      <button
        style={{ backgroundColor: 'white' }}
        type='button'
        aria-label={`thumbnail-${index}`}
        className={`overview-thumbnail-${expanded}`}
      >
        <div>&#10004;</div>
      </button>
    );
  };
  if (isSelected) {
    return (
      <button
        style={{
          backgroundImage: `url('${url}')`,
          backgroundSize: '100% 100%',
          objectFit: 'fill',
        }}
        type='button'
        aria-label={`thumbnail-${index}`}
        className={`overview-thumbnail-${expanded}`}
      >
        <div>&#10004;</div>
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
      aria-label={`thumbnail-${index}`}
      className={`overview-thumbnail-${expanded}`}
      onClick={() => { updateThumbnail(index); }}
    />
  );
};

export default Thumbnail;
