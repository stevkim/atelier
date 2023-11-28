import React, { useState, useEffect } from 'react';
import { getRelatedProducts } from './lib/fetchFunctions.js';
import ProductList from './ProductList.jsx';
import './styles/relatedProductsAndComparisonStyles.css';
import ModalOverlay from '../../ratings-reviews/utils/ModalOverlay.jsx';
import Comparison from './Comparison.jsx';

const RelatedProductsAndComparison = ({ currentProduct, setCurrentProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [outfitProducts, setOutfitProducts] = useState([-1]);
  const [modal, setModal] = useState(false);
  const [relatedProduct, setRelatedProduct] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const relatedProductsIds = await getRelatedProducts(currentProduct);
      const uniqueRelatedProducts = relatedProductsIds.data.filter((value, index, array) => array.indexOf(value) === index);
      setRelatedProducts(uniqueRelatedProducts);
    };
    getData();
  }, [currentProduct]);

  const productCardClickHandler = (id) => {
    setCurrentProduct(id);
  };

  const relatedActionButtonClickHandler = (id) => {
    setRelatedProduct(id);
    setModal(true);
  };

  const addToOutfitHandler = () => {
    if (outfitProducts.includes(currentProduct)) {
      console.log(`Product ID: ${currentProduct} already in Your Outfit`);
    } else {
      setOutfitProducts([-1, currentProduct].concat(outfitProducts.slice(1)));
    }
  };

  const removeFromOutfitHandler = (id) => {
    setOutfitProducts(outfitProducts.filter((productId) => productId !== id));
  };

  return (
    <div>
      <h2>RELATED PRODUCTS</h2>
      <ProductList
        products={relatedProducts}
        productCardClick={productCardClickHandler}
        isYourOutfit={false}
        actionButtonClick={relatedActionButtonClickHandler}
      />
      <h2>YOUR OUTFIT</h2>
      <ProductList
        products={outfitProducts}
        productCardClick={productCardClickHandler}
        isYourOutfit
        addToOutfit={addToOutfitHandler}
        actionButtonClick={removeFromOutfitHandler}
      />
      {modal
        && (
        <ModalOverlay>
          <Comparison currentProduct={currentProduct} relatedProduct={relatedProduct} setModal={setModal} />
        </ModalOverlay>
        )}
    </div>
  );
};

export default RelatedProductsAndComparison;
