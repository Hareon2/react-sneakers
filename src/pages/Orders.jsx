import Card from "../components/Card";
import {AppContext} from "../App";
import React from 'react'
import axios from "axios";
function Orders ()  {
const [orders,setOrders] = React.useState([])
    return <>
        { <div className="content">
                <div className="all-sneakers">
                    <h1> Мои заказы</h1>
                </div>

                <div className="Sneakers">

                    {
                        []
                            .map((obj, index) => (
                                <Card
                                />
                            ))}
                </div>
            </div>
            }
    </>
}
export default Orders;