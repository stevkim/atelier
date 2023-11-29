import { getProductStyles, getReviewsMetaData } from './fetchFunctions.js';

export const getProductsStyles = async (productIds) => {
  const styles = await Promise.all(productIds.map((id) => getProductStyles(id)));
  const defaultStyles = styles.map((stylesData) => {
    let defaultIndex = stylesData.data.results.findIndex((style) => style['default?'] === true);
    if (defaultIndex === -1) {
      defaultIndex = 0;
    }
    return stylesData.data.results[defaultIndex];
  });
  return defaultStyles;
};

export const getRatings = async (productIds) => {
  const ratingsData = await Promise.all(productIds.map((id) => getReviewsMetaData(id)));
  const ratings = ratingsData.map((ratingData) => {
    const r = ratingData.data.ratings;
    return (
      (Number(r[1])
      + (Number(r[2]) * 2)
      + (Number(r[3]) * 3)
      + (Number(r[4]) * 4)
      + (Number(r[5]) * 5))
      / (Number(r[1]) + Number(r[2]) + Number(r[3]) + Number(r[4]) + Number(r[5]))
    );
  });
  return ratings;
};

const parseFeature = (feature) => {
  if (feature.value === null) {
    return feature.feature;
  }
  return `${feature.value} ${feature.feature}`;
};

export const compareFeatures = (featuresA, featuresB) => {
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

export const getOutfitFromCookie = () => {
  const outfitCookie = document.cookie.replace(/(?:(?:^|.*;\s*)outfit\s*=\s*([^;]*).*$)|^.*$/, '$1');
  return outfitCookie ? JSON.parse(outfitCookie) : [];
};
