import React from 'react'
import { AppContext } from '../App';

import box from "../assets/img/complite-order.svg"

const Info = ({title, image, description}) => {
    const {setCartOpened} = React.useContext(AppContext);
    return (

        <div className="cartEmpty d-flex align-center justify-center flex-column flex " >
            <img className="mb-20" width="120px" src={box} alt="box" />
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            <button onClick={() => setCartOpened(false)} className="greenButton">
                Вернуться назад
            </button>
        </div>

    )
}


export default Info;