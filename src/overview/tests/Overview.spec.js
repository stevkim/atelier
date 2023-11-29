import React from 'react'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Info from '../info/Info.jsx';
import Reviews from '../info/Reviews.jsx';
import StylesView from '../info/StylesView.jsx';
import getProductStyles from '../helper-funcs/axios-requests.js';
import countStarsAndReviews from '../info/helper-funcs/countReviews.js'

const productId = 40347;
const reviewsMetaData = {
  '1': 2,
  '2': 3,
  '3': 4,
  '4': 5,
  '5': 6,
};
const productInfo = {
  product_id: 1,
  name: 'test title',
  category: 'test category',
  slogan: 'is a test!',
  description: 'This test is the testiest test of all time.',
  features: [
    {
      feature: 'testability',
      value: 'high',
    },
    {
      feature: 'nontestability',
      value: 'low',
    },
  ],
};
const styleInfo = [
  {
    style_id: 1,
    name: 'test style',
    original_price: 12,
    sale_price: 7,
    default: true,
    photos: [
      {
        thumbnail_url: 'https://i.imgur.com/lQU6jgl.jpeg',
        url: 'https://i.imgur.com/lQU6jgl.jpeg',
      },
    ],
    skus: { // WHY would we do it this way? This should be an array!
      37: {
        quantity: 0,
        size: 'XS',
      },
      39: {
        quantity: 9001,
        size: 'M',
      },
      41: {
        quantity: 3,
        size: 'XL',
      },
    },
  },
  {
    style_id: 2,
    name: 'test style 2: electric boogaloo',
    original_price: 8,
    sale_price: 0,
    default: false,
    photos: [
      {
        thumbnail_url: 'https://i.imgur.com/lQU6jgl.jpeg',
        url: 'https://i.imgur.com/lQU6jgl.jpeg',
      },
    ],
    skus: {
      38: {
        quantity: 1,
        size: 'S',
      },
      39: {
        quantity: 0,
        size: 'M',
      },
      40: {
        quantity: 2,
        size: 'L',
      },
    },
  },
]

describe('Info', () => {
  test('Is Rendered', async () => {
    render(<Info productInfo={productInfo} reviewsMetaData={reviewsMetaData} styleInfo={styleInfo} style={0} selectedStyle={styleInfo[0]} updateStyle={() => {}} />);
    const imageMain = await screen.findByLabelText('info');
    expect(imageMain).toBeInTheDocument();
  });

  test('Renders the Share Buttons', async () => {
    render(<Info productInfo={productInfo} reviewsMetaData={reviewsMetaData} styleInfo={styleInfo} style={0} selectedStyle={styleInfo[0]} updateStyle={() => {}} />);
    const shareButtons = await screen.findByLabelText('shareButtons');
    expect(shareButtons).toBeInTheDocument();
  });

  test('Renders the Title', async() => {
    render(<Info productInfo={productInfo} reviewsMetaData={reviewsMetaData} styleInfo={styleInfo} style={0} selectedStyle={styleInfo[0]} updateStyle={() => {}} />);
    const title = await screen.findByLabelText('title');
    expect(title).toBeInTheDocument();
  })

  test('Renders the Category', async() => {
    render(<Info productInfo={productInfo} reviewsMetaData={reviewsMetaData} styleInfo={styleInfo} style={0} selectedStyle={styleInfo[0]} updateStyle={() => {}} />);
    const category = await screen.findByLabelText('category');
    expect(category).toBeInTheDocument();
  })
});

describe('Reviews', () => {
  test('Is Rendered', async () => {
    render(<Reviews reviewsMetaData={reviewsMetaData} />);
    const reviews = await screen.findByLabelText('reviews');
    expect(reviews).toBeInTheDocument();
  });

  test('Reviews counted correctly', () => {
    expect(countStarsAndReviews(reviewsMetaData).reviews).toEqual(20);
  });

  test('Stars counted correctly', () => {
    expect(countStarsAndReviews(reviewsMetaData).stars).toEqual(70);
  })
});

describe('Styles View', () => {
  test('Is Rendered', async () => {
    render(< StylesView styleIndex={0} styleInfo={styleInfo} updateStyle={() => {}}/>);
    const stylesView = await screen.findByLabelText('stylesView');
    expect(stylesView).toBeInTheDocument();
  })
});