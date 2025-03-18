import React from 'react'
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";



function App() {
  const [items, setItems] = React.useState([]);
  const [cartitems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);


  React.useEffect(() => {
    fetch('https://67d90b0300348dd3e2a92958.mockapi.io/items')
      .then(res => {
        return res.json();
      })
      .then(json => {
        setItems(json);
      });
  }, []);


  const onAddToCart = (obj) => {
    setCartItems(prev => [...prev, obj])
  };

  console.log(cartitems)

  return (
    <div className="wrapper clear">
      {cartOpened ? <Drawer items={cartitems} onClose={() => setCartOpened(false)} /> : null}
      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content">
        <div className="d-flex align-center justify-between mb-40">  <h1>Все кроссовки</h1>
          <div className="search-block d-flex align-center">
            <img width={18} height={18} src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="sneakers flex-wrap">


          {items.map((item) =>
            <Card
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={() => console.log("Нажали на избранное")}
              onPlus={(obj) => onAddToCart(obj)}
            />
          )}

        </div>

      </div >
    </div >
  );
}

export default App;
