import { screen, render } from '@testing-library/react';
import ToggleableAddProduct from './ToggleAddProduct';
import userEvent from '@testing-library/user-event';

test('add button works', async () =>{
  let mockFunc = vi.fn();
  render(<ToggleableAddProduct onAddProduct={mockFunc}/>);
  let user = userEvent.setup();

  let addProductButton = screen.getByRole('button', { name: 'Add Product' });
  expect(addProductButton).toBeInTheDocument();

  await user.click(addProductButton);

  let addButton = screen.getByRole('button', {name: 'Add'});
  let cancelButton = screen.getByRole('button', {name: 'Cancel'});

  expect(addButton).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();

});