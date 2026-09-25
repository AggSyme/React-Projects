import { forwardRef } from "react";

const Checkout = forwardRef(function Checkout(props, ref) {

    function submitForm(formData){
        const customer = Object.fromEntries(formData.entries());
        console.log(customer);
        fetch('http://localhost:3000/orders', {
                method: 'POST',
                body: JSON.stringify({              
                    "order": {
                        "items": props.mealsInCart,
                        "customer": customer
                    }
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(resData => {
                console.log(resData);
            })
            .catch((error) => console.log(error))
        //props.buy();
    }
    return(
        <dialog className="modal" ref={ref}>
            <form action={submitForm}>
                <h2>Checkout</h2>
                <p>Total Amount: {props.calculatePrice()}$ </p>
                <label className="control">
                    Full Name:
                    <input type="text" name="name" required/>
                </label>
                
                <label className="control">
                    Email Adress:
                    <input type="email" name="email" />
                </label>
                
                <label className="control strong">
                    Street:
                    <input type="text" name="street" required/>   
                </label>
                <div className="control-row">
                    <label className="control">
                        Postal Code:
                        <input type="text" name="postal-code" maxLength={5} onInput={(e) => {e.target.value = e.target.value.replace(/\D/g, '');}} required/>
                    </label>
                    <label className="control">
                        City:
                        <input type="text" name="city" required/>
                    </label>
                </div>
                <div className="modal-actions">
                    <form method="dialog">
                        <button className="text-button">Close</button>
                    </form>
                    <button className="button" type="submit">Submit Order</button>
                </div>
            </form>

        </dialog>
    );
});
export default Checkout;
