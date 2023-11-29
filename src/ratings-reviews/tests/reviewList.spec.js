import React from 'react'
import { render, screen, cleanup, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReviewList from '../components/ReviewsList.jsx';
import ReviewItem from '../components/ReviewItem.jsx';
import { convertDate } from '../lib/utilityFunctions.js';

const reviews = {
  "product": "40347",
  "page": 0,
  "count": 5,
  "results": [
      {
          "review_id": 1277643,
          "rating": 3,
          "summary": "dsgsd",
          "recommend": true,
          "response": null,
          "body": "ds",
          "date": "2022-12-03T00:00:00.000Z",
          "reviewer_name": "test",
          "helpfulness": 3,
          "photos": []
      },
      {
          "review_id": 1277600,
          "rating": 3,
          "summary": "dsgsd",
          "recommend": true,
          "response": 'Testing',
          "body": "dsfgsdfg",
          "date": "2022-12-02T00:00:00.000Z",
          "reviewer_name": "test",
          "helpfulness": 1,
          "photos": []
      },
      {
          "review_id": 1277838,
          "rating": 4,
          "summary": "asddd",
          "recommend": false,
          "response": null,
          "body": "asdasdasdasdasdasdasdasdasdadsasdasdasdasdadsasdasd",
          "date": "2022-12-12T00:00:00.000Z",
          "reviewer_name": "asd",
          "helpfulness": 0,
          "photos": []
      },
      {
          "review_id": 1277836,
          "rating": 3,
          "summary": "asdd",
          "recommend": false,
          "response": null,
          "body": "asdasdadasdasdadasdasdasdasdasdasdasdasdasdasdasdadasdadasdasdadasdasdasdasdasdasdasdasdaasdasdadasdasdadasdasdasdasdasdasdasdasdasdasdasdadaasdasdadasdasdadasdasdasdasdasdasdasdasdasdasdasdadasdadasdasdadasdasdasdasdasdasdasdasdaasdasdadasdasdadasdasdasdasdasdasdasdasdasdasdasdadasdadasdasdadasdasdasdasdasdasdasdasdasdadasdasdadasdasdasdasdasdasdasdasda",
          "date": "2022-12-12T00:00:00.000Z",
          "reviewer_name": "asd",
          "helpfulness": 0,
          "photos": []
      },
      {
          "review_id": 1280449,
          "rating": 5,
          "summary": "I love it",
          "recommend": false,
          "response": null,
          "body": "Nothing beats it!",
          "date": "2023-08-22T00:00:00.000Z",
          "reviewer_name": "John",
          "helpfulness": 0,
          "photos": [{id: 1, url:'test'}, {id: 2, url: 'it has a fallback'}]
      }
  ]
};

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
  test('Correctly displays review information', async () => {
    for (let i = 0; i < reviews.count; i++) {
      const currentReview = reviews.results[i];
      const { reviewer_name, rating, email, date, summary, response,
        body, photos, recommend, helpfulness, review_id, } = currentReview;
      render(await <ReviewItem review={currentReview} />);

      expect(await screen.findByText(reviewer_name)).toBeInTheDocument();
      expect(await screen.findByText(summary)).toBeInTheDocument();

      if (body.length < 250) {
        expect(await screen.findByText(body)).toBeInTheDocument();
      } else {
        const button = await screen.findByText('Show more');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(await screen.findByText(body)).toBeInTheDocument();
      };

      if (photos.length > 0) {
        photos.forEach(async (photo) => {
          expect(await screen.findByLabelText(photo.id)).toBeInTheDocument();
        })
      }

      recommend && expect(await screen.findByText('I recommend this product')).toBeInTheDocument();

      response && expect(await screen.findByText(response)).toBeInTheDocument();

      const helpful = await screen.findByTestId('helpful');
      expect(helpful).toBeInTheDocument();
      expect(await screen.findByText((content) => {
        return content.includes(`(${helpfulness})`);
      })).toBeInTheDocument();

      expect(await screen.findByText('Yes')).toBeInTheDocument();
      expect(await screen.findByText('Report')).toBeInTheDocument();

      cleanup();
    };
  });
})

describe('List of reviews', () => {
  afterEach(() => {
    cleanup();
  })

  test('Displays the correct number of reviews', async () => {
    const { rerender } = render(await <ReviewList reviewList={reviews.results} />);
    const list = await screen.findByTestId('review-list');
    expect(list.childElementCount).toEqual(reviews.results.length);

    rerender(await <ReviewList reviewList={[]} />);
    expect(await screen.findByText('Whoops there are no reviews here!')).toBeInTheDocument();
  });

  test('Correctly functions based on user interaction', async () => {
    const increment = jest.fn();
    const sort = jest.fn();
    const total = 10;
    const { rerender } = render(await <ReviewList totalReviews={total} setSort={sort} reviewList={reviews.results} handleListIncrement={increment} disable={true} />);

    const header = `${total} reviews, sorted by`;
    expect(await screen.findByText(header)).toBeInTheDocument();

    const options = await screen.findByLabelText('review-sort');
    expect(options.childElementCount).toEqual(3);

    fireEvent.change(options, { target: { value: 'Test' }});
    expect(sort).toHaveBeenCalled();

    const searchInput = await screen.findByPlaceholderText('Search reviews');
    fireEvent.change(searchInput, { target: { value: 'Test' }});
    expect(searchInput.value).toEqual('Test');

    const reviewList = await screen.getByTestId('review-list');
    expect(reviewList.childElementCount).toEqual(reviews.results.length);

    fireEvent.scroll(reviewList, { target: { scrollY: 1000 } });
    expect(increment).toHaveBeenCalledTimes(0);

    rerender(await <ReviewList reviewList={reviews.results} handleListIncrement={increment} disable={false} />);
    fireEvent.scroll(reviewList, { target: { scrollY: 1000 } });
    expect(increment).toHaveBeenCalled();

    expect(await screen.findByText('ADD A REVIEW')).toBeInTheDocument();
  })
})