// take in a rating and convert it to round to the nearest quarter
const convertRating = (rating) => {
  const interval = 0.25;
  const remainder = rating % interval;
  if (remainder === 0) {
    return rating;
  }
  const newRating = (interval / 2) > remainder
    ? rating - remainder
    : rating + (interval - remainder);
  return newRating;
};

export default convertRating;
