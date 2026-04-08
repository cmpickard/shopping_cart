import { useState, useEffect } from 'react';
// import mockData from './data/mockData.js'
import type { Product, Cart, NewProduct } from './types/index.ts'
import CartHeader from './components/CartHeader.tsx';
import ProductList from './components/ProductList.tsx';
import ToggleableAddProduct from './components/ToggleAddProduct.tsx';
import './stylesheets/main.css'
import { createProduct, fetchAllProducts } from './services/services.tsx';
import { ProductListSchema, ProductSchema } from './types/index.ts';

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

  useEffect(getAllProductsOrchestrator, []);

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
    } catch (e: Error | unknown) {
      console.error(e);
    }
  }

  return (
    <>
      <CartHeader cart={cart}/>
      <ProductList products={products}
                   setProducts={setProducts}
                   setCart={setCart}
                   cart={cart}/>
      <ToggleableAddProduct onAddProduct={handleAddProduct}/>
    </>
  )
}

export default App
