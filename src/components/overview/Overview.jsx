import React, { useState, useEffect } from 'react';
import Title from './Title.jsx';
import Category from './Category.jsx';
import Details from './Details.jsx';
import Reviews from './Reviews.jsx';
import ImageView from './ImageView.jsx';
import StylesView from './StylesView.jsx';
import Price from './Price.jsx';
import AddToCart from './AddToCart.jsx';
import './styles.css';
import productExample from './product-example.js';
import getOverviewById from './helper-funcs/getOverviewById.js';
require('dotenv').config();
const axios = require('axios');

/*
  Note how easy this would be easy to refactor. If we were to break up our input
  into 3 separate objects, for example, this component is all that would have to be
  changed.
*/

const Overview = ({ productId }) => {
  const [product, setProduct] = useState(productExample);
  const [style, setStyle] = useState(0);
  const selectedStyle = product.styles[style];
  console.log(selectedStyle);

  productId = productId | 40344;

  useEffect(() => {
    getOverviewById(productId)
      .then(res => setProduct(res))
      .catch(err => console.log(err))
  }, [productId])

  useEffect(() => {

  })

  const updateStyle = (int) => {
    setStyle(int);
  }

  // Tech debt: It would probably be faster to just pass in the entire product.
  // It's definitely more readable this way, though.

  return (
    <div className='overview'>
      < Title title={product.title} />
      < Category category={product.category} />

      {/* ImageView also contains the thumbnails. */}
      {< ImageView photos={selectedStyle.photos} />}

      {/* Tech Debt: Layout will be more responsive if we throw everything underneath this in a div and fix the CSS */}
      < Details
        slogan={product.slogan}
        description={product.description}
        features={product.features} />

      {/* TODO: Use Steven Powers */}
      {< Reviews reviews={product.reviews} />}

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