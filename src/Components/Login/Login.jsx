import React from 'react';
import styles from './Login.module.scss';
import Logo from '../../Assets/Amazon_Logo_White.png';
import {Link, useHistory} from 'react-router-dom';
import {useState} from 'react';
import {auth} from '../../firebase.js'



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const signIn = (event) => {
        event.preventDefault();
        const user = auth.signInWithEmailAndPassword(email,password).catch(error => alert(error.message));
        console.log(user);
        if(user){
            history.push('/')
        } else if (!user) {
            alert("Please sign in to place an order")
        }

    }

    const registerUser = async (event) => {
        event.preventDefault();
        const user = await auth.createUserWithEmailAndPassword(email, password).catch(error => alert(error.message));
        console.log(user);
        if(user){
            history.push('/')
        }
    }
    

    return (
        <div className={styles.login}>
            <Link to='/'>
                <img className={styles.login__logo} src={Logo}></img>
            </Link>

            <div className={styles.login__container}>
                <h1>Sign-in</h1>

                <form>
                    <h5>Email</h5>
                    <input onChange={e => setEmail(e.target.value)} type="text" value={email}/>
                    <h5>Password</h5>
                    <input onChange={e => setPassword(e.target.value)} type="password" value={password}/>
                    <button onClick={signIn} className={styles.login__signInButton}>Sign In</button>
                </form>
                <p>By signing in, you agree to AMAZON CLONE Conditions of Use & Sale. Please 
                    see our Privacy Notice, our Cookies Notice and our interest-based Ads 
                    Notice
                </p>
                <button onClick={registerUser} className={styles.login__registerButton}>Create Your Amazon Account</button>
            </div>
        </div>

    )
}

export default Login
