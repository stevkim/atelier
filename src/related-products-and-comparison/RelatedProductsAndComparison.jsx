import React, { useState, useEffect, useCallback } from 'react';
import { getProduct, getRelatedProducts } from './lib/fetchFunctions.js';
import { getProductsStyles, getRatings, getOutfitFromCookie } from './lib/utilityFunctions.js';
import ProductList from './components/ProductList.jsx';
import './styles/relatedProductsAndComparisonStyles.css';
import ModalOverlay from '../ratings-reviews/utils/ModalOverlay.jsx';
import Comparison from './components/Comparison.jsx';

const RelatedProductsAndComparison = ({ currentProduct, setCurrentProduct, currentProductInfo }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedProductDefaultStyles, setRelatedProductDefaultStyles] = useState([]);
  const [relatedProductRatings, setRelatedProductRatings] = useState([]);
  const [outfitProductIds, setOutfitProductIds] = useState([]);
  const [outfitProducts, setOutfitProducts] = useState([{ id: -1 }]);
  const [outfitDefaultStyles, setOutfitDefaultStyles] = useState([]);
  const [outfitRatings, setOutfitRatings] = useState([]);
  const [modal, setModal] = useState(false);
  const [relatedProduct, setRelatedProduct] = useState({});

  useEffect(() => {
    const getRelatedProductData = async () => {
      const relatedProductsIds = await getRelatedProducts(currentProduct);
      const uniqueRelatedProductIds = relatedProductsIds.data.filter((value, index, array) => array.indexOf(value) === index);
      const uniqueRelatedProducts = await Promise.all(uniqueRelatedProductIds.map((id) => getProduct(id)));
      const defaultStyles = await getProductsStyles(uniqueRelatedProductIds);
      const ratings = await getRatings(uniqueRelatedProductIds);
      setRelatedProducts(uniqueRelatedProducts.map((uniqueRelatedProduct) => uniqueRelatedProduct.data));
      setRelatedProductDefaultStyles(defaultStyles);
      setRelatedProductRatings(ratings);
    };
    getRelatedProductData();
  }, [currentProduct]);

  useEffect(() => {
    const outfitFromCookie = getOutfitFromCookie();
    const getOutfitData = async () => {
      const outfitProductsData = await Promise.all(outfitFromCookie.map((id) => getProduct(id)));
      const defaultStyles = await getProductsStyles(outfitFromCookie);
      const ratings = await getRatings(outfitFromCookie);
      setOutfitProductIds([-1].concat(outfitFromCookie));
      setOutfitProducts([{ id: -1 }].concat(outfitProductsData.map((uniqueRelatedProduct) => uniqueRelatedProduct.data)));
      setOutfitDefaultStyles([null].concat(defaultStyles));
      setOutfitRatings([null].concat(ratings));
    };
    getOutfitData();
  }, []);

  const productCardClickHandler = useCallback((id) => {
    setCurrentProduct(id);
  }, []);

  const relatedActionButtonClickHandler = useCallback((product) => {
    setRelatedProduct(product);
    setModal(true);
  }, []);

  const addToOutfitHandler = useCallback(async () => {
    if (outfitProductIds.includes(currentProduct)) {
      console.log(`Product ID: ${currentProduct} already in Your Outfit`);
    } else {
      const [defaultStyle] = await getProductsStyles([currentProduct]);
      const [rating] = await getRatings([currentProduct]);
      const outfitString = JSON.stringify([currentProduct].concat(outfitProductIds.slice(1)));
      document.cookie = `outfit=${outfitString}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
      setOutfitProductIds([-1, currentProduct].concat(outfitProductIds.slice(1)));
      setOutfitProducts([{ id: -1 }, currentProductInfo].concat(outfitProducts.slice(1)));
      setOutfitDefaultStyles([null, defaultStyle].concat(outfitDefaultStyles.slice(1)));
      setOutfitRatings([null, rating].concat(outfitRatings.slice(1)));
    }
  }, [currentProduct, currentProductInfo, outfitDefaultStyles, outfitRatings, outfitProductIds, outfitProducts]);

  const removeFromOutfitHandler = useCallback((product) => {
    const indexToRemove = outfitProductIds.findIndex((productId) => productId === product.id);
    const outfitString = JSON.stringify(outfitProductIds.filter((val, index) => index !== indexToRemove).slice(1));
    document.cookie = `outfit=${outfitString}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    setOutfitProductIds(outfitProductIds.filter((val, index) => index !== indexToRemove));
    setOutfitProducts(outfitProducts.filter((val, index) => index !== indexToRemove));
    setOutfitDefaultStyles(outfitDefaultStyles.filter((val, index) => index !== indexToRemove));
    setOutfitRatings(outfitRatings.filter((val, index) => index !== indexToRemove));
  }, [currentProduct, currentProductInfo, outfitProductIds, outfitProducts, outfitDefaultStyles, outfitRatings]);

  return (
    <div id='related-products' className='related-products-and-comparison'>
      <h2>RELATED PRODUCTS</h2>
      <ProductList
        products={relatedProducts}
        defaultStyles={relatedProductDefaultStyles}
        ratings={relatedProductRatings}
        productCardClick={productCardClickHandler}
        isYourOutfit={false}
        actionButtonClick={relatedActionButtonClickHandler}
      />
      <h2>YOUR OUTFIT</h2>
      <ProductList
        products={outfitProducts}
        defaultStyles={outfitDefaultStyles}
        ratings={outfitRatings}
        productCardClick={productCardClickHandler}
        isYourOutfit
        addToOutfit={addToOutfitHandler}
        actionButtonClick={removeFromOutfitHandler}
      />
      {modal
        && (
        <ModalOverlay>
          <Comparison currentProduct={currentProductInfo} relatedProduct={relatedProduct} setModal={setModal} />
        </ModalOverlay>
        )}
    </div>
  );
};

export default RelatedProductsAndComparison;
