import type { NewProduct } from "../types";

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