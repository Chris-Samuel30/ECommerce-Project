import React from 'react'
import styles from'./CheckoutProduct.module.scss';
import StarIcon from '@material-ui/icons/Star';
import { useStateValue } from '../../Services/StateProvider';


const CheckoutProduct = React.forwardRef(({id, image, title, price, rating, hideButton}, ref) => {
    
    const [{basket},dispatch] = useStateValue();

    const removeFromBasket = () => {
        //Dispatch action to remove an item
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id:id,
        })
    }

    return (
        <div ref={ref} className={styles.checkoutProduct}>
            <img className={styles.checkoutProduct__image} src={image} />
            <div className={styles.checkoutProduct__info}>
                <p className={styles.checkoutProduct__title}>{title}</p>
                <p className={styles.checkoutProduct__price}>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className={styles.checkoutProduct__rating}> {Array(rating).fill(<p><StarIcon style={{color:'yellow'}}/></p>, 0, rating)}
                </div>
                {!hideButton && (
                <button onClick={removeFromBasket}>Remove from Basket</button>
                )}
            </div>
        </div>
    )
})

export default CheckoutProduct
