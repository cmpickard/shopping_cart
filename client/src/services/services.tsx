import type { EditedProduct, NewProduct } from "../types";

export function createProduct(newProduct: NewProduct) {
  let body = JSON.stringify(newProduct);
  let options = {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return fetch('/api/products', options);
}

export function fetchAllProducts() { 
  return fetch('/api/products');
}

export function deleteProduct(productId: string) {
  let options = {
    method: 'DELETE'
  }

  return fetch(`/api/products/${productId}`, options);
}

export function editProduct(productId: string, editedProduct: EditedProduct) {
  let options = {
    method: 'PUT',
    body: JSON.stringify(editedProduct),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return fetch(`/api/products/${productId}`, options);
}

export function fetchCart() {
  return fetch('/api/cart');
}

export function addToCart(productId: string) {
  let options = {
    body: JSON.stringify({productId}),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return fetch('/api/add-to-cart', options);
}

export function checkoutCart() {
  let options = {
    method: 'POST',
  };

  return fetch('/api/checkout', options);
}