import { useState, useEffect } from 'react';
// import mockData from './data/mockData.js'
import type { Product, Cart, NewProduct, EditedProduct } from './types/index.ts'
import CartHeader from './components/CartHeader.tsx';
import ProductList from './components/ProductList.tsx';
import ToggleableAddProduct from './components/ToggleAddProduct.tsx';
import './stylesheets/main.css'
import { addToCart, checkoutCart, createProduct, deleteProduct, editProduct, fetchAllProducts, fetchCart } from './services/services.tsx';
import { CartSchema, ProductListSchema, ProductSchema, ReturnedFromAddToCartSchema } from './types/index.ts';
import type { ZodError } from 'zod';
import findProductIdx from './utilities/findProductIdx.ts';

function App() {
  const [ products, setProducts ] = useState<Product[]>([])
  const [ cart, setCart ] = useState<Cart>([]);

  function getAllProductsOrchestrator() {
    (async () => {
      try {
        let response = await fetchAllProducts();
        if (response.ok) {
          let data = await response.json();
          let validatedProducts = ProductListSchema.parse(data);
          setProducts(validatedProducts);
        } else {
          console.error(response.status)
        }
      } catch (e: Error | unknown) {
        console.error(e);
      }
    })();
  }

  function getCartOrchestrator() {
    (async () => {
      try {
        let response = await fetchCart();
        if (response.ok) {
          let data = await response.json();
          let verifiedCart = CartSchema.parse(data);
          setCart(verifiedCart);
        } else {
          console.error(response.status)
        }
      } catch (err: Error | ZodError | unknown) {
        console.error(err);
      }
    })()
  }

  useEffect(getAllProductsOrchestrator, []);
  useEffect(getCartOrchestrator, []);

  async function handleAddProduct(newProduct: NewProduct, resetAddForm: () => void) {
    try {
      let response = await createProduct(newProduct);
      if (response.ok) {
        let data = await response.json();
        let confirmedProduct = ProductSchema.parse(data);
        setProducts((prev) => prev.concat(confirmedProduct));
        alert('Product successfully added!');

        resetAddForm();
      } else {
        console.error(response.status)
      }
    } catch (err: Error | ZodError | unknown) {
      console.error(err);
    }
  }

  async function handleDeleteProduct(productId: string) {
    console.log('here!');
    try {
      let response = await deleteProduct(productId);
      console.log(response.status, response.statusText)
      if (response.ok) {
        setProducts((prev) => {
          return prev.filter(prod => prod._id !== productId);
        });
      } else {
        console.error(response.status);
      }

    } catch (err: Error | ZodError | unknown) {
      console.error(err);
    }
  }

  async function handleEditProduct(productId: string, editedProduct: EditedProduct) {
    try {
      let response = await editProduct(productId, editedProduct);
      if (response.ok) {
        let data = await response.json();
        let verifiedEditedProduct = ProductSchema.parse(data);

        setProducts((prev) => {
          let productIdx = findProductIdx(prev, verifiedEditedProduct);
          let productsCopy = [... prev];
          productsCopy[productIdx] = verifiedEditedProduct;
          return productsCopy;
        });
      }
    } catch (err: Error | ZodError | unknown) {
      console.error(err);
    }
  }

  async function handleAddToCart(productId: string) {
    try {
      let response = await addToCart(productId);
      if (response.ok) {
        let data = await response.json();
        let verifiedAddToCart = ReturnedFromAddToCartSchema.parse(data);

        // update product and update cart both
        setProducts((prev) => {
          let productIdx = findProductIdx(prev, verifiedAddToCart.product);
          let productsCopy = [... prev];
          productsCopy[productIdx] = verifiedAddToCart.product;
          return productsCopy;
        });

        setCart((prev) => {
          let item = verifiedAddToCart.item;
          let cartItemIdx = findProductIdx(prev, item);
          let cartCopy = [...prev];
          if (cartItemIdx === -1) {
            cartCopy.push(item);
          } else {
            cartCopy[cartItemIdx] = item;
          }

          return cartCopy;
        })


      } else {
        console.error(response.status);
      }
    } catch (err: Error | ZodError | unknown) {
      console.error(err);
    }
  }

  async function handleCheckout() {
    try {
      let response = await checkoutCart();
      if (response.ok) {
        setCart([]);
      } else {
        console.error(response.status);
      }
    } catch (err: Error | ZodError | unknown) {
      console.error(err);
    }
  }

  return (
    <>
      <CartHeader cart={cart} onCheckout={handleCheckout}/>
      <ProductList products={products}
                   onAddToCart={handleAddToCart}
                   onDeleteProduct={handleDeleteProduct}
                   onEditProduct={handleEditProduct}/>
      <ToggleableAddProduct onAddProduct={handleAddProduct}/>
    </>
  )
}

export default App
