import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnswerEntry from '../components/AnswerEntry';
import AnswerList from '../components/AnswerList';
import QuestionEntry from '../components/QuestionEntry';
import convertDate from '../convertDate';
import answers from '../../../example-data/answersData';
import questions from '../../../example-data/questionsData';
import axios from 'axios';

jest.mock('axios');

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

describe('AnswerEntry Component', () => {
  it('Displays the answer on initial render', () => {
    render(<AnswerEntry answer={answers.results[0]} />);
    const answerElement = screen.getByText(answers.results[0].body);

    expect(answerElement).toBeInTheDocument();
  });

  it('Displays the answerer on intial render', () => {
    render(<AnswerEntry answer={answers.results[0]} />);
    const answererElement = screen.getByText(answers.results[0].answerer_name);

    expect(answererElement).toBeInTheDocument();
  });

  it('Displays the correct and formatted date on initial render', () => {
    render(<AnswerEntry answer={answers.results[0]} />);
    const dateElement = screen.getByText(/July 6, 2023/i);

    expect(dateElement).toBeInTheDocument();
  });

  it('Displays the helpfulness count on initial render', () => {
    render(<AnswerEntry answer={answers.results[0]} />);
    const helpfulCountElement = screen.getByText(/(13)/i);
    expect(helpfulCountElement).toBeInTheDocument();
  });

  it('Displays "Report" on initial render', () => {
    render(<AnswerEntry answer={answers.results[0]} />);
    const reportElement = screen.getByTitle('Report');

    expect(reportElement).toHaveTextContent('Report');
  });
});

describe('AnswerList Component', () => {
  it('Does not display "Load More Answers" if the total number of answers is less than or equal to 2', () => {
    render(<AnswerList currAnswerList={answers.results.slice(0, 2)} totalAnswers={2} />);

    expect(screen.queryByText(/load more answers/i)).toBeNull();
  });

  it('Displays "Load More Answers" if the total number of answers is greater than 2', () => {
    render(<AnswerList currAnswerList={answers.results.slice(0, 2)} totalAnswers={3} />);

    const loadMoreAnswersElement = screen.getByText(/load more answers/i);

    expect(loadMoreAnswersElement).toBeInTheDocument();
  });

  it('Displays "Collapse Answers" if the length of the answer list and total answers are equal to one another', () => {
    render(<AnswerList currAnswerList={answers.results.slice(0, 3)} totalAnswers={3} />);

    const collapseAnswers = screen.getByText(/collapse Answers/i);

    expect(collapseAnswers).toBeInTheDocument();
  });
});

describe('QuestionEntry Component', () => {
  it('Displays a question on initial render', async () => {
    axios.get.mockResolvedValue({ data: { results: [] } });

    render(<QuestionEntry question={questions.results[0]} />);
    const questionElement = await screen.findByText(questions.results[0].question_body);

    expect(questionElement).toBeInTheDocument();
  });

  it('Displays helpfulness count on initial render', async () => {
    axios.get.mockResolvedValue({ data: { results: [] } });

    render(<QuestionEntry question={questions.results[0]} />);
    const helpfulCountElement = await screen.findByText(/(10)/i);

    expect(helpfulCountElement).toBeInTheDocument();
  });
});
