import EditProduct from "./EditProduct";
import type { Product, Cart } from "../types";
import { useState } from "react";
import ProductActions from "./ProductActions";
import ProductItem from "./ProductItem";

interface InteractableProductProps {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  products: Array<Product>,
  product: Product,
  setCart: React.Dispatch<React.SetStateAction<Cart>>,
  cart: Cart
}


function InteractableProduct({setProducts, product, products, setCart, cart}: InteractableProductProps) {
  const [viewEdit, setViewEdit] = useState(false)

  return (
    <div className="product-details">
      <ProductItem product={product}/>
      <ProductActions setViewEdit={setViewEdit}
                      product={product}
                      cart={cart}
                      products={products}
                      setProducts={setProducts}
                      setCart={setCart} />

      {viewEdit ? <EditProduct products={products} 
                               setProducts={setProducts}
                               product={product}
                               setViewEdit={setViewEdit}/>
                : <></>}
    </div>
  );
}

export default InteractableProduct