import type { Product } from "../types";
import InteractableProduct from "./InteractableProduct";

interface ProductListProps {
  products: Array<Product>,
  onDeleteProduct: (productId: string) => Promise<void>,
  onEditProduct: (productId: string, editedProduct: {
    title: string;
    price: number;
    quantity: number;
  }) => Promise<void>,
  onAddToCart: (productId: string) => Promise<void>
}

function ProductList({products, onDeleteProduct, onEditProduct, onAddToCart}: ProductListProps) {
  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map(product => {
          return <li key={product._id}>
                    <InteractableProduct product={product}
                                         onEditProduct={onEditProduct}
                                         onDeleteProduct={onDeleteProduct}
                                         onAddToCart={onAddToCart}/>
                 </li>
        })}
      </ul>
    </div>
  );
}

export default ProductList;

