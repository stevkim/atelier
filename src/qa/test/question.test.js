import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import questions from '../../../example-data/questionsData';
import QuestionEntry from '../components/QuestionEntry';
import QuestionsAndAnswers from '../QuestionsAndAnswers';
import axios from 'axios';

jest.mock('axios');

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

  it('Displays "Add Answer" on initial render', async () => {
    axios.get.mockResolvedValue({ data: { results: [] } });
    await act(async () => {
      render( <QuestionEntry question={questions.results[0]} />);
    });
    const addAnswerElement = screen.getByRole('button', { name: 'Add Answer' });

    expect(addAnswerElement).toBeInTheDocument();
  });

  it('Displays the form to add an answer when clicking "Add Answer"', async () => {
    axios.get.mockResolvedValue({ data: { results: [] } });
    await act(async () => {
      render(<QuestionEntry question={questions.results[0]} />);
    });

    const addAnswerElement = screen.getByRole('button', { name: 'Add Answer'});
    fireEvent.click(addAnswerElement);
    const modalForm = screen.getByTitle('answerForm');

    expect(modalForm).toBeInTheDocument();
  });

  it('Increment the helpful count upon clicking "Yes"', async () => {
    axios.get.mockResolvedValue({ data: { results: [] } });
    axios.put.mockResolvedValue({});

    render(<QuestionEntry question={questions.results[0]} />);
    const helpfulCount = await screen.findByText(/(10)/i);
    const yesElement = screen.getByTitle('IsQuestionHelpful');

    await act (async () => {
      fireEvent.click(yesElement);
    });

    expect(helpfulCount).toHaveTextContent(/(11)/i);
  });
});

describe('QuestionAndAnswers Component', () => {
  it('Displays Search bar on initial render', async () => {
    await act (async () => {
      render(<QuestionsAndAnswers />);
    });

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('Displays "Add A Question" button on intial render', async () => {
    await act (async () => {
      render(<QuestionsAndAnswers />);
    });

    expect(screen.getByRole('button', { name: 'Add A Question' })).toBeInTheDocument();
  });

  it('Displays the form to add a question upon clicking "Add A Question"', async () => {
    await act (async () => {
      render(<QuestionsAndAnswers />);
    });
    const addQuestionButton = screen.getByRole('button', { name: 'Add A Question'});

    fireEvent.click(addQuestionButton);

    expect(screen.getByTitle('questionForm')).toBeInTheDocument();
  });
});
