import React from "react";
import {AppContext} from "../App";
function Emoji({title,description,image,getBack,description2}) {
    return <div className="favoriteEmpty">
        <img  width={70} height={70} src={image} alt="" />
        <h2>{title}</h2>
        <p>{description} <br /> {description2}</p>
        <button onClick={getBack} className="greenButtonArrowLeft">
            <img  src="/img/left-arrow.png" alt="" />
            Вернуться назад
        </button>
    </div>
}
export default Emoji