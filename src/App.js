import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router";
import axios from 'axios'
import Home from './pages/Home';
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

export const AppContext = React.createContext({})

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setIsFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {

    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://67d90b0300348dd3e2a92958.mockapi.io/cart'),
          axios.get('https://67dfc5e57635238f9aaaaa1a.mockapi.io/favorites'),
          axios.get('https://67d90b0300348dd3e2a92958.mockapi.io/items')
        ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setIsFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных:(')
      }
    }

    fetchData();

  }, []);


  const onAddToCart = async (obj) => {

    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://67d90b0300348dd3e2a92958.mockapi.io/cart/${findItem.id}`)
      } else {
        const {data} = await axios.post('https://67d90b0300348dd3e2a92958.mockapi.io/cart', obj);
        setCartItems(prev => [...prev, data])
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину:(')
    }

  };

  const onRemoveItem = async (id) => {

    try {
      axios.delete(`https://67d90b0300348dd3e2a92958.mockapi.io/cart/${id}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)))
    } catch (error) {
      alert('Ошибка при удалении из корзины:(')
    }

  }
  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://67dfc5e57635238f9aaaaa1a.mockapi.io/favorites/${obj.id}`)
        setIsFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));

      } else {
        const { data } = await axios.post(`https://67dfc5e57635238f9aaaaa1a.mockapi.io/favorites`, obj);
        setIsFavorites(prev => [...prev, data])
      }

    } catch (error) {
      alert('Не удалось добавить в избранное')
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }
  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCart, setCartOpened, setCartItems }}>
      <div className="wrapper clear">
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />}
            exact
          />
          <Route path="/favorites"
            element={
              <Favorites />}
            exact
          />

          <Route path="/orders"
            element={
              <Orders />}
            exact
          />
        </Routes>


      </div >
    </AppContext.Provider>
  );
}

export default App;
