import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import Toast from '../components/Toast';

jest.useFakeTimers();

describe('Toast component', () => {
  const onCloseMock = jest.fn();

  afterEach(() => {
    jest.clearAllTimers();
    onCloseMock.mockClear();
  });

  test('display message and then disappears after the requested time', async () => {
    render(
      <Toast
        id='1'
        message='Test message'
        type='success'
        duration={3000}
        onClose={onCloseMock}
      />
    );
    expect(screen.getByText('Test message')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(onCloseMock).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(500);
    });
    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalledWith('1');
    });
  });

  test('toast disappears after clicking the close icon', () => {
    render(
      <Toast
        id='2'
        message='Test message'
        type='info'
        duration={3000}
        onClose={onCloseMock}
      />
    );
    const closeButton = screen.getByRole('button', {
      name: 'Close',
    });
    fireEvent.click(closeButton);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(onCloseMock).toHaveBeenCalledWith('2');
  });
});
