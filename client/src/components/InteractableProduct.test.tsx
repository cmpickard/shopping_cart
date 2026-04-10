import { screen, render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event'
import InteractableProduct from './InteractableProduct';
import type { Product } from '../types';

test('Edit button works / Cancel button works', async () => {
  let mockFunc = vi.fn();
  let user = userEvent.setup();
  let mockProduct: Product = {
    _id: 'somelongstring',
    quantity: 10,
    title: 'FAKE',
    price: 10
  }

  render(<InteractableProduct product={mockProduct}
                              onAddToCart={mockFunc}
                              onDeleteProduct={mockFunc}
                              onEditProduct={mockFunc}/>)

  let openEditsButton = screen.getByRole('button', { name: 'Edit'});
  expect(openEditsButton).toBeInTheDocument();

  await user.click(openEditsButton);

  let textbox = screen.getByRole('textbox', { name: "Product Name:"});
  expect(textbox).toBeInTheDocument();

  let cancel = screen.getByRole('button', { name: 'Cancel'})
  await user.click(cancel);
  expect(textbox).not.toBeInTheDocument();
});

test('User interactions on edit form work', async () => {
  let mockFunc = vi.fn();
  let user = userEvent.setup();
  let mockProduct: Product = {
    _id: 'somelongstring',
    quantity: 10,
    title: 'FAKE',
    price: 10
  }

  render(<InteractableProduct product={mockProduct}
                              onAddToCart={mockFunc}
                              onDeleteProduct={mockFunc}
                              onEditProduct={mockFunc}/>)

  let openEditsButton = screen.getByRole('button', { name: 'Edit'});

  await user.click(openEditsButton);

  let productNameBox = screen.getByRole('textbox', { name: "Product Name:"});
  expect(productNameBox).toHaveValue('FAKE');
  await user.type(productNameBox, ' GARBAGE');
  expect(productNameBox).toHaveValue('FAKE GARBAGE');

  let priceBox = screen.getByRole('spinbutton', { name: "Price:"});
  expect(priceBox).toHaveValue(10);
  await user.type(priceBox, '10');
  expect(priceBox).toHaveValue(1010);

  let quantityBox = screen.getByRole('spinbutton', { name: "Quantity:"});
  expect(quantityBox).toHaveValue(10);
  await user.type(quantityBox, '10');
  expect(quantityBox).toHaveValue(1010);
});