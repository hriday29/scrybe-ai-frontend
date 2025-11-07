import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

// Simple consumer component to exercise toggleTheme
const Consumer = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button aria-label="toggle" onClick={toggleTheme} data-mode={isDark ? 'dark' : 'light'}>
      Mode: {isDark ? 'dark' : 'light'}
    </button>
  );
};

// Helper wrapper
const setup = () => {
  return render(
    <ThemeProvider>
      <Consumer />
    </ThemeProvider>
  );
};

describe('ThemeContext', () => {
  test('toggles dark class on documentElement', () => {
  setup();
  const btn = screen.getByLabelText('toggle');

    // Initial state: depending on localStorage may vary; normalize by removing class.
    document.documentElement.classList.remove('dark');

    fireEvent.click(btn); // toggle once
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    fireEvent.click(btn); // toggle back
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
