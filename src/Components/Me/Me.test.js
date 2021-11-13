import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Me from './Me';

describe('<Me />', () => {
  test('it should mount', () => {
    render(<Me />);
    
    const me = screen.getByTestId('Me');

    expect(me).toBeInTheDocument();
  });
});