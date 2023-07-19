import React, {useContext, useState,useEffect} from 'react';
import TotalContext from '../totalContext';
import styles from './Card.module.scss'

function Card({id,imageUrl,title,price,onFavorite,onPlus,favorited = false}) {
    const {setTotal} = useContext(TotalContext);
    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const [isFavorite, setIsFavorite] = useState(favorited)

    const handleClick = () => {
        onPlus({id,imageUrl,title,price});
        isButtonClicked ?
            setTotal(prevTotal => prevTotal - Number(price))
            :
            setTotal(prevTotal => prevTotal + Number(price));

        setIsButtonClicked(!isButtonClicked)
    };
const onClickFavorite = () => {
    onFavorite({id,imageUrl,title,price})
    setIsFavorite(!isFavorite)
}

    return (
        <div className={styles.card}>
            <div className={styles.card__objects}>
                <div className={isFavorite ? styles.favorite : styles.unfavorite}>
                    <img onClick={onClickFavorite}  src={isFavorite ? "/img/heart-liked.svg" :"/img/heart-unliked.png" }/>
                </div>
                <img height={112} width={133} src={imageUrl} alt=""/>
                <p>{title}</p>
                <div className={styles.card__info}>
                    <div className={styles.card__price}>
                        <span>ЦЕНА:</span>
                        <b>{price} руб.</b>
                    </div>
                    <button
                        className={isButtonClicked ? styles.buttonClicked : styles.button}
                        onClick={handleClick}
                    >
                        <img width={11} height={11} src={isButtonClicked ? "/img/checked.png" : "/img/plus.png"}
                             alt=""/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;
