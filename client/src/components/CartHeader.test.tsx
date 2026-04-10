import { render, screen } from '@testing-library/react';
import CartHeader from './CartHeader';
import type { Cart } from '../types';

test('check h1 is present', () => {
  let mockFn = vi.fn();
  render(<CartHeader cart={[]} onCheckout={mockFn}/>);
  let cartHeader = screen.getByRole('heading', { level: 2, name: "Your Cart" });
  let shopHeader = screen.getByRole('heading', { level: 1, name: "The Shop!"});

  expect(cartHeader).toBeInTheDocument();
  expect(shopHeader).toBeInTheDocument();
});


test('verify cart displaying correctly', () => {
  let mockCartData: Cart = [];
  let mockFunc = vi.fn();

  render(<CartHeader cart={mockCartData} onCheckout={mockFunc}/>);

  let paragraphs = screen.getAllByRole('paragraph');
  expect(paragraphs[0]).toHaveTextContent('Your cart is empty');
  expect(paragraphs[1]).toHaveTextContent('Total: $0');
  
  mockCartData = [{ price: 10,
                    quantity: 1,
                    title: 'Garbage',
                    _id:'asdfs',
                    productId: 'asdf'}];
  render(<CartHeader cart={mockCartData} onCheckout={mockFunc}/>);
  
  screen.debug();
  let quantityCell = screen.getByRole('cell', { name: '1' });
  let titleCell = screen.getByRole('cell', { name: 'Garbage' });
  let priceCell = screen.getByRole('cell', { name: '10' });

  expect(quantityCell).toBeInTheDocument();
  expect(titleCell).toBeInTheDocument();
  expect(priceCell).toBeInTheDocument();
});
