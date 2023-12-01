import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddAnswerForm from '../components/AddAnswerForm';
import AddQuestionForm from '../components/AddQuestionForm';
import axios from 'axios';

jest.mock('axios');

describe('AddAnswerForm component', () => {

  it('Displays the Nickname label and the placeholder within the input', () => {
    render(<AddAnswerForm />);

    expect(screen.getByText('Nickname')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Example: jack543!')).toBeInTheDocument();
  });

  it('Displays the Email label and the placeholder within the input', () => {
    render(<AddAnswerForm />);

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Example: jack@email.com')).toBeInTheDocument();
  });

  it('Displays the Answer label and its input', () => {
    render(<AddAnswerForm />);

    expect(screen.getByTestId('qa-answer-label')).toBeInTheDocument();
  });

  it('Displays the X button to close the modal', () => {
    render(<AddAnswerForm />);
    const cancelButton = screen.getByTestId('close-modal');

    expect(cancelButton).toBeInTheDocument();
  });

  it('Displays the Submit button', () => {
    render(<AddAnswerForm />);
    const submitButton = screen.getByRole('button', { name: 'SUBMIT'});

    expect(submitButton).toBeInTheDocument();
  });

  it('Displays a list of error message(s) if submitting with empty fields or invalid email', () => {
    const mockSetIsModalOpen = jest.fn();
    axios.post.mockResolvedValue({});

    render(<AddAnswerForm setIsModalOpen={mockSetIsModalOpen} />);
    const submitButton = screen.getByRole('button', { name: 'SUBMIT'});
    fireEvent.click(submitButton);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});

describe('AddQuestionForm Component', () => {
  it('Displays the Nickname and label and the placeholder within the input', () => {
    render(<AddQuestionForm />);

    expect(screen.getByText('Nickname')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Example: jackson11!')).toBeInTheDocument();
  })

  it('Displays the Email label and the placeholder within the input', () => {
    render(<AddQuestionForm />);

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Example: jack@email.com')).toBeInTheDocument();
  });

  it('Displays the Question label and the placeholder within the input', () => {
    render(<AddQuestionForm />);

    expect(screen.getByText('Question')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ask your question')).toBeInTheDocument();
  });

  it('Displays the X button to close the modal', () => {
    render(<AddQuestionForm />);
    const cancelButton = screen.getByTestId('close-modal');

    expect(cancelButton).toBeInTheDocument();
  });

  it('Displays the Submit button', () => {
    render(<AddQuestionForm />);
    const submitButton = screen.getByRole('button', { name: 'SUBMIT'});

    expect(submitButton).toBeInTheDocument();
  });

  it('Displays a list of error message(s) if submitting with empty fields or invalid email', () => {
    const mockSetIsModalOpen = jest.fn();
    axios.post.mockResolvedValue({});

    render(<AddQuestionForm setIsModalOpen={mockSetIsModalOpen} />);
    const submitButton = screen.getByRole('button', { name: 'SUBMIT'});
    fireEvent.click(submitButton);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });
})
