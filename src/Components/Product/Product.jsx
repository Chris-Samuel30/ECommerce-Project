import React from 'react'
import styles from './Product.module.scss'
import StarIcon from '@material-ui/icons/Star';
import {useStateValue} from '../../Services/StateProvider';
import { Link } from 'react-router-dom';

const Product = ({id, title, image, price, rating}) => {
    
    const[{basket}, dispatch] = useStateValue();

    const addToBasket = () => {
        //Dispatching the item into the data layer 
        dispatch({
            type: 'ADD_TO_BASKET',
            item:{
                id:basket.length + 1,
                title:title,
                image:image,
                price:price,
                rating:rating,
            }
        })
        console.log("Added to basket", basket);
    }
    return (
        <div className={styles.product}>
            <div className={styles.product__info}>
                <Link className={styles.product__link} to={`/showcase/${id}`}>
                <p className={styles.product__title}>{title}
                </p>
                </Link>
                <p className={styles.product__price}>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
            <div className={styles.product__rating}>
            {Array(rating).fill(<p><StarIcon style={{color:'yellow'}}/></p>, 0, rating)}
            </div>
            </div>
            <img src={image} className={styles.product__image}></img>
            <div className={styles.button__wrap}>
            <button onClick={addToBasket} className={styles.product__button}>Add to Basket</button>
            </div>
        </div>
    )
}

export default Product
