import React from 'react'
import styles from './ShowcaseProduct.module.scss';
import StarIcon from '@material-ui/icons/Star';
import {useStateValue} from '../../Services/StateProvider';

const ShowcaseProduct = ({id, title, image, price, rating}) => {

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
        <div className={styles.showcaseproduct}>
            <div className={styles.showcaseproduct__image}>
                <img src={image} className={styles.showcaseproduct__image}></img>
            </div>
            <div className={styles.showcaseproduct_info}>
                <p className={styles.showcaseproduct__title}>
                {title}</p>
                <div className={styles.showcaseproduct__rating}>
                {Array(rating).fill(<p><StarIcon style={{color:'yellow'}}/></p>, 0, rating)}
                </div>
                <p className={styles.showcaseproduct__price}>
                <small>Price: </small>
                <small>$</small>
                <strong>{price}</strong>
                </p>
            </div>
            <div className={styles.showcaseproduct__action}>
                <h3><small>$</small>{price}</h3>
                <div className={styles.showcaseproduct__button__wrap}>
                <button onClick={addToBasket} className={styles.showcaseproduct__button}>Add to Basket</button>
                </div>
            </div>
        </div>
    )
}

export default ShowcaseProduct

