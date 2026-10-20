import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockData } from './data/mock';
import { loadPortal } from './lib/api';
import App from './App';

vi.mock('./lib/api', () => ({ loadPortal: vi.fn() }));
beforeEach(() => {
  vi.mocked(loadPortal).mockResolvedValue(mockData);
  document.documentElement.dataset.theme = 'light';
});

describe('portal interactions', () => {
  it('switches identity and apps while keeping the group critical banner', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Booking workspace Flights/ });
    await user.selectOptions(
      screen.getByLabelText('Your workspace'),
      'academy',
    );
    expect(
      screen.getByRole('region', { name: 'Aviation Academy workspace' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Booking workspace Flights/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Training workspace Classes/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('alert', { name: 'Critical group alert' }),
    ).toBeInTheDocument();
  });
  it('shows searchable empty states and never hides the critical banner', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('alert', { name: 'Critical group alert' });
    await user.type(screen.getByRole('searchbox'), 'no-such-result');
    await screen.findByRole('heading', { name: 'No apps found' });
    expect(
      screen.getByRole('heading', { name: 'No matching updates' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('alert', { name: 'Critical group alert' }),
    ).toBeInTheDocument();
    await user.click(
      screen.getAllByRole('button', { name: 'Clear search' })[0],
    );
    await screen.findByRole('button', { name: /Booking workspace Flights/ });
  });
  it('displays retryable initial failures and recovers on retry', async () => {
    vi.mocked(loadPortal).mockRejectedValueOnce(new Error('Unavailable'));
    const user = userEvent.setup();
    render(<App />);
    expect(
      await screen.findByRole('heading', { name: 'Apps are unavailable' }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Try again' }));
    expect(
      await screen.findByRole('alert', { name: 'Critical group alert' }),
    ).toBeInTheDocument();
  });
  it('retains critical information and warns about staleness after failed refresh', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('alert', { name: 'Critical group alert' });
    vi.mocked(loadPortal).mockRejectedValueOnce(new Error('Unavailable'));
    await user.click(screen.getByText('Prototype testing controls'));
    await user.click(screen.getByRole('button', { name: 'Reload data' }));
    expect(
      await screen.findByText(/Previously loaded updates/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('alert', { name: 'Critical group alert' }),
    ).toBeInTheDocument();
  });
  it('opens an honest prototype launch and restores focus when closed', async () => {
    const user = userEvent.setup();
    render(<App />);
    const launcher = await screen.findByRole('button', {
      name: /Booking workspace Flights/,
    });
    await user.click(launcher);
    const dialog = screen.getByRole('dialog', { name: 'Booking workspace' });
    expect(
      within(dialog).getByText(/No business system is connected/),
    ).toBeInTheDocument();
    await user.click(
      within(dialog).getByRole('button', { name: 'Close dialog' }),
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(launcher).toHaveFocus();
  });
  it('toggles dark mode with an accessible action label', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(
      screen.getByRole('button', { name: 'Switch to dark mode' }),
    );
    await waitFor(() =>
      expect(document.documentElement.dataset.theme).toBe('dark'),
    );
    expect(
      screen.getByRole('button', { name: 'Switch to light mode' }),
    ).toBeInTheDocument();
  });
});
