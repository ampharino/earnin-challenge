import { render, screen } from '@testing-library/react';
import ExpenseDialog from './ExpenseDialog';

describe('ExpenseDialog', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({ fact: 'Here is a random cat fact' }),
    } as unknown as Response);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('calls cat fact api to display a random cat fact', async () => {
    render(
      <ExpenseDialog isOpen={true} onAddExpense={vi.fn()} setOpen={vi.fn()} />
    );
    expect(global.fetch).toHaveBeenCalledWith('https://catfact.ninja/fact');
    expect(
      await screen.findByText('Here is a random cat fact')
    ).toBeInTheDocument();
  });
});
