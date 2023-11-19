import React, { useState } from 'react';
import Title from './Title.jsx';
import Category from './Category.jsx';
import Details from './Details.jsx';
import Reviews from './Reviews.jsx';
import ImageView from './ImageView.jsx';
import StylesView from './StylesView.jsx';
import Price from './Price.jsx';
import AddToCart from './AddToCart.jsx';

import './styles.css';
import product from './product-example.js';

/*
  Note how easy this would be easy to refactor. If we were to break up our input
  into 3 separate objects, for example, this component is all that would have to be
  changed.
*/

const Overview = () => {
  const [style, setStyle] = useState(0);
  const selectedStyle = product.styles[style];

  const updateStyle = (int) => {
    setStyle(int);
  }

  return (
    <div className='overview'>
      < Title title={product.title} />
      < Category category={product.category} />

      < Details
        slogan={product.slogan}
        description={product.description}
        features={product.features} />

      {/* TODO: Use Steven Powers */}
      {< Reviews reviews={product.reviews} />}

      {/* ImageView also contains the thumbnails. */}
      {< ImageView photos={selectedStyle.photos} />}

      {/* Styles will change the style state */}
      {< StylesView styleIndex={style} styles={product.styles} updateStyle={updateStyle} />}

      {/* Price also has the SelectedStyle textbox */}
      {< Price selectedStyle={selectedStyle} />}

      {/* Needs a sizeDropdown, quantityDropdown, and Submit sub */}
      {< AddToCart skus={selectedStyle.skus} />}
    </div>
  );
}

export default Overview;