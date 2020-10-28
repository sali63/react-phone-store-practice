import React from 'react';
import {Switch,Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


/* COMPONENTS */
import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
//because we set up Cart.js as "main" : "Cart.js" in package.json
//in the Cart folder, this import works even though Cart.js is 
//not on the same level—my undeerstanding why we are doing things this way 
//is so we can import all the Cart componenets with just ./components/Cart 
//which will have all the imports for its components in Cart.js
//otherwise we would have to do a separate import for the Cart component
//parts—so basically Cart.js is our main file

import Cart from "./components/Cart";
import Default from "./components/Default";
import Modal from './components/Modal';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route exact path = "/" component = {ProductList} />
        <Route path = "/details" component = {Details} />        
        <Route path = "/cart" component = {Cart} />        
        
        {/* no path for Default */}
        <Route component = {Default} />        
      </Switch>
      <Modal />
    </React.Fragment>

  );
}

export default App;
