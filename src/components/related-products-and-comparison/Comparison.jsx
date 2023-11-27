import React, { useState, useEffect } from 'react';
import { getProduct } from './lib/fetchFunctions.js';
import './styles/comparisonStyles.css';

const Comparison = ({ currentProduct, relatedProduct, setModal }) => {
  const [currentProductFeatures, setCurrentProductFeatures] = useState([]);
  const [relatedProductFeatures, setRelatedProductFeatures] = useState([]);
  const [currentProductName, setCurrentProductName] = useState('');
  const [relatedProductName, setRelatedProductName] = useState('');

  useEffect(() => {
    const getData = async() => {
      const [currentProductData, relatedProductData] = await Promise.all([getProduct(currentProduct), getProduct(relatedProduct)]);
      setCurrentProductName(currentProductData.data.name);
      setCurrentProductFeatures(currentProductData.data.features);
      setRelatedProductName(relatedProductData.data.name);
      setRelatedProductFeatures(relatedProductData.data.features);
    }
    getData();
  }, []);

  const compareFeatures = (featuresA, featuresB) => {
    var comparedFeatures = [];
    var parsedFeaturesA = featuresA.map((feature) => parseFeature(feature));
    var parsedFeaturesB = featuresB.map((feature) => parseFeature(feature));
    var uniqueParsedFeaturesA = parsedFeaturesA.filter((value, index, array) => array.indexOf(value) === index);
    var uniqueParsedFeaturesB = parsedFeaturesB.filter((value, index, array) => array.indexOf(value) === index);
    for (var i = 0; i < uniqueParsedFeaturesA.length; i++) {
      var indexB = uniqueParsedFeaturesB.indexOf(uniqueParsedFeaturesA[i]);
      if ( indexB === -1) {
        comparedFeatures.push([true, uniqueParsedFeaturesA[i], false]);
      } else {
        comparedFeatures.push([true, uniqueParsedFeaturesA[i], true]);
        uniqueParsedFeaturesB.splice(indexB, 1);
      }
    }

    for (var j = 0; j < uniqueParsedFeaturesB.length; j++) {
      comparedFeatures.push([false, uniqueParsedFeaturesB[j], true]);
    }

    return comparedFeatures;
  };

  const parseFeature = (feature) => {
    if (feature.value === null) {
      return feature.feature;
    } else {
      return `${feature.value} ${feature.feature}`;
    }
  };

  return (
    <div className="comparison-container" onClick={() => {setModal(false)}} >
      <div className="close-button" >❌</div>
      <h5>Comparing</h5>
      <table>
        <thead>
          <tr>
            <th className="left-header" colSpan="2">{currentProductName}</th>
            <th className="right-header" colSpan="2">{relatedProductName}</th>
          </tr>
        </thead>
        <tbody>
          {compareFeatures(currentProductFeatures, relatedProductFeatures).map((feature, index) => {
            return (
              <tr key={index}>
                <td className="value" >{feature[0] === true ? '✔' : ''}</td>
                <td className="feature" colSpan="2">{feature[1]}</td>
                <td className="value" >{feature[2] === true ? '✔' : ''}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Comparison;