import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Page from './Page';

describe('<Page />', () => {
  test('it should mount', () => {
    render(<Page />);
    
    const page = screen.getByTestId('Page');

    expect(page).toBeInTheDocument();
  });
});