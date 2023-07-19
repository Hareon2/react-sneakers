import React, { useContext } from 'react';
import TotalContext from './totalContext';
import {Link} from "react-router-dom";

function Header(props) {
    const { total } = useContext(TotalContext);

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
                <span>{total}</span>
            </li>
            <Link to="/favorites">
            <li  className="headerRight__item">
            <span  className="headerRight__item-heart">
              <img width={20} height={20} src="/img/heart.svg" alt=""/>
            </span>
            </li>
            </Link>
            <li className="headerRight__item">
            <span  className="headerRight__item-user">
              <img width={20} height={20} src="/img/user.png" alt=""/>
            </span>
            </li>
        </ul>
    </header>
}
export default Header;