// take in a rating and convert it to round to the nearest quarter

export const convertRating = (rating) => {
  let interval = .25;
  let remainder = rating % interval;
  let newRating = (interval / 2) > remainder
    ? rating - remainder
    : rating + (interval - remainder);
  return newRating;
}