import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import answers from '../../../example-data/answersData';
import AnswerEntry from '../components/AnswerEntry';
import AnswerList from '../components/AnswerList';
import axios from 'axios';

jest.mock('axios');

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
    const reportElement = screen.getByTitle('reportAnswer');

    expect(reportElement).toHaveTextContent('Report');
  });

  it('Increases helpful count upon clicking "Yes"', async () => {
    axios.put.mockResolvedValue({});
    render(<AnswerEntry answer={answers.results[0]} />);

    const helpfulCount = screen.getByText(/(13)/i);
    const yesElement = screen.getByTitle('helpfulAnswer');

    await act (async () => {
      fireEvent.click(yesElement);
    });

    expect(helpfulCount).toHaveTextContent(/(14)/i);
  });

  it('Changes "Report" to Reported upon clicking "Report"', async () => {
    axios.put.mockResolvedValue({});
    render(<AnswerEntry answer={answers.results[0]} />);
    const reportElement = screen.getByTitle('reportAnswer');

    await act (async () => {
      fireEvent.click(reportElement);
    });

    expect(reportElement).toHaveTextContent('Report');
  })
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
