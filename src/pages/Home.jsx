import Card from "../components/Card";
import favorite from "./Favorite";

function Home  ({favorite,isLoading,cartItems,searchValue,setSearchValue,onChangeSearchInput,items,onAddToFavorite,onAddCart})  {
    const renderItems = () => {
        const filteredItems = items.filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase()))

        return(isLoading ? Array.from({ length: 10 }, () => []) : filteredItems)
            .map((obj, index) => (
                <Card
                    id={obj.id}
                    key={index}
                    title={obj.name}
                    price={obj.price}
                    imageUrl={obj.imageUrl}
                    onFavorite={(obj) => onAddToFavorite(obj) }
                    added={cartItems.some((item) => item.id === obj.id)}
                    favorited={favorite.some((item) => item.id === obj.id)}
                    loading={isLoading}
                    onPlus={(obj) => onAddCart(obj)}
                />
            ))
    }
    return <div className="content">
        <div className="all-sneakers">
            <h1>{searchValue ? `Поиск по запросу "${searchValue}"` : 'Все кроссовки'}</h1>
            <div className="search-block">
                <img src="/img/searc-icon.jpg" alt=""/>
                {searchValue && <img onClick={() => setSearchValue('')} className="clear" width={11} height={11} src="/img/cross.png" alt=""/>}
                <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."
                       maxLength='28'/>
            </div>
        </div>
        <div className="Sneakers">
            {renderItems()}
        </div>
    </div>
}
export default Home;