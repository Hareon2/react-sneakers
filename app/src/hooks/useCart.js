import React from "react";
import {AppContext} from "../App";
export const useCart = () => {
    const {cartItems,setCartItems} = React.useContext(AppContext)
    const totalPrice = cartItems.reduce((sum, obj) => sum + Number(obj.price), 0)

    return {cartItems,setCartItems,totalPrice}
}