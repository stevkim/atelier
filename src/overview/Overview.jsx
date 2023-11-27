import React, { useState, useEffect } from 'react';
import Details from './details/Details.jsx';
import Info from './info/Info.jsx';
import ImageView from './imageView/ImageView.jsx';
import './styles.css';
import productExample from './product-example.js';
import { getOverviewById } from './helper-funcs/axios-requests.js';

const Overview = ({ productId }) => {
  const [product, setProduct] = useState(productExample);
  const [style, setStyle] = useState(0);
  const [inExpandedView, setInExpandedView] = useState(false);
  let selectedStyle = product.styles[style];

  productId = productId || 40344;

  useEffect(() => {
    getOverviewById(productId)
      .then(res => setProduct(res))
      .catch(err => console.log(err))
  }, [productId])

  useEffect(() => {
    selectedStyle = product.styles[style];
  }, [style])

  const updateStyle = (int) => {
    setStyle(int);
  }

  const changeView = () => {
    setInExpandedView(true);
  }

  // Tech debt: It would probably be faster to just pass in the entire product.
  // It's definitely more readable this way, though.

  return (
    <div className='overview' id='overview'>
      < ImageView photos={selectedStyle.photos} expanded={inExpandedView} changeView={changeView} />
      {!inExpandedView ? <Info product={product} style={style} selectedStyle={selectedStyle} updateStyle={updateStyle} /> : ''}
      {!inExpandedView ? <Details product={product} expanded={inExpandedView} /> : ''}
    </div>
  )
}
export default Overview;