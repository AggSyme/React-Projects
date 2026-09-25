import { useEffect, useState } from "react";
import Card from "./Card";
import { useFetchData } from "./useFetchData";
export default function Cards(props){

    
    const data = useFetchData();


    function addMealsToCart(data){
        
        props.addMealsToCart((previousMeals) => {
            const newCart = [];
            let flag = false;
            previousMeals.some((meal) => {
                if(meal.data.id === data.id){
                    meal.data.quantity+=1;
                    flag=true;
                }
                newCart.push(meal);
            })
            if(!flag){
                return [...previousMeals, {data}];
            }
            else{
                return newCart;
            }
        });
    }

    return (
        <div id="meals">
            {data.map((item, key) => 
            (
                <Card data={item} key={key} addMealToCart={addMealsToCart}/>
            )
            )}
        </div>
    );
}