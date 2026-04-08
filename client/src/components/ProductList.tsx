import type { Product, Cart } from "../types";
import InteractableProduct from "./InteractableProduct";

interface ProductListProps {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  products: Array<Product>,
  setCart: React.Dispatch<React.SetStateAction<Cart>>,
  cart: Cart
}

function ProductList({setProducts, products, setCart, cart}: ProductListProps) {
  // for (let prop in products[0]) {
  //   console.log(`${prop}: `, products[0][prop]);
  // }
  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map(product => {
          return <li key={product._id}>
                    <InteractableProduct setProducts={setProducts}
                                 products={products}
                                 product={product}
                                 setCart={setCart}
                                 cart={cart}/>
                  </li>
        })}
      </ul>
    </div>
  );
}

export default ProductList;

