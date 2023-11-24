// take in a rating and convert it to round to the nearest quarter

export const convertRating = (rating) => {
  let interval = .25;
  let remainder = rating % interval;
  if (remainder === 0) {
    return rating;
  }
  let newRating = (interval / 2) > remainder
    ? rating - remainder
    : rating + (interval - remainder);
  return newRating;
}