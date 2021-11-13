import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Posts from './Posts';

describe('<Posts />', () => {
  test('it should mount', () => {
    render(<Posts />);
    
    const posts = screen.getByTestId('Posts');

    expect(posts).toBeInTheDocument();
  });
});