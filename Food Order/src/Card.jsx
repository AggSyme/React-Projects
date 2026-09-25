import { useState } from "react";

export default function Card(props){
    
    return(
    <div className="meal-item">
        <img src={`http://localhost:3000/${props.data.image}`} alt={props.data.description}/>
        <h3>{props.data.name}</h3>
        <p className="meal-item-price">{props.data.price}</p>
        <p className="meal-item-description">{props.data.description}</p>
        <button className="button" onClick={() => props.addMealToCart({...props.data, quantity: 1})}>Add to cart</button>
    </div>
    );
}