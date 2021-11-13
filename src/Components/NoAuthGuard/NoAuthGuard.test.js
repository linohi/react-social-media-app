import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NoAuthGuard from './NoAuthGuard';

describe('<NoAuthGuard />', () => {
  test('it should mount', () => {
    render(<NoAuthGuard />);
    
    const noAuthGuard = screen.getByTestId('NoAuthGuard');

    expect(noAuthGuard).toBeInTheDocument();
  });
});