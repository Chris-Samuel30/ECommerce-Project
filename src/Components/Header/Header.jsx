import React from 'react'
import styles from './Header.module.scss'
import AmazonLogo from '../../Assets/Amazon2.png'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../Services/StateProvider';
import { auth } from '../../firebase';

const Header = () => {
    const[{basket, user}, dispatch] = useStateValue();

    const handleAuth = () => {
        if(user) {
            auth.signOut();
        }
    }
    return (
        <div className={styles.header}>
            <Link to="/">
                <img className={styles.header__logo} src={AmazonLogo}></img>
            </Link>
            <div className={styles.header__search}>
                <input className={styles.header__searchinput} type="text"/>
                <SearchIcon className={styles.header__searchIcon}/>
            </div>
            <div className={styles.header__nav}>
                <Link to= {!user && "/login"}>
                    <div onClick={handleAuth} className={styles.header__option}>
                        <span className={styles.header__option_LineOne}>Hello {!user ? "Guest" : user.email}</span>
                        <span className={styles.header__option_LineTwo}>{user ?'Sign Out':'Sign In'}</span>
                    </div>
                </Link>
                <Link to='/orders'>
                <div className={styles.header__option}>
                    <span className={styles.header__option_LineOne}>Returns</span>
                    <span className={styles.header__option_LineTwo}>& Orders</span>
                </div>
                </Link>
                <div className={styles.header__option}>
                    <span className={styles.header__option_LineOne}>Your</span>
                    <span className={styles.header__option_LineTwo}>Prime</span>
                </div>
                <Link to="/checkout">
                    <div className={styles.header__optionBasket}>
                    <ShoppingBasketIcon/>
                        <span className={styles.header__option_LineTwo && styles.header__basketCount}>{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
