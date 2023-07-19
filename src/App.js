import "./App.scss";
import axios, {get} from "axios";
import Card from "./components/Card";
import Header from './components/Header'
import Drawer from "./components/Drawer";
import {TotalProvider} from './components/totalContext';
import {useState, useEffect} from "react";
import {  Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Favorite from "./pages/Favorite";

function App() {
    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [cardOpened, setCartOpened] = useState(false)
    const [favorite, setFavorite] = useState([])
    useEffect(() => {
        axios.get('  http://localhost:8000/items').then((res)=>{
            setItems(res.data)
        })
        axios.get('  http://localhost:8000/cart').then((res)=>{
            setCartItems(res.data)
        })
        axios.get('  http://localhost:8000/favorite').then((res)=>{
            setFavorite(res.data)
        })
    }, []);
    const onAddToFavorite = (obj) => {
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
    };

    const onAddCart = (obj) => {
        axios.post('  http://localhost:8000/cart', obj)
        setCartItems((prev) => [...prev, obj])
    };
    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };
    const onRemoveItem = (id) =>{
        axios.delete(`  http://localhost:8000/cart/${id}`)
        setCartItems((prev) => prev.filter((item) => item.id !==id))
    }
    return (
        <TotalProvider>
            <div className="wrapper">
                {cardOpened && <Drawer onRemove={onRemoveItem} items={cartItems} onClose={() => setCartOpened(false)}/>}
                <Header
                    onClickCart={() => setCartOpened(true)}

                />
                <Routes>
                    <Route path="/" exact element={<Home searchValue={searchValue} setSearchValue={setSearchValue} onChangeSearchInput={onChangeSearchInput} items={items} onAddToFavorite={onAddToFavorite} onAddCart={onAddCart}/>} />
                    <Route path="/favorites" element={<Favorite onAddToFavorite={onAddToFavorite} items={favorite}/>}/>
                </Routes>
            </div>
        </TotalProvider>
    );
}

export default App;
