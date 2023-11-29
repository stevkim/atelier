import React from 'react';
import '@testing-library/jest-dom';
import { convertDate, isValidEmail, validateForm } from '../lib/helperFunctions';

describe('Convert Date', () => {
  it('Correctly converts date to desired format', () => {
    const dateOne = '2023-07-06T00:00:00.000Z';
    const dateTwo = '2000-11-18T00:00:00.000Z';
    const dateThree = '2016-06-25T00:00:00.000Z';

    expect(convertDate(dateOne)).toBe('July 6, 2023');
    expect(convertDate(dateTwo)).toBe('November 18, 2000');
    expect(convertDate(dateThree)).toBe('June 25, 2016');
  });
});

describe('Valid Email', () => {
  it('Returns false if email is not formatted correctly', () => {
    const emailOne = 'fish';
    const emailTwo = 'fish@';
    const emailThree = 'email.com';

    expect(isValidEmail(emailOne)).toBe(false);
    expect(isValidEmail(emailTwo)).toBe(false);
    expect(isValidEmail(emailThree)).toBe(false);
  });

  it ('Returns true if email is formatted correctly', () => {
    const emailOne = 'fish@email.com';

    expect(isValidEmail(emailOne)).toBe(true);
  });
});

describe('Validate Form', () => {
  it('Returns an array of error(s) if form\'s value(s) are empty', () => {
    const formOne = { body: '', name: '', email: ''};
    const formTwo = { body: 'is a test', name: '', email: 'jack@'};

    expect(validateForm(formOne)).toEqual(['Please fill out the required (*) fields']);
    expect(validateForm(formTwo)).toEqual(['Please fill out the required (*) fields', 'Please make sure the email is in the correct format']);
  })

  it('Returns an empty array if form\'s values are filled in', () => {
    const formOne = { body: 'this is correct', name: 'fish', email: 'fish@email.com'};

    expect(validateForm(formOne)).toEqual([]);
  })
});
