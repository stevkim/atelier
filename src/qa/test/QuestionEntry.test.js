import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuestionEntry from '../QuestionEntry.jsx';
import { questions } from '../example-data/questionsData.js';

describe('QuestionEntry Component', () => {
  it('Displays a question on initial render', () => {
    render(<QuestionEntry question={questions.results[0]} />);
    const questionElement = screen.getByText(questions.results[0].question_body);

    expect(questionElement).toBeInTheDocument();
  });
});