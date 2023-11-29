export const getAverageRating = (ratings, totalRatings) => {
  if (!ratings || !totalRatings) return 0;
  let total = 0;
  const convertedRatings = Object.entries(ratings);
  convertedRatings.forEach((rating) => {
    total += JSON.parse(rating[0]) * rating[1];
  });
  return parseFloat((total / totalRatings).toFixed(1));
};

export const getAverageRecommended = (data, total) => {
  if (!data || !total) return 100;
  return Math.round(JSON.parse((data.true) / total) * 100);
};

export const convertCharacteristics = (data) => {
  if (!data) return [];
  const convertedData = Object.entries(data);
  return convertedData.map((characteristic) => ({
    characteristic: characteristic[0],
    id: characteristic[1].id,
    rating: characteristic[1].value,
  }));
};

const MONTHS = {
  '01': 'January',
  '02': 'Feburary',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

export const convertDate = (date) => {
  const dateToFormat = date.split('T')[0].split('-');
  return `${MONTHS[dateToFormat[1]]} ${dateToFormat[2]}, ${dateToFormat[0]}`;
};

export const getTotalReviewCount = (data) => {
  if (!data) return 0;
  return JSON.parse(data.false) + JSON.parse(data.true);
};
