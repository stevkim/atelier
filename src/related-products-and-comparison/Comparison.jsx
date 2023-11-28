import React, { useState, useEffect } from 'react';
import { getProduct } from './lib/fetchFunctions.js';
import './styles/comparisonStyles.css';

const Comparison = ({ currentProduct, relatedProduct, setModal }) => {
  const [relatedProductFeatures, setRelatedProductFeatures] = useState([]);
  const [relatedProductName, setRelatedProductName] = useState('');

  useEffect(() => {
    const getData = async () => {
      const relatedProductData = await getProduct(relatedProduct);
      setRelatedProductName(relatedProductData.data.name);
      setRelatedProductFeatures(relatedProductData.data.features);
    };
    getData();
  }, []);

  const parseFeature = (feature) => {
    if (feature.value === null) {
      return feature.feature;
    }
    return `${feature.value} ${feature.feature}`;
  };

  const compareFeatures = (featuresA, featuresB) => {
    const comparedFeatures = [];
    const parsedFeaturesA = featuresA.map((feature) => parseFeature(feature));
    const parsedFeaturesB = featuresB.map((feature) => parseFeature(feature));
    const uniqueParsedFeaturesA = parsedFeaturesA.filter((value, index, array) => array.indexOf(value) === index);
    const uniqueParsedFeaturesB = parsedFeaturesB.filter((value, index, array) => array.indexOf(value) === index);
    for (let i = 0; i < uniqueParsedFeaturesA.length; i++) {
      const indexB = uniqueParsedFeaturesB.indexOf(uniqueParsedFeaturesA[i]);
      if (indexB === -1) {
        comparedFeatures.push([true, uniqueParsedFeaturesA[i], false]);
      } else {
        comparedFeatures.push([true, uniqueParsedFeaturesA[i], true]);
        uniqueParsedFeaturesB.splice(indexB, 1);
      }
    }

    for (let j = 0; j < uniqueParsedFeaturesB.length; j++) {
      comparedFeatures.push([false, uniqueParsedFeaturesB[j], true]);
    }

    return comparedFeatures;
  };

  return (
    <div className='comparison-container' onClick={() => { setModal(false); }}>
      <div className='close-button'>❌</div>
      <h5>Comparing</h5>
      <table>
        <thead>
          <tr>
            <th className='left-header' colSpan='2'>{currentProduct.name}</th>
            <th className='right-header' colSpan='2'>{relatedProductName}</th>
          </tr>
        </thead>
        <tbody>
          {compareFeatures(currentProduct.features, relatedProductFeatures).map((feature, index) => (
            <tr key={index}>
              <td className='value'>{feature[0] === true ? '✔' : ''}</td>
              <td className='feature' colSpan='2'>{feature[1]}</td>
              <td className='value'>{feature[2] === true ? '✔' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Comparison;
