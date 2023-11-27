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

  productId |= 40344;

  useEffect(() => {
    getOverviewById(productId)
      .then((res) => setProduct(res))
      .catch((err) => console.log(err));
  }, [productId]);

  const updateStyle = (int) => {
    setStyle(int);
  };

  // Tech debt: It would probably be faster to just pass in the entire product.
  // It's definitely more readable this way, though.

  return (
    <div className="overview">
      <ImageView photos={selectedStyle.photos} />
      <div className="overview-overview">
        <Reviews product={product} />
        <div className="overview-category">{product.category}</div>
        <h3 className="overview-title">{product.title}</h3>
        <Price selectedStyle={selectedStyle} />
        <StylesView styleIndex={style} styles={product.styles} updateStyle={updateStyle} />
        <AddToCart skus={selectedStyle.skus} />
        <div className="overview-share-buttons">
          <button className="share-facebook">f</button>
          <button className="share-x">x</button>
          <button className="share-pinterest">P</button>
        </div>
      </div>
      <Details product={product} />
    </div>
  );
};
export default Overview;
