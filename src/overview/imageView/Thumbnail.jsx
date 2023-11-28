import React from 'react';

const Thumbnail = ({ url, isSelected, expanded, updateThumbnail, index }) => {
  if (isSelected) {
    return (
      <button
        style={{
          backgroundImage: `url('${url}')`,
          backgroundSize: '100% 100%',
        }}
        className={`overview-thumbnail-${expanded}`}
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
      className={`overview-thumbnail-${expanded}`}
      onClick={() => { updateThumbnail(index); }}
    />
  );
};

export default Thumbnail;
