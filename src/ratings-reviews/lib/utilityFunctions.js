export const getAverageRating = (ratings, totalRatings) => {
  if (!ratings || !totalRatings) return 0;
  let total = 0;
  const listOfRatings = Object.entries(ratings);
  listOfRatings.forEach((entry) => {
    total += parseInt(entry[0], 10) * entry[1];
  });
  return parseFloat((total / totalRatings).toFixed(1));
};

export const getAverageRecommended = (data, total) => {
  if (!data || !total) return 100;
  return Math.round(JSON.parse((data.true) / total) * 100);
};

export const convertCharacteristics = (data) => {
  if (!data) return [];
  const convertedData = Object.entries(data).filter((entry) => entry[1] !== null);
  return convertedData.map((characteristic) => ({
    characteristic: characteristic[0],
    rating: characteristic[1],
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

export const convertDate = (data) => {
  const date = new Date(data).toISOString();
  const dateToFormat = date.split('T')[0].split('-');
  return `${MONTHS[dateToFormat[1]]} ${dateToFormat[2]}, ${dateToFormat[0]}`;
};

export const getTotalReviewCount = (data) => {
  if (!data) return 0;
  return data.false + data.true;
};
