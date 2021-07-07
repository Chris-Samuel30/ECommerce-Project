import './App.module.scss';
import Header from './Components/Header'
import Home from './Components/Home'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Checkout from './Components/Checkout';
import Login from './Components/Login';
import Showcase from './Components/Showcase';
import Payment from './Components/Payment';
import Orders from './Components/Orders';
import { useEffect } from 'react';
import {auth} from './firebase'
import { useStateValue } from './Services/StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const promise = loadStripe("pk_test_51JAZ26BcioQIBGQvx9y779Eov7tunh7FaSuaBn5jNd2nfpRZHarGAFMcatLDDBIG08Cvegost5Vgd6gWJkUOjJ4B00TRPcJBt6");

function App() {

  const [{basket},dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {

      if(authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    })
  }, [] )
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route path="/orders">
            <Header/>
            <Orders/>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/checkout">
              <Header/>
              <Checkout/>
            </Route>
            <Route exact path="/">
              <Header/>
              <Home/>
            </Route>
            <Route path="/showcase/:id">
              <Header/>
              <Showcase/>
            </Route>
            <Route path="/payment">
              <Header/>
              <Elements stripe={promise}>
                <Payment/>
              </Elements>
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
