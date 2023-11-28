const convertDate = (date) => {
  const newDate = new Date(date);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  };
  return newDate.toLocaleDateString('en-US', options);
};

export default convertDate;
