import React, { useState, useEffect } from 'react';
import Details from './details/Details.jsx';
import Info from './info/Info.jsx';
import ImageView from './imageView/ImageView.jsx';
import './styles.css';
import { getProductStyles } from './helper-funcs/axios-requests.js';

const Overview = ({ productId, reviewsMetaData, productInfo }) => {
  const [inExpandedView, setInExpandedView] = useState(false);
  const [styleInfo, setStyleInfo] = useState([]);
  const [style, setStyle] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState(undefined);

  useEffect(() => {
    getProductStyles(productId)
      .then((res) => {
        setStyleInfo(res.data.results);
        setSelectedStyle(res.data.results[style]);
      })
      .catch((err) => console.log(err));
  }, [productId]);

  const updateStyle = (int) => {
    setStyle(int);
    setSelectedStyle(styleInfo[int]);
  };

  const changeView = () => {
    setInExpandedView(true);
  };

  const styleLoaded = () => styleInfo.length !== 0 && selectedStyle;

  // Tech debt: It would probably be faster to just pass in the entire product.
  // It's definitely more readable this way, though.

  return (
    <div className='overview' id='overview'>
      {styleLoaded() ? <ImageView photos={selectedStyle.photos} expanded={inExpandedView} changeView={changeView} /> : 'Loading image view...'}
      {styleLoaded() && !inExpandedView ? <Info productInfo={productInfo} reviewsMetaData={reviewsMetaData.ratings} styleInfo={styleInfo} style={style} selectedStyle={selectedStyle} updateStyle={updateStyle} /> : ''}
      {styleLoaded() && !inExpandedView ? <Details productInfo={productInfo} /> : ''}
    </div>
  );
}
export default Overview;
