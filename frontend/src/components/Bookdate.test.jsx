import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Bookdate from './Bookdate';

describe('Bookdate', () => {
  test('has a submit button', () => {
    render(<Bookdate />);
    const linkElement = screen.getByRole('button', { name: /Submit it!!/i });
    expect(linkElement).toBeInTheDocument();
  });

  test('click on submit button', async () => {
    const fn = jest.fn();
    render(<Bookdate />);
    const linkElement = screen.getByRole('button', { name: /Submit it!!/i });
    linkElement.click = fn();
    userEvent.click(linkElement);
    expect(fn).toHaveBeenCalledTimes(1);
  })

  test('has the text from', () => {
    render(<Bookdate/>);
    const linkElement = screen.getByText(/from:/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('has 6 input in total', () => {
    render(<Bookdate/>);
    const linkElement = screen.queryAllByRole('textbox');
    expect(linkElement).toHaveLength(6);
  });
})
