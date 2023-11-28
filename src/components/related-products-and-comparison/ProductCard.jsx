import React, { useState, useEffect } from 'react';
import { getProduct, getProductStyles, getReviewsMetaData } from './lib/fetchFunctions.js';
import StarRating from '../star-rating/StarRating.jsx';
import Price from '../price/Price.jsx';
import './styles/productCardStyles.css';

const ProductCard = ({
  id, productCardClick, actionButtonClick, actionButton,
}) => {
  const [imageURL, setImageURL] = useState('https://i.imgur.com/mYzivnl.png');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [originalPrice, setOriginalPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const [styles, product, reviewsMetaData] = await Promise.all([getProductStyles(id), getProduct(id), getReviewsMetaData(id)]);
      let defaultIndex = styles.data.results.findIndex((style) => style['default?'] === true);
      if (defaultIndex === -1) {
        defaultIndex = 0;
      }
      setOriginalPrice(styles.data.results[defaultIndex].original_price);
      setSalePrice(styles.data.results[defaultIndex].sale_price);
      if (styles.data.results[defaultIndex].photos[0].thumbnail_url) {
        setImageURL(styles.data.results[defaultIndex].photos[0].thumbnail_url);
      }
      setName(product.data.name);
      setCategory(product.data.category);
      const r = reviewsMetaData.data.ratings;
      setRating(
        (Number(r[1])
        + (Number(r[2]) * 2)
        + (Number(r[3]) * 3)
        + (Number(r[4]) * 4)
        + (Number(r[5]) * 5))
      / (Number(r[1]) + Number(r[2]) + Number(r[3]) + Number(r[4]) + Number(r[5]))
      );
    };
    getData();
  }, [id]);

  return (
    <div className='product-card'>
      <div className='action-button' onClick={() => { actionButtonClick(id); }}>{actionButton}</div>
      <div onClick={() => { productCardClick(id); }}>
        <div className='image-container'><img src={imageURL} alt={name} /></div>
        <h5>{category}</h5>
        <h3>{name}</h3>
        <Price selectedStyle={{ original_price: originalPrice, sale_price: salePrice }} />
        <StarRating rating={rating} />
      </div>
    </div>
  );
};

export default ProductCard;
