import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Home from './page';

// Mock the Telegram WebApp SDK
jest.mock('@twa-dev/sdk', () => ({
  __esModule: true,
  default: {
    ready: jest.fn(),
    initDataUnsafe: {
      user: {
        username: 'testuser',
      },
    },
  },
}));

describe('Home component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders welcome message with username', async () => {
    render(<Home />);
    await screen.findByText('Welcome, @testuser!');
  });

  it('initializes with 0 strikes', () => {
    render(<Home />);
    expect(screen.getByText('Strikes: 0')).toBeInTheDocument();
  });

  it('allows a strike when timer is 0', async () => {
    render(<Home />);

    // Wait for the initial timer to reach 0
    act(() => {
      jest.advanceTimersByTime(30000);
    });

    const strikeButton = screen.getByText('Strike!');
    fireEvent.click(strikeButton);

    expect(screen.getByText('Strikes: 1')).toBeInTheDocument();
  });

  it('disables strike button after successful strike', async () => {
    render(<Home />);

    // Wait for the initial timer to reach 0
    act(() => {
      jest.advanceTimersByTime(30000);
    });

    const strikeButton = screen.getByText('Strike!');
    fireEvent.click(strikeButton);

    expect(strikeButton).toBeDisabled();
  });

  it('allows changing strike interval', async () => {
    render(<Home />);

    const durationInput = screen.getByLabelText('Strike Interval (seconds):');
    fireEvent.change(durationInput, { target: { value: '5' } });

    // Wait for the new timer to reach 0
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    const strikeButton = screen.getByText('Strike!');
    expect(strikeButton).not.toBeDisabled();
  });
});