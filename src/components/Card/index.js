import React, { useContext, useState, useEffect } from 'react';
import styles from './Card.module.scss';
import ContentLoader from "react-content-loader";

function Card({ id, imageUrl, title, price, onFavorite, onPlus, favorited = false, added, loading }) {
    const [isButtonClicked, setIsButtonClicked] = useState(added);
    const [isFavorite, setIsFavorite] = useState(favorited);


    // Используем useEffect для обновления состояния isButtonClicked при изменении значения added
    useEffect(() => {
        setIsButtonClicked(added);
    }, [added]);

    const handleClick = () => {
        onPlus({ id, imageUrl, title, price });
        setIsButtonClicked(!isButtonClicked);
    };

    const onClickFavorite = () => {
        onFavorite({ id, imageUrl, title, price });
        setIsFavorite(!isFavorite);
    };

    return (
        <div className={styles.card}>
            {
                loading ? <ContentLoader
                        speed={2}
                        width={210}
                        height={260}
                        viewBox="0 0 210 260"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="30" y="36" rx="10" ry="10" width="150" height="90" />
                        <rect x="30" y="143" rx="3" ry="3" width="150" height="15" />
                        <rect x="30" y="162" rx="3" ry="3" width="93" height="15" />
                        <rect x="30" y="199" rx="8" ry="8" width="80" height="24" />
                        <rect x="148" y="191" rx="8" ry="8" width="32" height="32" />
                    </ContentLoader> :
                    <>
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
                </>
            }
        </div>
    );
}

export default Card;
