export const getAverageRating = (ratings, totalRatings) => {
  let total = 0;
  for (let keys in ratings) {
    total += JSON.parse(keys) * ratings[keys];
  }
  return parseFloat((total/totalRatings).toFixed(1));
}

export const getAverageRecommended = (data, total) => {
  for (let key in data) {
    if (key === 'true') {
      return Math.round(JSON.parse(data[key]) / total * 100);
    }
  }
}

export const convertCharacterstics = (data) => {
  let characteristics = [];
  for (let keys in data) {
    characteristics.push({
      'id': data[keys].id,
      'characteristic': keys,
      'rating': data[keys].value
    })
  }
  return characteristics;
}