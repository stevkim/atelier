import React from 'react'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { reviews } from '../../../example-data/reviewData.js';
import ReviewList from '../components/ReviewsList.jsx';
import ReviewItem from '../components/ReviewItem.jsx';
import { convertDate } from '../lib/utilityFunctions.js';

describe('Convert Date', () => {
  test('Correctly converts date to the intended format', () => {
    const date_one = "2022-07-18T00:00:00.000Z";
    const date_two = "2018-01-22T00:00:00.000Z";
    const date_three = "2021-12-30T00:00:00.000Z";

    expect(convertDate(date_one)).toEqual('July 18, 2022');
    expect(convertDate(date_two)).toEqual('January 22, 2018');
    expect(convertDate(date_three)).toEqual('December 30, 2021');
  });
});

describe('Review Item', () => {
    for (let i = 0; i < reviews.count; i++) {
      test('Correctly displays username and date', () => {
        const currentReview = reviews.results[i]
        const { container } = render(<ReviewItem review={currentReview} />);
        const reviewDate = convertDate(currentReview.date);
        const text = `${currentReview.reviewer_name}`;
        const header = container.querySelector('.review-header');

        expect(header.innerHTML).toContain(text);
      });

      test('Correctly displays helpfulness', () => {
        const currentReview = reviews.results[i]
        const { container } = render(<ReviewItem review={currentReview} />);
        const helpful = container.querySelector('.helpfulness-wrapper');
        const helpfulRating = currentReview.helpfulness.toString();

        expect(helpful.innerHTML).toContain(helpfulRating);
      })
    };
})

describe('List of reviews', () => {
  test('Displays the correct number of reviews', async() => {
    const { container } = render(await <ReviewList reviewList={reviews.results} showButton={true}/>);

    const list = await screen.getByTestId('review-list');
    expect(list.children.length).toEqual(reviews.results.length);

    for (let i = 0; i < list.children.length - 1; i++) {
      expect([...list.children[i].classList]).toContain('review-wrapper');
    };

    expect(await screen.getByText('ADD A REVIEW')).toBeInTheDocument();
  })
})