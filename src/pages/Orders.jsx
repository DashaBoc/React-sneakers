import React from "react";
import Card from "../components/Card";
import axios from "axios";
import { AppContext } from "../App";



function Orders() {
  const { onAddToFavorite, onAddToCart } = React.useContext(AppContext)
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://67dfc5e57635238f9aaaaa1a.mockapi.io/orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при запросе заказов')
      }


    })();
  }, [])
  return (
    <div className="content">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы </h1>
      </div>

      <div className="sneakers flex-wrap">
        {(isLoading ? [...Array(10)] : orders).map((item, index) => (
          <Card
            key={index}
           
           
            loading={isLoading}
            {...item}
          />
        ))}
      </div>

    </div >
  )
}

export default Orders;