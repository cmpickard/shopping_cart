import { useEffect, useReducer } from 'react';
import type { Product, Cart, NewProduct, EditedProduct, CartProduct } from './types/index.ts'
import CartHeader from './components/CartHeader.tsx';
import ProductList from './components/ProductList.tsx';
import ToggleableAddProduct from './components/ToggleAddProduct.tsx';
import './stylesheets/main.css'
import { addToCart, checkoutCart, createProduct, deleteProduct, editProduct, fetchAllProducts, fetchCart } from './services/services.tsx';
import findProductIdx from './utilities/findProductIdx.ts';

interface ProductAction {
  type: 'edit' | 'delete' | 'fetch' | 'add' | 'sort'
  payload: Product | Product[] | null
}

interface CartAction {
  type: 'add' | 'checkout' | 'fetch'
  payload: Cart | CartProduct | null
}

function productReducer(prev: Product[], action: ProductAction): Product[] {
  switch (action.type) {
    case 'edit': {
      if (action.payload && !Array.isArray(action.payload)) {
        let productIdx = findProductIdx(prev, action.payload);
        let productsCopy = [... prev];
        productsCopy[productIdx] = action.payload;
        return productsCopy;
      }

      break;
    } case 'delete': {
      if (action.payload && !Array.isArray(action.payload)) {
        const payload = action.payload;
        return prev.filter(prod => prod._id !== payload._id);
      }

      break;
    } case 'fetch': {
      if (action.payload && Array.isArray(action.payload)) {
        return action.payload;
      }

      break;
    } case 'add': {
      if (action.payload && !Array.isArray(action.payload)) {
        return prev.concat(action.payload);
      }

      break;
    } case 'sort': {
      if (action.payload && Array.isArray(action.payload)) {
        return action.payload;
      }

      break;
    }
  }

  return prev;
}

function cartReducer(prev: Cart, action: CartAction) {
  switch (action.type){
    case 'add': {
      if (action.payload && !Array.isArray(action.payload)) {
        let item = action.payload;
        let cartItemIdx = findProductIdx(prev, item);
        let cartCopy = [...prev];
        if (cartItemIdx === -1) {
          cartCopy.push(item);
        } else {
          cartCopy[cartItemIdx] = item;
        }
  
        return cartCopy;
      }

      break;
    } case 'checkout': {
      return [];
    } case 'fetch': {
      if (action.payload && Array.isArray(action.payload)) {
        return action.payload;
      }

      break;
    }
  }

  return prev;
}

function App() {
  const [products, dispatchProducts] = useReducer(productReducer, []);
  const [cart, dispatchCart] = useReducer(cartReducer, []);

  function getAllProductsOrchestrator() {
    (async () => {
      let validatedProducts = await fetchAllProducts();
      if (validatedProducts !== null) {
        dispatchProducts({ type: 'fetch', payload: validatedProducts});
      }
    })();
  }

  function getCartOrchestrator() {
    (async () => {
      let verifiedCart = await fetchCart();
      if (verifiedCart !== null) dispatchCart({ type: 'fetch', payload: verifiedCart})
    })()
  }

  useEffect(getAllProductsOrchestrator, []);
  useEffect(getCartOrchestrator, []);

  async function handleAddProduct(newProduct: NewProduct, resetAddForm: () => void) {
      let confirmedProduct = await createProduct(newProduct);
      if (confirmedProduct === null || confirmedProduct === undefined) return;

      dispatchProducts({ type: 'add', payload: confirmedProduct });

      resetAddForm();
  }

  async function handleDeleteProduct(productId: string) {
    let result = await deleteProduct(productId);
    if (result === true) {
      dispatchProducts({ type: 'delete', payload: { _id: productId, title: '', price: 0, quantity: 0}});
    } 
  }

  async function handleEditProduct(productId: string, editedProduct: EditedProduct) {
    let verifiedEditedProduct = await editProduct(productId, editedProduct);
    if (verifiedEditedProduct === null) return;

    dispatchProducts({type: 'edit', payload: verifiedEditedProduct});
  }

  async function handleAddToCart(productId: string) {
    let verifiedAddToCart = await addToCart(productId);
    if (verifiedAddToCart === null) return;

    dispatchProducts({type: 'edit', payload: verifiedAddToCart.product});

    dispatchCart({type: 'add', payload: verifiedAddToCart.item});
  }

  async function handleCheckout() {
    let result = await checkoutCart();
    if (result !== null) dispatchCart( {type: 'checkout', payload: null })
  }

  function handleSort(sortedProducts: Product[]) {
    dispatchProducts( { type: 'sort', payload: sortedProducts});
  }

  return (
    <>
      <CartHeader cart={cart} onCheckout={handleCheckout}/>
      <main>
        <ProductList products={products}
                     onAddToCart={handleAddToCart}
                     onDeleteProduct={handleDeleteProduct}
                     onEditProduct={handleEditProduct}
                     onSort={handleSort}/>
        <ToggleableAddProduct onAddProduct={handleAddProduct}/>
      </main>
    </>
  )
}

export default App

