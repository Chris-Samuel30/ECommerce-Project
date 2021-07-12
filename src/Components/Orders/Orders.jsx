import React from 'react';
import styles from './Orders.module.scss'
import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { useStateValue } from '../../Services/StateProvider';
import Order from '../Order';

const Orders = () => {
    const [{basket,user}, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if(user){
        db.collection('users').doc(user?.uid).collection('orders').orderBy('created','desc').onSnapshot(snapshot => {
            setOrders(snapshot.docs.map(doc =>({
            id:doc.id,
            data:doc.data()
            })))
        })}else {
            setOrders([])
        }
    },[])
    return (
        <div className={styles.orders}>
            <h1>Orders</h1>
            <div className={styles.orders__ordersummary}>
            {orders?.map(order => (
               <Order order={order}/> 
            ))}
            </div>
        </div>
    )
}

export default Orders
