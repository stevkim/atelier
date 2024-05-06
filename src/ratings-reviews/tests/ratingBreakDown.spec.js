import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RatingBreakdown from '../components/ratings/RatingBreakdown.jsx';
import {
	getTotalReviewCount,
	getAverageRating,
	convertCharacteristics,
} from '../lib/utilityFunctions.js';

const metaData = {
	product_id: '40347',
	rating: {
		1: 6,
		2: 9,
		3: 88,
		4: 24,
		5: 16,
	},
	recommend: {
		false: 16,
		true: 127,
	},
	characteristics: {
		Fit: '3.1590909090909091',
		Length: '3.1590909090909091',
		Comfort: '3.3829787234042553',
		Quality: '3.6086956521739130',
	},
};

describe('Utility Functions', () => {
	test('Correctly converts data to return total review count', () => {
		const mockData1 = { false: 16, true: 127 };
		const mockData2 = { false: 19, true: 200 };
		const mockData3 = { false: 40, true: 1234 };

		expect(getTotalReviewCount(mockData1)).toEqual(143);
		expect(getTotalReviewCount(mockData2)).toEqual(219);
		expect(getTotalReviewCount(mockData3)).toEqual(1274);
	});

	test('Correctly converts data and returns an average rating', () => {
		const mockData1 = {
			1: '6',
			2: '9',
			3: '88',
			4: '24',
			5: '16',
		};
		const mockData2 = {
			1: '10',
			2: '99',
			3: '1000',
			4: '24',
			5: '312',
		};
		const mockTotal1 = 143; //3.24
		const mockTotal2 = 1445; // 3.366
		expect(getAverageRating(mockData1, mockTotal1)).toEqual(3.2);
		expect(getAverageRating(mockData2, mockTotal2)).toEqual(3.4);
	});
});

describe('Rating Breakdown', () => {
	test('Correctly renders RatingBreakdown', async () => {
		const totalReviewCount = getTotalReviewCount(metaData.recommend);
		const averageRating = getAverageRating(metaData.rating, totalReviewCount);
		const propertyList = Object.keys(metaData.characteristics);

		const handleStarFilter = jest.fn();

		const { container } = render(
			await (
				<RatingBreakdown
					data={metaData}
					handleStarFilter={handleStarFilter}
				/>
			)
		);

		expect(await screen.getByText(averageRating)).toBeInTheDocument();

		const ratingList = await screen.getByTestId('rating-list');
		expect(ratingList.childElementCount).toEqual(5);
		[...ratingList.children].forEach((child) => {
			expect(child.classList).toContain('bar-rating');
		});

		propertyList.forEach(async (property) => {
			expect(await screen.getByText(property)).toBeInTheDocument();
		});
	});
});
