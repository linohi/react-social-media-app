import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AuthGuard from './AuthGuard';

describe('<AuthGuard />', () => {
  test('it should mount', () => {
    render(<AuthGuard />);
    
    const authGuard = screen.getByTestId('AuthGuard');

    expect(authGuard).toBeInTheDocument();
  });
});