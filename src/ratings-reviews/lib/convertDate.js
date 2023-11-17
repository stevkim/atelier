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