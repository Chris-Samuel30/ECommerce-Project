import React from 'react';
import styles from './Payment.module.scss';
import {useStateValue} from '../../Services/StateProvider'
import CheckoutProduct from '../CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { db } from '../../firebase';
import firebase from "firebase/app";


const Payment = () => {
    const [{basket,user},dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        db.collection('users').doc(user?.uid).collection('orders').add({
            basket:basket,
            amount:basket?.reduce((amount, item) => item.price + amount, 0),
            created:firebase.firestore.FieldValue.serverTimestamp(),
        })
        dispatch({
            type: 'EMPTY_BASKET'
        })
        history.replace('/orders')
    }

    const handleChange = (e) => {

    }

    return (
        <div className={styles.payment}>
            <div className={styles.payment__container}>
                <h1>
                    Checkout {<Link to="/checkout">{basket?.length} items</Link>}
                </h1>
                <div className={styles.payment__section}>
                    <div className={styles.payment__section__title}>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className={styles.payment__section_address}>
                        <p>{user?user.email:"Guest User"}</p>
                        <p>Address</p>
                        <p>Address 2</p>
                    </div>
                </div>
                <div className={styles.payment__section}>
                    <div className={styles.payment__section__title}>
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className={styles.payment__section__items}>
                        {basket.map((item,index) => (
                            <CheckoutProduct
                            key={index}
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.payment__section}>
                    <div className={styles.payment__section_title}>
                        <h3>Payment Method</h3>
                    </div>
                <div className={styles.payment__section__details}>
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange} />
                        <div className={styles.payment__section__total}>
                            <CurrencyFormat
                                renderText={(value) => (
                                    <h3>Order Total:{value}</h3>
                                )}
                                decimalScale={2}
                                value={basket?.reduce((amount, item) => item.price + amount, 0)}
                                displayType={"text"}
                                thousandSeperator={true}
                                prefix={"$"}
                            />
                            <button className={styles.payment__section__button}>Buy Now</button>
                        </div>
                    </form>
                </div>  
                </div>
            </div>
        </div>
    )
}

export default Payment
