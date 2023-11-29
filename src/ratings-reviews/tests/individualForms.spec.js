import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ComfortForm from '../components/forms/ComfortForm.jsx';
import FitForm from '../components/forms/FitForm.jsx';
import LengthForm from '../components/forms/LengthForm.jsx';
import QualityForm from '../components/forms/QualityForm.jsx';
import SizeForm from '../components/forms/SizeForm.jsx';
import WidthForm from '../components/forms/WidthForm.jsx';


describe('Characteristic Forms', () => {
  const setFn = jest.fn();

  afterEach(cleanup);

  test('Comfort Form', async () => {
    await render(<ComfortForm setCharacteristic={setFn} />);
    expect(await screen.findByText('Comfort')).toBeInTheDocument();

    const button = await screen.findByLabelText('Uncomfortable');
    expect(button.value).toEqual('1');
    fireEvent.click(button);
    expect(setFn).toHaveBeenCalled();
  });

  test('Fit Form', async () => {
    await render(<FitForm setCharacteristic={setFn} />);
    expect(await screen.findByText('Fit')).toBeInTheDocument();

    const button = await screen.findByLabelText('Slightly tight');
    expect(button.value).toEqual('2');
    fireEvent.click(button);
    expect(setFn).toHaveBeenCalled();
  });

  test('Length Form', async () => {
    await render(<LengthForm setCharacteristic={setFn} />);
    expect(await screen.findByText('Length')).toBeInTheDocument();

    const button = await screen.findByLabelText('Perfect');
    expect(button.value).toEqual('3');
    fireEvent.click(button);
    expect(setFn).toHaveBeenCalled();
  });

  test('Quality Form', async () => {
    await render(<QualityForm setCharacteristic={setFn} />);
    expect(await screen.findByText('Quality')).toBeInTheDocument();

    const button = await screen.findByLabelText('Pretty great');
    expect(button.value).toEqual('4');
    fireEvent.click(button);
    expect(setFn).toHaveBeenCalled();
  });

  test('Size Form', async () => {
    await render(<SizeForm setCharacteristic={setFn} />);
    expect(await screen.findByText('Size')).toBeInTheDocument();

    const button = await screen.findByLabelText('A size too big');
    expect(button.value).toEqual('5');
    fireEvent.click(button);
    expect(setFn).toHaveBeenCalled();
  });

  test('Width Form', async () => {
    await render(<WidthForm setCharacteristic={setFn} />);
    expect(await screen.findByText('Width')).toBeInTheDocument();

    const button = await screen.findByLabelText('Perfect');
    expect(button.value).toEqual('3');
    fireEvent.click(button);
    expect(setFn).toHaveBeenCalled();
  });
});