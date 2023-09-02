import "./App.scss";
import axios, {get} from "axios";
import Card from "./components/Card";
import Header from './components/Header'
import Index from "./components/Drawer";
import {useState, useEffect, useContext} from "react";
import {  Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Favorite from "./pages/Favorite";
import React from "react";
import Orders from "./pages/Orders";
import Drawer from "./components/Drawer";
export const AppContext = React.createContext({})

function App() {
    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [cardOpened, setCartOpened] = useState(false)
    const [favorite, setFavorite] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    if(cardOpened ===true){
        document.body.style.overflow = 'hidden';
    } else{
        document.body.style.overflow = 'visible';
    }
    useEffect(() => {
        const fetchData = async () => {
            try{
                setIsLoading(true);
                const[cartResponce,itemsResponce,favoritesResponce] = await Promise.all([
                    axios.get('http://localhost:8000/cart'),
                    axios.get('http://localhost:8000/items'),
                    axios.get('http://localhost:8000/favorite'),
                ])
                setTimeout(() => {
                    setIsLoading(false);
                    setCartItems(cartResponce.data);
                    setFavorite(favoritesResponce.data);
                    setItems(itemsResponce.data);
                    console.log(cartItems)
                }, 500);
            }catch (error){
                alert('ошибка не удалось получить данные, запустите db.json сервер на порту 8000')
            }

        };

        fetchData();
    }, []);
    const onAddToFavorite = (obj) => {
        console.log(obj)
        try {
            const favoriteIndex = favorite.findIndex((favObj) => favObj.id === obj.id);
            if (favoriteIndex !== -1) {
                // Товар уже есть в избранном, удаляем его
                axios.delete(`http://localhost:8000/favorite/${obj.id}`).then(() => {
                    setFavorite((prev) => prev.filter((item) => item.id !== obj.id));
                });
            } else {
                // Товара нет в избранном, добавляем его
                axios.post("http://localhost:8000/favorite", obj).then(() => {
                    setFavorite((prev) => [...prev, obj]);
                });
            }
        }catch {
            alert('Не удалось добавить в избранное')
        }

    };

    const onAddCart = (obj) => {
        if (cartItems.find((item) => item.id === obj.id)){
            axios.delete(`http://localhost:8000/cart/${obj.id}`)
            setCartItems((prev) => prev.filter((item) => item.id !== obj.id))
        } else{
            axios.post('  http://localhost:8000/cart', obj)
            setCartItems((prev) => [...prev, obj])
        }
    };
    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };
    const onRemoveItem = (id) => {
        axios.delete(`http://localhost:8000/cart/${id}`);
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };
    return (
        <AppContext.Provider value={{
            cartItems,
            items,
            favorite,
            onAddCart,
            onAddToFavorite,
            setCartItems
        }}>
            <div className="wrapper">
                {cardOpened && <Drawer
                     onRemove={onRemoveItem}
                     items={cartItems}
                     opened={cardOpened}
                     onClose={() => setCartOpened(false)}/>}
                <Header
                    onClickCart={() => setCartOpened(true)}
                />
                <Routes>
                    <Route path="/" exact element={
                        <Home
                            favorite={favorite}
                            isLoading={isLoading}
                            onRemove={onRemoveItem}
                            cartItems={cartItems}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            onChangeSearchInput={onChangeSearchInput}
                            items={items}
                            onAddToFavorite={onAddToFavorite}
                            onAddCart={onAddCart}/>}
                    />
                    <Route path="/favorites" element={<Favorite/>}/>
                    <Route path ="/orders" element={<Orders/>}/>


                </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
