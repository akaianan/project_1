import React from 'react'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Createlist from './Createlist';

describe('Createlist', () => {
  test('click add bedroom button', () => {
    const fn = jest.fn();
    render(<Createlist />);
    const linkElement = screen.getByRole('button', { name: /Add Bedroom/i });
    linkElement.click = fn();
    userEvent.click(linkElement);
    expect(linkElement).toBeInTheDocument();
  });
  test('has 5 button in total', () => {
    render(<Createlist />);
    const linkElement = screen.queryAllByRole('button');
    expect(linkElement).toHaveLength(4);
  })
  test('has 10 input in total', () => {
    render(<Createlist />);
    const linkElement = screen.queryAllByRole('textbox');
    expect(linkElement).toHaveLength(6);
  })
  test('click on Turn to url than Turn to pic', () => {
    render(<Createlist />);
    const linkElement1 = screen.getByRole('button', { name: /Turn to url/i });
    linkElement1.click();
    const linkElement2 = screen.getByRole('button', { name: /Turn to pic/i });
    expect(linkElement2).toBeInTheDocument();
  })
})
