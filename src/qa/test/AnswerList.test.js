import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnswerList from '../AnswerList.jsx';
import { answers } from '../example-data/answersData.js';

describe('AnswerList Component', () => {
  it('Does not display "Load More Answers" if the total number of answers is less than or equal to 2', () => {
    render(<AnswerList currAnswerList={answers.results.slice(0, 2)} totalAnswers={2} />);

    expect(screen.queryByText(/load more answers/i)).toBeNull();
  });

  it('Displays "Load More Answers" if the total number of answers is greater than 2', () => {
    render(<AnswerList currAnswerList={ answers.results.slice(0, 2) } totalAnswers={3} />);

    const loadMoreAnswersElement = screen.getByText(/load more answers/i);

    expect(loadMoreAnswersElement).toBeInTheDocument();
  });

  it('Displays "Collapse Answers" if the length of the answer list and tota answers are equal to one another', () => {
    render(<AnswerList currAnswerList={ answers.results.slice(0, 3) } totalAnswers={3} />);

    const collapseAnswers = screen.getByText(/collapse Answers/i);

    expect(collapseAnswers).toBeInTheDocument();
  });
});