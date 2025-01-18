import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ExpenseDialog from './ExpenseDialog';

describe('ExpenseDialog', () => {
  const mockOnAddExpense = vi.fn();
  const mockSetOpen = vi.fn();
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
      <ExpenseDialog
        isOpen={true}
        onAddExpense={mockOnAddExpense}
        setOpen={mockSetOpen}
      />
    );
    expect(global.fetch).toHaveBeenCalledWith('https://catfact.ninja/fact');
    expect(
      await screen.findByText('Here is a random cat fact')
    ).toBeInTheDocument();
  });
  it('should render Item name, Category, and Amount fields', async () => {
    render(
      <ExpenseDialog
        isOpen={true}
        onAddExpense={mockOnAddExpense}
        setOpen={mockSetOpen}
      />
    );
    expect(await screen.findByPlaceholderText('Item name')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Category' })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Item amount')).toBeInTheDocument();
  });
  it('should have 3 categories: Food, Furniture and Accessory', async () => {
    render(
      <ExpenseDialog
        isOpen={true}
        onAddExpense={mockOnAddExpense}
        setOpen={mockSetOpen}
      />
    );
    await fireEvent.click(screen.getByRole('button', { name: 'Category' }));
    expect(
      await screen.findByRole('option', { name: 'Food' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'Furniture' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'Accessory' })
    ).toBeInTheDocument();
  });
  it('should call add expense if validation passes and close dialog', async () => {
    render(
      <ExpenseDialog
        isOpen={true}
        onAddExpense={mockOnAddExpense}
        setOpen={mockSetOpen}
      />
    );
    await fireEvent.change(await screen.findByPlaceholderText('Item name'), {
      target: { value: 'Whiskers Cat Food' },
    });
    await fireEvent.click(screen.getByRole('button', { name: 'Category' }));
    await fireEvent.click(screen.getByRole('option', { name: 'Food' }));
    await fireEvent.change(screen.getByPlaceholderText('Item amount'), {
      target: { value: '10' },
    });
    await fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => {
      expect(mockOnAddExpense).toHaveBeenCalledWith({
        itemName: 'Whiskers Cat Food',
        category: 'food',
        itemAmount: 10,
      });
      expect(mockSetOpen).toHaveBeenCalledWith(false);
    });
  });
});
