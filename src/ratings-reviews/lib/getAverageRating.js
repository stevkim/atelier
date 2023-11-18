// ratings is an object
export const getAverageRating = (ratings, totalRatings) => {
  let total = 0;
  for (let keys in ratings) {
    total += JSON.parse(keys) * ratings[keys];
  }
  return parseFloat((total/totalRatings).toFixed(1));
}