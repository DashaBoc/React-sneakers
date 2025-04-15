import React from 'react';
import ContentLoader from "react-content-loader";
import styles from './Card.module.scss'
import { AppContext } from '../../App';



import liked from "../../assets/img/heart-liked.svg"
import unliked from "../../assets/img/heart-unliked.svg"
import checked from "../../assets/img/btn-checked.svg" 
import plus from "../../assets/img/plus.svg"




function Card({ id, onFavorite, title, imageUrl, price, onPlus, favorited = false, loading = false }) {

    const { isItemAdded } = React.useContext(AppContext)
    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const obj ={id, parentId: id, title, imageUrl, price };
    
    const onClickPlus = () => {
        onPlus(obj);
    }

    const onClickFavorite = () => {
        onFavorite({ id, title, imageUrl, price });
        setIsFavorite(!isFavorite)
    }

    return (
        <div className={styles.card}>
            {
                loading ? <ContentLoader
                    speed={2}
                    width={160}
                    height={250}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="384" y="195" rx="0" ry="0" width="574" height="124" />
                    <rect x="71" y="48" rx="0" ry="0" width="5" height="17" />
                    <rect x="517" y="158" rx="0" ry="0" width="132" height="77" />
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
                    <rect x="0" y="109" rx="5" ry="5" width="150" height="15" />
                    <rect x="0" y="137" rx="5" ry="5" width="100" height="15" />
                    <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
                    <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
                </ContentLoader> : <> { onFavorite && ( <div className={styles.favorite} onClick={onClickFavorite}>
                    <img width={32} height={32} src={isFavorite ? liked : unliked} alt="Unliked" />
                </div>)}

                    <img width='100%' height={135} src={"https://haslestore.com/_next/image?url=https%3A%2F%2Fhaslestore.com%2Fstorage%2Fimport_files%2Fd0%2Fd06af9def95011edbaed2c44fd7ae203_02ce5447fd5d11edbaed2c44fd7ae203.jpg&w=1920&q=75"} alt="Sneakers" />
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column ">
                            <span>Цена:</span>
                            <b>{price} руб.</b>
                        </div>

                        {onPlus && (<img
                            className={styles.plus}
                            onClick={onClickPlus} width={16} height={16}
                            src={isItemAdded(id) ? checked: plus}
                            alt="Plus" />
                        )}
                    </div> </>

            }


        </div >

    );
}
export default Card;