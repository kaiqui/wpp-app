import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the components that App uses
jest.mock('./components/layout/Layout', () => {
  return function DummyLayout({ children }) {
    return <div data-testid="mock-layout">{children}</div>;
  };
});

jest.mock('./components/pages/Home', () => {
  return function DummyHome() {
    return <div data-testid="mock-home">Home Page</div>;
  };
});

test('renders App component without crashing', () => {
  render(<App />);
  
  // Check if the Layout component is rendered
  const layoutElement = screen.getByTestId('mock-layout');
  expect(layoutElement).toBeInTheDocument();

  // Check if the Home component is rendered inside the Layout
  const homeElement = screen.getByTestId('mock-home');
  expect(homeElement).toBeInTheDocument();
});
