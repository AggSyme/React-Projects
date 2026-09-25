import { useRef, useState } from "react";
import Cards from "./Cards";
import img from './assets/logo.jpg';
import Cart from "./cart";
import Checkout from "./Checkout";

function App() {
  const cartRef= useRef();
  const checkoutRef= useRef();
  const [mealsInCart, setMealsInCart] = useState([]);
  
  function openModal(ref){
    ref.current.showModal();
  }

  function buy(){
    checkoutRef.current.close();
    setMealsInCart([]);
  }

  function changeQuantityBy(id, quantity){
    const newCart = [];
    mealsInCart.some((meal) => {
        if(meal.data.id === id){
            meal.data.quantity+=quantity;
        }
        if(meal.data.quantity>0){
          newCart.push(meal);
        }
    })
    setMealsInCart(newCart);
  }

  function calculatePrice(){
    let total=0;
    mealsInCart.map((item) => {total+=item.data.price*item.data.quantity});
    return total;
  }
  
  return (
    <>
    <header id="main-header">
      <img src={img} alt="Logo"/>
      <button className={mealsInCart.length === 0 ? "disabled-button" : "button"} disabled={mealsInCart.length === 0} onClick={() => openModal(cartRef)}> Cart ({mealsInCart.length}) </button>
    </header>
      <Cards addMealsToCart={setMealsInCart} />
      <Cart ref={cartRef} mealsInCart={mealsInCart} changeQuantityBy={changeQuantityBy} openCheckout={() => openModal(checkoutRef)}/>
      <Checkout ref={checkoutRef} mealsInCart={mealsInCart} calculatePrice={calculatePrice} buy={buy}/>
    </>
  );
}

export default App;
