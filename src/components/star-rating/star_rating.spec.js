import React from 'react'
import { render, screen } from '@testing-library/react';
import StarRating from './StarRating.jsx';
import '@testing-library/jest-dom'
import { convertRating } from './convertRating.js';

describe('Converting the rating', () => {
  test('Correctly rounds the rating to the nearest quarter', () => {
    const rating_one = 2.3;
    const rating_two = 3.9;
    const rating_three = 4.1;

    expect(convertRating(rating_one)).toEqual(2.25);
    expect(convertRating(rating_two)).toEqual(4);
    expect(convertRating(rating_three)).toEqual(4);
  })
})

describe('Correctly displays the component', () => {
  test('Loads and displays stars correctly', async () => {
    let { container, rerender } = render(<StarRating rating={3.4} />)
    const activeStars = container.querySelector('.active-stars');
    const inactiveStars = container.querySelector('.inactive-stars');

    expect(activeStars.children).toHaveLength(5);
    expect(activeStars.style.width).toEqual('3.5em');
    expect(inactiveStars.children).toHaveLength(5);

    rerender(<StarRating rating={2.3} />);
    expect(activeStars.children).toHaveLength(5);
    expect(activeStars.style.width).toEqual('2.25em');

    rerender(<StarRating rating={1} />);
    expect(activeStars.children).toHaveLength(5);
    expect(activeStars.style.width).toEqual('1em');
  });
})