import type { Cart } from "../types";

interface CartListProps {
  cart: Cart,
  onCheckout: () => Promise<void>
}

function CartList({ cart, onCheckout }: CartListProps) {
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  })

  return (
    <>
      <table className="cart-itesm">
        <thead>
          <tr>
            <th scope="col">Title</th><th scope="col">Quantity</th><th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => {
            return <tr key={item._id}>
                      <td>{item.title}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                   </tr>
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="total">Total: ${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <div className="checkout-button">
          <button className="checkout"
                  onClick={() => onCheckout()}>
            Checkout
          </button>
      </div>
    </>
  );
}

export default CartList;

{/*
<table class="cart-items">
  <tbody>
    <tr>
      <td>Amazon Kindle E-reader</td>
      <td>2</td>
      <td>$79.99</td>
    </tr>
    <tr>
      <td>Apple 10.5-Inch iPad Pro</td>
      <td>1</td>
      <td>$649.99</td>
    </tr>
  </tbody>

</table> */}