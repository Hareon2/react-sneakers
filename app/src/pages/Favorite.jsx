import Card from "../components/Card";
import {AppContext} from "../App";
import React from 'react'
import Info from "../components/Info";
import { useHistory } from 'react-router-dom';
import Emoji from "../components/Emoji";
function Favorite  ()  {

    const getBack = () => {
        window.history.back();
    };
    const {favorite, onAddToFavorite} = React.useContext(AppContext)

    return (
        <div className="content">
            {favorite.length > 0 ? (
                <div className="all-sneakers">
                    <h1>Мои закладки</h1>
                </div>
            ) : null}

            <div className="Sneakers">
                {favorite.length > 0 ? (
                    favorite.map((obj, index) => (
                        <Card
                            key={index}
                            title={obj.title}
                            price={obj.price}
                            imageUrl={obj.imageUrl}
                            onFavorite={onAddToFavorite}
                            id={obj.id}
                            favorited={true}
                        />
                    ))
                ) : (
                    <Emoji
                        title={   "Закладок нет :(" }
                        description={ "Вы ничего не добавляли в закладки"}
                        image={ "/img/emojiSad.svg"}
                        getBack={getBack}
                    />
                )}
            </div>
        </div>
    );

}
export default Favorite;