export const convertDate = (date) => {
  const newDate = new Date(date);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  };
  return newDate.toLocaleDateString('en-US', options);
};

export const isValidEmail = (email) => {
  if (email.indexOf('@') === -1) {
    return false;
  }

  const fromIndex = email.indexOf('@') + 1;
  if (email.indexOf('.', fromIndex) === -1) {
    return false;
  }
  return true;
};

export const validateForm = (form) => {
  const errors = [];
  if (!form.body || !form.name || !form.email) {
    errors.push('Please fill out the required (*) fields');
  }
  if (form.email && isValidEmail(form.email) === false) {
    errors.push('Please make sure the email is in the correct format');
  }
  return errors;
};
