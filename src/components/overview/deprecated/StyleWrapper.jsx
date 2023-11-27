import React, { useState, useEffect } from 'react';
import ImageView from './ImageView.jsx';
import StylesView from './StylesView.jsx';
import Price from './Price.jsx';
import AddToCart from './AddToCart.jsx';

const StyleWrapper = ({ styles }) => {
  // This exists to reduce excessive rendering.
  const [style, setStyle] = useState(0);
  const selectedStyle = styles[style];

  const updateStyle = (int) => {
    setStyle(int);
  };

  return (
    <div className="overview-style-wrapper">
      {/* ImageView also contains the thumbnails. */}
      <ImageView photos={selectedStyle.photos} />

      {/* Styles will change the style state */}
      <StylesView styleIndex={style} styles={styles} updateStyle={updateStyle} />

      {/* Price also has the SelectedStyle textbox */}
      <Price selectedStyle={selectedStyle} />

      {/* Needs a sizeDropdown, quantityDropdown, and Submit sub */}
      <AddToCart skus={selectedStyle.skus} />
    </div>
  );
};

export default StyleWrapper;
