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

    expect(screen.getByLabelText('Nickname *')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Example: jack543!/i)).toBeInTheDocument();
  });

  it('Displays the Email label and the placeholder within the input', () => {
    render(<AddAnswerForm />);

    expect(screen.getByLabelText(/Email */i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Example: jack@email.com/i)).toBeInTheDocument();
  });

  it('Displays the Answer label and its input', () => {
    render(<AddAnswerForm />);

    expect(screen.getByLabelText(/Answer */i)).toBeInTheDocument();
  });

  it('Displays the X button to close the modal', () => {
    render(<AddAnswerForm />);
    const cancelButton = screen.getByRole('button', { name: 'X' });

    expect(cancelButton).toBeInTheDocument();
  });

  it('Displays the Submit button', () => {
    render(<AddAnswerForm />);
    const submitButton = screen.getByRole('button', { name: 'Submit'});

    expect(submitButton).toBeInTheDocument();
  });

  it('Displays a list of error message(s) if submitting with empty fields or invalid email', () => {
    const mockSetIsModalOpen = jest.fn();
    axios.post.mockResolvedValue({});

    render(<AddAnswerForm setIsModalOpen={mockSetIsModalOpen} />);
    const submitButton = screen.getByRole('button', { name: 'Submit'});
    fireEvent.click(submitButton);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});

describe('AddQuestionForm Component', () => {
  it('Displays the Nickname and label and the placeholder within the input', () => {
    render(<AddQuestionForm />);

    expect(screen.getByLabelText('Nickname *')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Example: jackson11!/i)).toBeInTheDocument();
  })

  it('Displays the Email label and the placeholder within the input', () => {
    render(<AddQuestionForm />);

    expect(screen.getByLabelText(/Email */i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Example: jack@email.com/i)).toBeInTheDocument();
  });

  it('Displays the Question label and the placeholder within the input', () => {
    render(<AddQuestionForm />);

    expect(screen.getByLabelText(/Question */i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Why did you like the product or not?/i)).toBeInTheDocument();
  });

  it('Displays the X button to close the modal', () => {
    render(<AddQuestionForm />);
    const cancelButton = screen.getByRole('button', { name: 'X' });

    expect(cancelButton).toBeInTheDocument();
  });

  it('Displays the Submit button', () => {
    render(<AddQuestionForm />);
    const submitButton = screen.getByRole('button', { name: 'Submit'});

    expect(submitButton).toBeInTheDocument();
  });

  it('Displays a list of error message(s) if submitting with empty fields or invalid email', () => {
    const mockSetIsModalOpen = jest.fn();
    axios.post.mockResolvedValue({});

    render(<AddQuestionForm setIsModalOpen={mockSetIsModalOpen} />);
    const submitButton = screen.getByRole('button', { name: 'Submit'});
    fireEvent.click(submitButton);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });
})
