import Card from "../components/Card";
import {AppContext} from "../App";
import React from 'react'
function Favorite  ()  {
    const {favorite, onAddToFavorite} = React.useContext(AppContext)

    return <>
        {favorite.length > 0 ? <div className="content">
            <div className="all-sneakers">
                <h1> Мои закладки</h1>
            </div>

            <div className="Sneakers">

                {
                    favorite
                        .map((obj, index) => (
                            <Card
                                key={index}
                                title={obj.title}
                                price={obj.price}
                                imageUrl={obj.imageUrl}
                                onFavorite={ onAddToFavorite}
                                id={obj.id}
                                favorited={true}
                            />
                        ))}
            </div>
        </div>
            :
            <>

            </>}
    </>
}
export default Favorite;