import React from 'react'
import styles from './Subtotal.module.scss'
import CurrencyFormat from 'react-currency-format';
import {useStateValue} from '../../Services/StateProvider';
import { useHistory } from 'react-router-dom';

const Subtotal = () => {
    const history = useHistory();
    const[{basket}, dispatch] = useStateValue();

    return (
        <div className={styles.subtotal}>
           <CurrencyFormat
               renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({basket.length} items): <strong>{value}</strong>
                        </p>
                        <small className={styles.subtotal__gift}>
                            <input type="checkbox"></input>
                                This order contains a gift
                        </small>
                    </>
               )}
               decimalScale={2}
               value={basket?.reduce((amount, item) => item.price + amount, 0)}
               displayType={"text"}
               thousandSeperator={true}
               prefix={"$"}
            />
            <button onClick={e=>history.push('/payment')}>Proceed to Checkout</button>
        </div>
    );
}

export default Subtotal
