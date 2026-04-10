import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import AddProduct from './AddProduct';

test('User interactions with add product form work correctly', async () => {
  let mockFunc = vi.fn();
  let user = userEvent.setup();

  render(<AddProduct onShowAddForm={mockFunc}
                     showAddProduct={true}
                     onAddProduct={mockFunc}/>);
  
  screen.debug();
  let productNameBox = screen.getByRole('textbox', { name: "Product Name:"});
  await user.type(productNameBox, 'GARBAGE');
  expect(productNameBox).toHaveValue('GARBAGE');

  let priceBox = screen.getByRole('spinbutton', { name: "Price:"});
  await user.type(priceBox, '10');
  expect(priceBox).toHaveValue(10);

  let quantityBox = screen.getByRole('spinbutton', { name: "Quantity:"});
  await user.type(quantityBox, '10');
  expect(quantityBox).toHaveValue(10);
});