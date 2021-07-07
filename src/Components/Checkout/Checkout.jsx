import React from 'react';
import styles from './Checkout.module.scss';
import banner from '../../Assets/Sony_Banner.jpg';
import Subtotal from '../Subtotal';
import { useStateValue } from '../../Services/StateProvider';
import CheckoutProduct from '../CheckoutProduct';
import FlipMove from 'react-flip-move';


const Checkout = () => {
    const [{basket,user},dispatch] = useStateValue();

    return (
        <div className={styles.checkout}>
            <div className={styles.checkout__left}>
                <img className={styles.checkout__banner} src={banner}></img>
            <div>
            <h5 className={styles.checkout__greeting}>Hello, {!user ? "Guest" :user.email}</h5>
                <h1 className={styles.checkout__title}>Your Shopping Basket</h1>
                <FlipMove>
                {basket.map((item, index) => (
                    <CheckoutProduct
                    key={index}
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    />
                ))}
                </FlipMove>
            </div>
            </div>
            <div className={styles.checkout__right}>
                <Subtotal/>
            </div>
        </div>
    )
}

export default Checkout
