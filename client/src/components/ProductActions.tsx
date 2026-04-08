import type { SyntheticEvent } from "react";
import findProductIdx from "../utilities/findProductIdx";
import type { CartProduct, Cart, Product } from "../types";

interface ProductActionsProps {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  products: Array<Product>,
  product: Product,
  setCart: React.Dispatch<React.SetStateAction<Cart>>,
  cart: Cart,
  setViewEdit: React.Dispatch<React.SetStateAction<boolean>>
}

 function ProductActions({product, setProducts, setCart, setViewEdit}: ProductActionsProps) {
  function handleAddToCart(event: SyntheticEvent) {
    event.preventDefault();

    if (product.quantity <= 0) return;

    setProducts((prev) => {
      let prodIndex = findProductIdx(prev, product);
      let updatedProducts = [...prev];
      updatedProducts[prodIndex] = { 
        ...updatedProducts[prodIndex],
        quantity: updatedProducts[prodIndex].quantity - 1 };
      return updatedProducts;
    });

    setCart((prev) => {
      let updatedCart = [...prev];
      let cartIndex = findProductIdx(prev, product);
      let newCartProd: CartProduct = { _id: product._id, title: product.title,
        price: product.price, quantityInCart: 1 };

      if (cartIndex === -1) {
        updatedCart.push(newCartProd);
      } else {
        updatedCart[cartIndex] = {
          ...updatedCart[cartIndex],
          quantityInCart: updatedCart[cartIndex].quantityInCart + 1
        };
      }
      return updatedCart
    });
  }

  function handleDeleteProduct(event: SyntheticEvent) {
    event.preventDefault();

    setProducts((prev) => {
      return prev.filter(prod => prod._id !== product._id);
    });
  }

  function handleOpenEdit(event: SyntheticEvent) {
    event.preventDefault();
    setViewEdit(true);
  }

  return (
    <>
      <div className="actions product-actions">
        <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
        <button className="edit" onClick={handleOpenEdit}>Edit</button>
      </div>
      <div className="product">
        <button className="delete-button" onClick={handleDeleteProduct}><span>X</span></button>
      </div>
    </>
  );
}

export default ProductActions;

