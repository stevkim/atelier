import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnswerEntry from '../AnswerEntry.jsx';
import AnswerList from '../AnswerList.jsx';
import QuestionEntry from '../QuestionEntry.jsx';
import { convertDate } from '../convertDate.js';
import { answers } from '../example-data/answersData.js';
import { questions } from '../example-data/questionsData';

describe('Convert Date', () => {
  it('Correctly converts date to desired format', () => {
    const date_one = "2023-07-06T00:00:00.000Z"
    const date_two = "2000-11-18T00:00:00.000Z"
    const date_three = "2016-06-25T00:00:00.000Z"

    expect(convertDate(date_one)).toBe('July 6, 2023');
    expect(convertDate(date_two)).toBe('November 18, 2000');
    expect(convertDate(date_three)).toBe('June 25, 2016');
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
  })

  it('Displays the correct and formatted date on initial render', () => {
    render(<AnswerEntry answer={answers.results[0]} />);
    const dateElement = screen.getByText(convertDate(answers.results[0].date));

    expect(dateElement).toBeInTheDocument();
  });

  it('Displays the helpfulness count on initial render', () => {
    render(<AnswerEntry answer={answers.results[0]}/>);
    const helpfulCountElement = screen.getByText(`(${answers.results[0].helpfulness})`);

    expect(helpfulCountElement).toBeInTheDocument();
  });

  it('Displays "Report" on initial render', () => {
    render (<AnswerEntry answer={answers.results[0]} />);
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
    render(<AnswerList currAnswerList={ answers.results.slice(0, 2) } totalAnswers={3} />);

    const loadMoreAnswersElement = screen.getByText(/load more answers/i);

    expect(loadMoreAnswersElement).toBeInTheDocument();
  });

  it('Displays "Collapse Answers" if the length of the answer list and total answers are equal to one another', () => {
    render(<AnswerList currAnswerList={ answers.results.slice(0, 3) } totalAnswers={3} />);

    const collapseAnswers = screen.getByText(/collapse Answers/i);

    expect(collapseAnswers).toBeInTheDocument();
  });
});

describe('QuestionEntry Component', () => {
  it('Displays a question on initial render', () => {
    render(<QuestionEntry question={questions.results[0]} />);
    const questionElement = screen.getByText(questions.results[0].question_body);

    expect(questionElement).toBeInTheDocument();
  });
});