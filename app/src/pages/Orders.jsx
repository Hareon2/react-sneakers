import Card from "../components/Card";
import {AppContext} from "../App";
import React from 'react'
import axios from "axios";
import Emoji from "../components/Emoji";
function Orders() {
    const { onAddToFavorite, cartItems, onAddCart } = React.useContext(AppContext);
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const getBack = () =>{
        window.history.back();
    }

    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('http://192.168.0.105/api/orders');
                setOrders(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Ошибка при получении данных заказов:', error);
            }
        })();
    }, []);

    const handleDeleteOrder = async (orderId) => {
        try {
            console.log(orderId)
            await axios.delete(`http://192.168.0.105/api/orders/${orderId}`);
            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
        } catch (error) {
            console.error('Ошибка при удалении заказа:', error);
        }
    };

    return (
        <div className="content">
            {orders.length > 0 && (
                <div className="all-sneakers">
                    <h1>Мои заказы</h1>
                </div>
            )}

            {orders.map((order) => (
                <div className='ordersCart' key={order.id}>
                    <h2>Заказ #{order.id}</h2>
                    <button className='removeButton' onClick={() => handleDeleteOrder(order.id)}>
                        <img src="/img/cross.png" alt=""/>
                    </button>
                    <div className="Sneakers">
                        {order.items.map((item) => (
                            <Card
                                id={item.id}
                                key={item.id}
                                title={item.title}
                                price={item.price}
                                imageUrl={item.imageUrl}
                                loading={isLoading}
                            />
                        ))}
                    </div>
                </div>
            ))}
            {orders.length === 0 &&
            <Emoji
                title={   "У вас нет заказов" }
                description={ "Вы нищеброд?"}
                description2={"Оформите хотя бы один заказ."}
                image={ "/img/emojiSad2.svg"}
                getBack={getBack}
            />}
        </div>
    );
}

export default Orders;

