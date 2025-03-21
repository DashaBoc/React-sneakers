import React from 'react';
import styles from './Card.module.scss'

function Card({onFavorite, title, imageUrl, price, onPlus}) {

    const [isAdded, setIsAdded] = React.useState(false);
const onClickPlus = () => {
    onPlus({title, imageUrl, price});
    setIsAdded(!isAdded)

}

    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onFavorite}>
                <img width={32} height={32} src="/img/heart-unliked.svg" alt="Unliked" />
            </div>

            <img width={133} height={112} src={imageUrl} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column ">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>

                <img 
                className={styles.plus}
                onClick={onClickPlus} width={16} height={16} 
                src={isAdded ? "/img/btn-checked.svg"  : "/img/plus.svg" } 
                alt="Plus" />

            </div>
        </div >

    );
}
export default Card;