import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch} from 'react-router-dom'
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialData, isUserLoggedIn } from './actions';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
import NewPage from './containers/NewPage';
import BarChart from './components/BarChart';

function App() {


  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  useEffect(() =>{
    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getInitialData());
    }
   
  
  
   }, [auth.authenticate]);


  return (
    <div className="App">

     <Switch>
       <PrivateRoute path="/" exact component={Home} />
       <PrivateRoute path="/page"  component={NewPage} />
       <PrivateRoute path="/category"  component={Category} />
       <PrivateRoute path="/products"  component={Products} />
       <PrivateRoute path="/orders"  component={Orders} />
       <PrivateRoute path="/bar"  component={BarChart} />
       <Route path="/signin" component={Signin} />
       <Route path="/signup" component={Signup} />
     </Switch>

    </div>
  );
}

export default App;
