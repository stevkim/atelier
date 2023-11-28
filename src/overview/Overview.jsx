import React, { useState, useEffect } from 'react';
import Details from './details/Details.jsx';
import Info from './info/Info.jsx';
import ImageView from './imageView/ImageView.jsx';
import './styles.css';
import productExample from './product-example.js';
import { getProductStyles } from './helper-funcs/axios-requests.js';

const Overview = ({ productId, reviewsMetaData, productInfo }) => {
  const [inExpandedView, setInExpandedView] = useState(false);
  const [styleInfo, setStyleInfo] = useState(productExample.styles);
  const [style, setStyle] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState(styleInfo[style]);

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

  return (
    <div className='overview' id='overview'>
      <ImageView photos={selectedStyle.photos} expanded={inExpandedView} changeView={changeView} />
      {!inExpandedView ? <Info productInfo={productInfo} reviewsMetaData={reviewsMetaData.ratings} styleInfo={styleInfo} style={style} selectedStyle={selectedStyle} updateStyle={updateStyle} /> : ''}
      {!inExpandedView ? <Details productInfo={productInfo} /> : ''}
    </div>
  );
};

export default Overview;
