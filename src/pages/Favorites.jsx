import React from "react";
import Card from "../components/Card";
import { AppContext } from "../App";


function Favorites() {
  const {favorites, onAddToFavorite} = React.useContext(AppContext)
    return (
        <div className="content">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои закладки </h1>
            </div>

            <div className="sneakers flex-wrap">
            {favorites
              .map((item, index) =>

              <Card
                key={index}
                favorited={true}
                onFavorite={onAddToFavorite}
                {...item}
              />
            )}
            </div>

        </div >
    )
}

export default Favorites;