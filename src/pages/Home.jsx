import React from "react";
import { AppContext } from "../App";
import Card from "../components/Card";


import search from "../assets/img/search.svg"
import btn from "../assets/img/btn-remove.svg"



function Home({
  items,

  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading }) {

 

  const renderItems = () => {
    const filtredItems = items.filter(item =>
      item.title.toLowerCase().includes(searchValue.toLocaleLowerCase()),
    );
    return (isLoading ? [...Array(10)]
      : filtredItems).map((item, index) => (

        <Card
          key={index}
          onFavorite={(obj) => onAddToFavorite(obj)}
          onPlus={(obj) => onAddToCart(obj)}
       
          loading={isLoading}
          {...item}
        />
      )
      )
  }

  return (
    <div className="content">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'} </h1>
        <div className="search-block d-flex align-center">
          <img width={18} height={18} src={search} alt="Search" />

          {searchValue && (
            <img
              onClick={() => setSearchValue('')}
              className="clear cu-p" src={btn} alt="Clear" />)}


          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
        </div>
      </div>

      <div className="sneakers flex-wrap">


        {renderItems()}

      </div>

    </div >
  )
}

export default Home;