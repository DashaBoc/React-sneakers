import React from "react";
import Info from "../info";


import axios from "axios";
import { useCart } from "../../hooks/useCart";

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice} = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  


  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`https://67dfc5e57635238f9aaaaa1a.mockapi.io/orders`, {
        items: cartItems,
      });
     

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`https://67d90b0300348dd3e2a92958.mockapi.io/cart/` + item.id)
        await delay(1000);
      }
      setOrderId(data.id);
      setOrderComplete(true);
      setCartItems([]);


    } catch (error) {
      alert('Не удалось создать заказ:(')
    }
    setIsLoading(false);
  }
  
  return (

    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Кoрзина
          <img onClick={onClose} className="removeBtn2 cu-p" src="/img/btn-remove.svg" alt="Close" /></h2>


        {
          items.length > 0 ?
            (<div className="d-flex flex-column flex">
              <div className="items flex">
                {
                  items.map((obj) => (
                    <div className="cartItem d-flex align-center mb-20 ">
                      <div style={{ backgroundImage: `url(${obj.imageUrl})` }}
                        className="cartItemImg"></div>

                      <div className="mr-20 flex">
                        <p className="mb-5">{obj.title} </p>
                        <b> {obj.price} руб.</b>
                      </div>
                      <img onClick={() => onRemove(obj.id)} className="removeBtn" width={18} height={18} src="/img/remove2.svg" alt="Remove" />
                    </div>

                  ))
                }
              </div>

              <div className="cartTotalBlock">
                <ul >
                  <li >
                    <span>Итого:</span>
                    <div></div>
                    <b>{totalPrice} руб.</b>
                  </li>
                  <li >
                    <span>Налог 5%: </span>
                    <div></div>
                    <b>{Math.round(totalPrice / 100 * 5)} руб.</b>
                  </li>
                </ul>
                {!isLoading? <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                  Оформить заказ<img width={18} height={18} src="/img/arrow.svg" alt="Arrow" />
                </button> : "Loading..."}
              </div></div>) : (
              <Info
                title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
                description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                image={isOrderComplete ? "/img/complite-order.svg" : "/img/emptybox.svg"}
              />
            )

        }



      </div>
    </div>
  );
}

export default Drawer;
