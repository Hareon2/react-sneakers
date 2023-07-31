import React  from 'react';
import { Link } from 'react-router-dom';
import {AppContext} from "../App";
import {useCart} from "../hooks/useCart";

function Header(props) {
    const {totalPrice} = useCart()
    return <header className="header">
        <div className="headerLeft">
          <span className="header-img">
            <img height={40} width={40} src="/img/logo.png" alt=""/>
          </span>
            <div className="headerInfo">
                <Link to="/">
                    <div className="headerInfo__title">REACT SNEAKERS</div>
                </Link>
                <div className="headerInfo__text">Магазин лучших кроссовок</div>
            </div>
        </div>
        <ul className="headerRight">
            <li onClick={props.onClickCart} className="headerRight__item">
                <img width={20} height={20} src="/img/box.png" alt=""/>
                <span>{totalPrice} руб.</span>
            </li>
            <Link to="/favorites">
            <li  className="headerRight__item">
            <span  className="headerRight__item-heart">
              <img width={20} height={20} src="/img/heart.svg" alt=""/>
            </span>
            </li>
            </Link>
            <Link to="/orders">
            <li className="headerRight__item">
            <span  className="headerRight__item-user">
              <img width={20} height={20} src="/img/user.png" alt=""/>
            </span>
            </li>
            </Link>
        </ul>
    </header>
}
export default Header;