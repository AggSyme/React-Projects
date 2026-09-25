import { forwardRef } from "react";

const Cart = forwardRef(function Cart(props, ref){
    let total = 0;
    return(
        <dialog className="modal" ref={ref}>
            <h2>Your Cart</h2>
            {props.mealsInCart.map((item, key) => {
                total += item.data.quantity*item.data.price;
                return <li className="cart-item" key={key}>
                    <p>{item.data.name} - {item.data.quantity} x {item.data.price}</p>
                    <div className="cart-item-actions">
                        <button onClick={() => props.changeQuantityBy(item.data.id, -1)}>-</button>
                        <p>{item.data.quantity}</p>
                        <button onClick={() => props.changeQuantityBy(item.data.id, 1)}>+</button>
                    </div>
                </li>
            })}
            <p className="cart-total">{total.toFixed(2)}</p>
            <form method="dialog" className="modal-actions">
                <button className="text-button">Close</button>
                <button className="button" onClick={props.openCheckout}>Go to Checkout</button>
            </form>
        </dialog>
    );
});
export default Cart;