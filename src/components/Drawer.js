import React from "react";
import Info from "./Info";
import {AppContext} from "../App";
import axios from "axios";
import {useCart} from "../hooks/useCart";
function Drawer({onClose, onRemove, items=[],}) {
    const [isOrdered,setIsOrdered] = React.useState(false)
    const [IdOrder,setIdOrder] = React.useState(null)
    const [isLoading,setIsLoading] = React.useState(true)
    const {cartItems,setCartItems,totalPrice} = useCart()
    const onClickOrder =  async () => {
        try {
            const {data} = await axios.post('http://localhost:8000/orders' ,{
                items: cartItems
            })
            await axios.delete(`http://localhost:8000/cart/${data.items[0].id}`)
            console.log(data)
            setIsOrdered(true)
            setIdOrder(data.id)
            setCartItems([])
        } catch (error){
            alert('ошибка :/')
        }
    }


    return <div  className="overlay">
    <div className="drawer-father">
        <div className="drawer">
            <h2>
                Корзина
                <button className="removeButton" onClick={onClose}>
                    <img width={11} height={11} src="/img/cross.png" alt=""/>
                </button>
            </h2>
            {items.length > 0 ? (
                <>
                    <div className="items">
                        {items.map((obj) => (
                            <div key={obj.id} className="cartItem">
                                <img width={70} height={70} src={obj.imageUrl} alt="" />
                                <div className="card-box">
                                    <p>{obj.title}</p>
                                    <b>{obj.price} руб.</b>
                                </div>
                                <button className='removeButton' onClick={() =>onRemove(obj.id)}>
                                    <img src="/img/cross.png" alt="" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="cartTotalBlock">
                        <ul>
                            <li>
                                <span>Итого: </span>
                                <div></div>
                                <b>{totalPrice} руб. </b>
                            </li>
                            <li>
                                <span>Налог 5%: </span>
                                <div></div>
                                <b>{Math.round(totalPrice  * 0.05)} руб. </b>
                            </li>
                        </ul>
                        <button  onClick={onClickOrder} className="greenButtonArrowRight">
                            Оформить заказ
                            <img width={16} height={14} src="/img/right-arrow.png" alt="" />
                        </button>
                    </div>
                </>
            ) : (
                <Info
                    title={ isOrdered ? "Заказ оформлен!" : "Корзина пустая" }
                    description={isOrdered ? `Ваш заказ #${IdOrder} скоро будет передан курьерской доставке` :"Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                    image={isOrdered ? "/img/IsOrdered.svg" :"/img/drawerIsEmpty.png"}
                    onClose={onClose}
                />
            )}
        </div>
    </div>
    </div>
}
export default Drawer;