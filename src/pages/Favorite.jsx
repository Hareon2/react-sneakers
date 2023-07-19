import Card from "../components/Card";

function Favorite  ({items,onAddToFavorite})  {
    return <div className="content">
        <div className="all-sneakers">
            <h1> Мои закладки</h1>
        </div>

        <div className="Sneakers">
            {items
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
}
export default Favorite;