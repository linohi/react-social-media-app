import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddPost from './AddPost';

describe('<AddPost />', () => {
  test('it should mount', () => {
    render(<AddPost />);
    
    const addPost = screen.getByTestId('AddPost');

    expect(addPost).toBeInTheDocument();
  });
});