import React from "react";
import {AppContext} from "../App";
function Info({title,description,image,onClose}) {
    return <div className="cartEmpty">
        <img width={120} height={120} src={image} alt="" />
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={onClose} className="greenButtonArrowLeft">
            <img src="/img/left-arrow.png" alt="" />
            Вернуться назад
        </button>
    </div>
}
export default Info