import type { ZodError } from "zod";
import { CartSchema, ProductListSchema, ProductSchema, ReturnedFromAddToCartSchema, type EditedProduct, type NewProduct } from "../types";

export async function fetchCart() {
  try {
    let response = await fetch('/api/cart');;
    if (response.ok) {
      let data = await response.json();
      let verifiedCart = CartSchema.parse(data);
      return verifiedCart;
    } else {
      console.error(response.status)
      return null;
    }
  } catch (e: Error | ZodError | unknown) {
    console.error(e);
    return null;
  }
}

export async function fetchAllProducts() {
  try {
    let response = await fetch('/api/products');
    if (response.ok) {
      let data = await response.json();
      let validatedProducts = ProductListSchema.parse(data);
      return validatedProducts;
    } else {
      console.error(response.status)
      return null;
    }
  } catch (e: Error | ZodError | unknown) {
    console.error(e);
    return null;
  }
}

export async function createProduct(newProduct: NewProduct) {
  let body = JSON.stringify(newProduct);
  let options = {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    let response = await fetch('/api/products', options);
    if (response.ok) {
      let data = await response.json();
      let confirmedProduct = ProductSchema.parse(data);
      return confirmedProduct;
    } else {
      console.log(response.status);
      return null;
    }
  } catch (err: Error | ZodError | unknown) {
    console.error(err);
    return null;
  }
}

export async function deleteProduct(productId: string) {
  let options = {
    method: 'DELETE'
  }

  try {
    let response = await fetch(`/api/products/${productId}`, options);
    if (response.ok) {
      return true;
    } else {
      console.log(response.status);
      return false;
    }
  } catch (err: Error | ZodError | unknown) {
    console.error(err);
    return false;
  }
}

export async function editProduct(productId: string, editedProduct: EditedProduct) {
  let options = {
    method: 'PUT',
    body: JSON.stringify(editedProduct),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    let response = await fetch(`/api/products/${productId}`, options);
    if (response.ok) {
      let data = await response.json();
      let verifiedEditedProduct = ProductSchema.parse(data);
      return verifiedEditedProduct;
    } else {
      console.error(response.status);
      return null;
    }
  } catch (err: Error | ZodError | unknown) {
    console.error(err);
    return null;
  }
}

export async function addToCart(productId: string) {
  let options = {
    body: JSON.stringify({productId}),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    let response = await fetch('/api/add-to-cart', options);
    if (response.ok) {
      let data = await response.json();
      let verifiedAddToCart = ReturnedFromAddToCartSchema.parse(data);
      return verifiedAddToCart;
    } else {
      console.error(response.status);
      return null;
    }
  } catch (err: Error | ZodError | unknown) {
    console.error(err);
    return null;
  }
}

export async function checkoutCart() {
  let options = {
    method: 'POST',
  };

  try {
    let response = await fetch('/api/checkout', options);
    if (response.ok) {
      return true;
    } else {
      console.error(response.status)
      return null
    }
  } catch (err: Error | ZodError | unknown) {
    console.error(err);
    return null;
  }
}