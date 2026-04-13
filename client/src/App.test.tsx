import { render, screen, logRoles } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { fetchAllProducts, fetchCart, createProduct, editProduct, deleteProduct, addToCart, checkoutCart } from './services/services.tsx';
import type { Cart, Product, ReturnedFromAddToCart } from './types';
import App from './App.tsx';

vi.mock('./services/services.tsx');

const mockedFetchAllProducts = vi.mocked(fetchAllProducts);
const mockedFetchCart = vi.mocked(fetchCart);
const mockedCreateProduct = vi.mocked(createProduct);
const mockedEditProduct = vi.mocked(editProduct);
const mockedDeleteProduct = vi.mocked(deleteProduct);
const mockedAddToCart = vi.mocked(addToCart);
const mockedCheckout = vi.mocked(checkoutCart);

test('loads all products and cart items', async () => {
  let mockedProducts: Product[] = [
    {
      _id: "1",
      title: "Amazon Kindle E-reader",
      quantity: 5,
      price: 79.99,
    },
    {
      _id: "2",
      title: "Apple 10.5-Inch iPad Pro",
      quantity: 0,
      price: 649.99,
    }
  ];

  let mockedCart: Cart = [
    {
      _id: "a1",
      productId: "1",
      title: "Amazon Kindle E-reader",
      quantity: 1,
      price: 79.99,
    },
    {
      _id: "a2",
      productId: "2",
      title: "Apple 10.5-Inch iPad Pro",
      quantity: 3,
      price: 649.99,
    }
  ];

  mockedFetchAllProducts.mockResolvedValue(mockedProducts);
  mockedFetchCart.mockResolvedValue(mockedCart);
  render(<App/>);

  let products = await screen.findByRole('heading', { level: 3, name: 'Amazon Kindle E-reader'});
  expect(products).toBeInTheDocument();

  let cartCell = await screen.findByRole('cell', { name: "Amazon Kindle E-reader"});
  expect(cartCell).toBeInTheDocument();
});

test('displays empty cart', async () => {
  let mockedProducts: Product[] = [
    {
      _id: "1",
      title: "Amazon Kindle E-reader",
      quantity: 5,
      price: 79.99,
    },
    {
      _id: "2",
      title: "Apple 10.5-Inch iPad Pro",
      quantity: 0,
      price: 649.99,
    }
  ];

  let mockedCart: Cart = [];

  mockedFetchAllProducts.mockResolvedValue(mockedProducts);
  mockedFetchCart.mockResolvedValue(mockedCart);
  render(<App/>);

  let products = await screen.findByRole('heading', { level: 3, name: 'Amazon Kindle E-reader'});
  expect(products).toBeInTheDocument();

  let paragraphs = await screen.findAllByRole('paragraph');
  expect(paragraphs[0]).toHaveTextContent('Your cart is empty');
  expect(paragraphs[1]).toHaveTextContent('Total: $0');
});

test('Adding a product changes product list', async() => {
  let user = userEvent.setup();
  let mockedProducts: Product[] = [];
  let mockedCart: Cart = [];
  let mockedNewProduct = {
    _id: "2",
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
  }

  mockedFetchAllProducts.mockResolvedValue(mockedProducts);
  mockedFetchCart.mockResolvedValue(mockedCart);
  mockedCreateProduct.mockResolvedValue(mockedNewProduct);
  render(<App/>);

  let addProductFormButton = await screen.getByRole('button', { name: 'Add Product'});
  await user.click(addProductFormButton);

  let addProductButton = await screen.getByRole('button', { name: 'Add'});
  expect(addProductButton).toBeInTheDocument();

  await user.click(addProductButton);
  let products = await screen.findByRole('heading', { level: 3, name: 'Amazon Kindle E-reader'});

  expect(products).toBeInTheDocument();
})

test('updated product displays new values', async () => {
  let user = userEvent.setup();
  let mockedProducts: Product[] = [{
    _id: "1",
    title: "Slamazon",
    quantity: 5,
    price: 79.99,
  }];
  let mockedCart: Cart = [];
  let mockedEdits = {
    _id: "1",
    title: "Slamazon2",
    quantity: 5,
    price: 79.99,
  }

  mockedFetchAllProducts.mockResolvedValue(mockedProducts);
  mockedFetchCart.mockResolvedValue(mockedCart);
  mockedEditProduct.mockResolvedValue(mockedEdits);

  render(<App/>);
  let productTitle = await screen.findByRole('heading', { level: 3, name:"Slamazon"});
  expect(productTitle).toBeInTheDocument();

  let openEditButton = await screen.findByRole('button', { name:"Edit"});
  expect(openEditButton).toBeInTheDocument();

  await user.click(openEditButton);

  let titleField = await screen.findByRole('textbox', { name: 'Product Name: Product Name:'})
  expect(titleField).toBeInTheDocument();

  await user.type(titleField, '2');

  let submitButton = await screen.findByRole('button', { name: 'Submit Edits'});
  await user.click(submitButton);

  expect(productTitle).toHaveTextContent('Slamazon2');

  // confirm edit form is gone
  let editHeading = await screen.queryByRole('heading', { name: 'Edit Product'});
  expect(editHeading).toBeNull();
});

// When the product is deleted, it is removed from the product list.
// When the product is added to the cart, it appears in the cart.
// When the cart is checked out, a message is displayed indicating that there are no items in the cart.

test('deleting product removes from product list', async () => {
  const mockedProducts: Product[] = [{
    _id: "1",
    title: "Garbage",
    quantity: 5,
    price: 79.99,
  }];
  const mockedCart: Cart = [];
  const user = userEvent.setup();

  mockedFetchAllProducts.mockResolvedValue(mockedProducts);
  mockedFetchCart.mockResolvedValue(mockedCart);
  mockedDeleteProduct.mockResolvedValue(true);

  render(<App/>);

  const productHeading = await screen.findByRole('heading', { name: "Garbage"});
  expect(productHeading).toBeInTheDocument();

  const deleteProduct = await screen.findByRole('button', { name: /X/i});
  expect(deleteProduct).toBeInTheDocument();

  await user.click(deleteProduct);

  const missingHeading = await screen.queryByRole('heading', { name: "Garbage"});
  expect(missingHeading).toBeNull(); 
});

test('adding product to cart causes appearance in cart', async () => {
  const mockedProducts: Product[] = [{
    _id: "1",
    title: "Garbage",
    quantity: 5,
    price: 79.99,
  }];
  const mockedCart: Cart = [];
  const mockedAddition: ReturnedFromAddToCart = {
    product: {
      _id: "1",
      title: "Garbage",
      quantity: 4,
      price: 79.99,
    },
    item: {
      _id: "a1",
      productId: "1",
      title: "Garbage",
      quantity: 1,
      price: 79.99,
    }
  };

  let user = userEvent.setup();

  mockedFetchAllProducts.mockResolvedValue(mockedProducts);
  mockedFetchCart.mockResolvedValue(mockedCart);
  mockedAddToCart.mockResolvedValue(mockedAddition);

  render(<App/>);

  let addButton = await screen.findByRole('button', { name: 'Add to Cart'});

  await user.click(addButton);

  let cartItem = await screen.findByRole('cell', { name: 'Garbage'});
  expect(cartItem).toBeInTheDocument();
});

test('checkout cart resets cart to No Items', async () => {
  const mockedProducts: Product[] = [{
    _id: "1",
    title: "Garbage",
    quantity: 5,
    price: 79.99,
  }];
  const mockedCart: Cart = [];
  const mockedAddition: ReturnedFromAddToCart = {
    product: {
      _id: "1",
      title: "Garbage",
      quantity: 4,
      price: 79.99,
    },
    item: {
      _id: "a1",
      productId: "1",
      title: "Garbage",
      quantity: 1,
      price: 79.99,
    }
  };

  let user = userEvent.setup();

  mockedFetchAllProducts.mockResolvedValue(mockedProducts);
  mockedFetchCart.mockResolvedValue(mockedCart);
  mockedAddToCart.mockResolvedValue(mockedAddition);
  mockedCheckout.mockResolvedValue(true);

  render(<App/>);

  let addButton = await screen.findByRole('button', { name: 'Add to Cart'});

  await user.click(addButton);

  let cartItem = await screen.findByRole('cell', { name: 'Garbage'});
  let checkoutButton = await screen.findByRole('button', { name: 'Checkout'} );

  await user.click(checkoutButton);

  expect(cartItem).not.toBeInTheDocument();
});