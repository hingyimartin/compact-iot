import { render, screen, fireEvent } from '@testing-library/react';
import Homepage from '../pages/Homepage';
import { ToastProvider } from '../contexts/ToastContext';

describe('Homepage component', () => {
  test('show error if not all fields are filled after lock in clicked', () => {
    render(
      <ToastProvider>
        <Homepage />
      </ToastProvider>
    );
    const lockInButton = screen.getByText(/lock in/i);
    fireEvent.click(lockInButton);
    const toastMessage = screen.getByText('All fields are required!');
    expect(toastMessage).toBeInTheDocument();
  });

  test('display connector panel if all fields are filled and lock in clicked', () => {
    render(
      <ToastProvider>
        <Homepage />
      </ToastProvider>
    );
    fireEvent.change(screen.getByLabelText(/host/i), {
      target: { value: 'localhost' },
    });
    fireEvent.change(screen.getByLabelText(/port/i), {
      target: { value: '1883' },
    });
    fireEvent.change(screen.getByLabelText(/topic/i), {
      target: { value: 'test/topic' },
    });
    const lockInButton = screen.getByLabelText(/lock_in_broker/i);
    fireEvent.click(lockInButton);
    const connectorHeading = screen.getByRole('heading', {
      name: /select a connector/i,
    });
    expect(connectorHeading).toBeInTheDocument();
    const overviewHeading = screen.getByRole('heading', {
      name: /overview/i,
    });
    expect(overviewHeading).toBeInTheDocument();
  });

  test('hide connector panel after start again clicked', () => {
    render(
      <ToastProvider>
        <Homepage />
      </ToastProvider>
    );
    fireEvent.change(screen.getByLabelText(/host/i), {
      target: { value: 'localhost' },
    });
    fireEvent.change(screen.getByLabelText(/port/i), {
      target: { value: '1883' },
    });
    fireEvent.change(screen.getByLabelText(/topic/i), {
      target: { value: 'test/topic' },
    });
    const lockInButton = screen.getByLabelText(/lock_in_broker/i);
    fireEvent.click(lockInButton);
    const backButton = screen.getByLabelText(/back_connector/i);
    fireEvent.click(backButton);
    expect(
      screen.queryByRole('heading', { name: /select a connector/i })
    ).not.toBeVisible();
    expect(
      screen.queryByRole('heading', { name: /overview/i })
    ).not.toBeVisible();
  });
});
