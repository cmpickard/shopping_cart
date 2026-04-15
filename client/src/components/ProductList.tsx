import { useState } from "react";
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
  onAddToCart: (productId: string) => Promise<void>,
  onSort: (sortedProducts: {
    _id: string;
    title: string;
    price: number;
    quantity: number;
}[]) => void
}

type SortOptions = 'name' | 'price' | 'quantity';

function sort(prev: Product[], action: SortOptions) {
  switch (action) {
    case 'name': {
      return [...prev].sort((a, b) => {
        let nameA = a.title.toUpperCase();
        let nameB = b.title.toUpperCase();
        if (nameA > nameB) {
          return 1;
        } else if (nameB > nameA) {
          return -1;
        } else {
          return 0;
        }
      });
    } case 'price': {
      return [...prev].sort((a, b) => a.price - b.price);
    } case 'quantity': {
      return [...prev].sort((a, b) => a.quantity - b.quantity);
    }
  }
}

function ProductList({products, onDeleteProduct, onEditProduct, onAddToCart, onSort}: ProductListProps) {
  const [activeSort, setActiveSort] = useState<SortOptions | null>(null);

  function handleSort(option: SortOptions) {
    setActiveSort(option);
    onSort(sort(products, option));
  }

  return (
    <div className="product-listing">
      <div className="product-listing-header">
      <h2>Products</h2>
      <div className="sort-controls">
        <span>Sort by:</span>
        <button className={`sort-btn${activeSort === 'name' ? ' active' : ''}`} onClick={() => handleSort('name')}>
          Name {activeSort === 'name' ? '↑' : ''}
        </button>
        <button className={`sort-btn${activeSort === 'price' ? ' active' : ''}`} onClick={() => handleSort('price')}>
          Price
        </button>
        <button className={`sort-btn${activeSort === 'quantity' ? ' active' : ''}`} onClick={() => handleSort('quantity')}>
          Quantity
        </button>
      </div>
      </div>
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
