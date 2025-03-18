function Drawer({onClose, items=[]}) {
    return (

        <div className="overlay">
        <div className="drawer">
          <h2 className="d-flex justify-between mb-30">
            Кoрзина  
            <img onClick={onClose} className="removeBtn2 cu-p" src="/img/btn-remove.svg" alt="Close" /></h2>

          <div className="items">
            {
            items.map((obj) => (
              <div className="cartItem d-flex align-center mb-20 ">
              <div style={{ backgroundImage: `url(${obj.imageUrl})`}}
                className="cartItemImg"></div>

              <div className="mr-20 flex">
                <p className="mb-5">{obj.title} </p>
                <b> {obj.price} руб.</b>
              </div>
              <img className="removeBtn" width={18} height={18} src="/img/remove2.svg" alt="Remove" />
            </div>
 
            ))
            }
            </div>
          
          <div className="cartTotalBlock">
            <ul >
                <li >
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 руб.</b>
                </li>
                <li >
                  <span>Налог 5%: </span>
                  <div></div>
                  <b> 1 074 руб.</b>
                </li>
              </ul>
<button className="greenButton">
  Оформить заказ<img width={18} height={18} src="/img/arrow.svg" alt="Arrow"/> </button> 
          </div>
        </div>
        </div>
    );
}

 export default Drawer;



{/*  
 <div className="cartItem d-flex align-center mb-20 ">
              <div style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }}
                className="cartItemImg"></div>
              <div className="mr-20 flex">
                <p className="mb-5">Мужские кроссовки Nike </p>
                <b> 12 999 руб.</b>
              </div>
              <img className="removeBtn" width={18} height={18} src="/img/remove2.svg" alt="Remove" />
            </div>
            <div className="cartItem d-flex align-center mb-20">
              <div style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }}
                className="cartItemImg"></div>
              <div className="mr-20 flex">
                <p className="mb-5">Мужские кроссовки Nike </p>
                <b> 12 999 руб.</b>
              </div>
              <img  className="removeBtn" width={18} height={18} src="/img/remove2.svg" alt="Remove" />
            </div>
            <div className="cartItem d-flex align-center mb-20">
              <div style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }}
                className="cartItemImg"></div>
              <div className="mr-20 flex">
                <p className="mb-5">Мужские кроссовки Nike </p>
                <b> 12 999 руб.</b>
              </div>
              <img  className="removeBtn" width={18} height={18} src="/img/remove2.svg" alt="Remove" />
            </div>
 </div></div> */}