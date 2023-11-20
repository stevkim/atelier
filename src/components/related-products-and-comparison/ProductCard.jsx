import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from '../star-rating/StarRating.jsx';
import Price from '../overview/Price.jsx';
import './styles/productCardStyles.css';
require("dotenv").config();

// image url: (products/:id/styles).results[(index where .default? === true)].photos[0].url
// category:  (products/:id).category
// name:      (products/:id).name
// price:     (products/:id/styles).results[(index where .default? === true)].sale_price || .original_price
// stars:     (reviews/meta/?product_id=:id).ratings
// star avg:  (ratings.1 + (ratings.2 * 2) + (ratings.3 * 3) + (ratings.4 * 4) + (ratings.5 * 5)) / (ratings.1 + ratings.2 + ratings.3 + ratings.4 + ratings.5)


const ProductCard = ({ id }) => {
  const [imageURL, setImageURL] = useState('./productimagenotfound.png');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [originalPrice, setOriginalPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    axios.get(`${process.env.API_URL}/products/${id}/styles`, {headers: {Authorization: process.env.GIT_TOKEN}})
      .then(({ data }) => {
        var defaultIndex = data.results.findIndex((style) => style['default?'] === true);
        setOriginalPrice(data.results[defaultIndex].original_price);
        setSalePrice(data.results[defaultIndex].sale_price);
        setImageURL(data.results[defaultIndex].photos[0].url);
      })
      .catch((err) => {
        console.log(`Failed to retrieve styles for product ID: ${id}`)
      })
    axios.get(`${process.env.API_URL}/products/${id}`, {headers: {Authorization: process.env.GIT_TOKEN}})
      .then(({ data }) => {
        setName(data.name);
        setCategory(data.category);
      })
      .catch((err) => {
        console.log('Failed to retrieve product information')
      })
    axios.get(`${process.env.API_URL}/reviews/meta/?product_id=${id}`, {headers: {Authorization: process.env.GIT_TOKEN}})
      .then(({ data }) => {
        var r = data.ratings;
        setRating((Number(r[1]) + (Number(r[2]) * 2) + (Number(r[3]) * 3) + (Number(r[4]) * 4) + (Number(r[5]) * 5)) / (Number(r[1]) + Number(r[2]) + Number(r[3]) + Number(r[4]) + Number(r[5])))
      })
  }, []);

  return (
    <div onClick={() => {console.log(`Product ID: ${id} card clicked`)}} className="product-card">
      <div className="image-container"><img src={imageURL}></img></div>
      <h5>{category}</h5>
      <h3>{name}</h3>
      <Price selectedStyle={{original_price: originalPrice, sale_price: salePrice}} />
      <StarRating rating={rating} />
    </div>
  );
};

export default ProductCard;