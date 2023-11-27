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
  '10': 'October',
  '11': 'November',
  '12': 'December'
};

export const convertDate = (date) => {
  const dateToFormat = date.split('T')[0].split('-')
  return `${MONTHS[dateToFormat[1]]} ${dateToFormat[2]}, ${dateToFormat[0]}`;
}