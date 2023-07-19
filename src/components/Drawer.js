import TotalContext from './totalContext';
import {useContext} from "react";
function Drawer({onClose, onRemove, items=[]}) {
    const { total } = useContext(TotalContext);
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
                <div>
                    <div className="items">
                        {items.map((obj) => (
                            <div className="cartItem">
                                <img width={70} height={70} src={obj.imageUrl} alt="" />
                                <div className="card-box">
                                    <p>Мужские Кроссовки Nike Air Max 270</p>
                                    <b>{obj.price} руб.</b>
                                </div>
                                <button className='removeButton' onClick={() => onRemove(obj.id)}>
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
                                <b>{total} руб. </b>
                            </li>
                            <li>
                                <span>Налог 5%: </span>
                                <div></div>
                                <b>1074 руб. </b>
                            </li>
                        </ul>
                        <button className="greenButtonArrowRight">
                            Оформить заказ
                            <img width={16} height={14} src="/img/right-arrow.png" alt="" />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="cartEmpty">
                    <img width={120} height={120} src="/img/drawerIsEmpty.png" alt="" />
                    <h2>Корзина пустая</h2>
                    <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                    <button onClick={onClose} className="greenButtonArrowLeft">
                        <img src="/img/left-arrow.png" alt="" />
                        Вернуться назад
                    </button>
                </div>
            )}
        </div>
    </div>
    </div>
}
export default Drawer;