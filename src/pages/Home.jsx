import Card from "../components/Card";

function Home  ({searchValue,setSearchValue,onChangeSearchInput,items,onAddToFavorite,onAddCart})  {
    return <div className="content">
        <div className="all-sneakers">
            <h1>{searchValue ? `Поиск по запросу "${searchValue}"` : 'Все кроссовки'}</h1>
            <div className="search-block">
                <img src="/img/searc-icon.jpg" alt=""/>
                {searchValue && <img onClick={() => setSearchValue('')} className="clear" width={11} height={11} src="/img/cross.png" alt=""/>}
                <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."
                       maxLength='30'/>
            </div>
        </div>

        <div className="Sneakers">
            {items
                .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
                .map((obj, index) => (
                    <Card
                        id={obj.id}
                        key={index}
                        title={obj.name}
                        price={obj.price}
                        imageUrl={obj.imageUrl}
                        onFavorite={(obj) => onAddToFavorite(obj) }
                        onPlus={(obj) => onAddCart(obj)}
                    />
                ))}
        </div>
    </div>
}
export default Home;