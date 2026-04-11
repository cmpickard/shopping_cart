import { useState, useEffect } from 'react';
import type { Product, Cart, NewProduct, EditedProduct } from './types/index.ts'
import CartHeader from './components/CartHeader.tsx';
import ProductList from './components/ProductList.tsx';
import ToggleableAddProduct from './components/ToggleAddProduct.tsx';
import './stylesheets/main.css'
import { addToCart, checkoutCart, createProduct, deleteProduct, editProduct, fetchAllProducts, fetchCart } from './services/services.tsx';
import findProductIdx from './utilities/findProductIdx.ts';

function App() {
  const [ products, setProducts ] = useState<Product[]>([])
  const [ cart, setCart ] = useState<Cart>([]);

  function getAllProductsOrchestrator() {
    (async () => {
      let validatedProducts = await fetchAllProducts();
      if (validatedProducts !== null) setProducts(validatedProducts);
    })();
  }

  function getCartOrchestrator() {
    (async () => {
      let verifiedCart = await fetchCart();
      if (verifiedCart !== null) setCart(verifiedCart);
    })()
  }

  useEffect(getAllProductsOrchestrator, []);
  useEffect(getCartOrchestrator, []);

  
  async function handleAddProduct(newProduct: NewProduct, resetAddForm: () => void) {
      let confirmedProduct = await createProduct(newProduct);
      if (confirmedProduct === null || confirmedProduct === undefined) return;

      setProducts((prev) => prev.concat(confirmedProduct));
      alert('Product successfully added!');
      resetAddForm();
  }

  async function handleDeleteProduct(productId: string) {
    let result = await deleteProduct(productId);
    if (result === true) {
      setProducts((prev) => {
        return prev.filter(prod => prod._id !== productId);
      });
    } 
  }

  async function handleEditProduct(productId: string, editedProduct: EditedProduct) {
    let verifiedEditedProduct = await editProduct(productId, editedProduct);
    if (verifiedEditedProduct === null) return;

    setProducts((prev) => {
      let productIdx = findProductIdx(prev, verifiedEditedProduct);
      let productsCopy = [... prev];
      productsCopy[productIdx] = verifiedEditedProduct;
      return productsCopy;
    });
  }

  async function handleAddToCart(productId: string) {
    let verifiedAddToCart = await addToCart(productId);
    if (verifiedAddToCart === null) return;

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
  }

  async function handleCheckout() {
    let result = await checkoutCart();
    if (result !== null) setCart([]);
  }

  return (
    <div id="app">
      <CartHeader cart={cart} onCheckout={handleCheckout}/>
      <main>
        <ProductList products={products}
                     onAddToCart={handleAddToCart}
                     onDeleteProduct={handleDeleteProduct}
                     onEditProduct={handleEditProduct}/>
        <ToggleableAddProduct onAddProduct={handleAddProduct}/>
      </main>
    </div>
  )
}

export default App

