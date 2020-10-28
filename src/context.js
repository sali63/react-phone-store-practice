import React, { Component } from 'react'
/* import Product from './components/Product'; */
import {storeProducts , detailProduct} from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        /*products: storeProducts would change the original data.js as it is referencing the value Fix in setProducts() below*/
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartTax: 0,
        cartSubtotal: 0,
        cartTotal: 0
    }

    componentDidMount(){
        this.setProducts();
    }
    //ARROW FUNCTIONS lets you bypass binding. 
    //Regular functions would need to be binded 
    //to the constructor function inorder to work.

    setProducts = () =>{
        let tempProducts = [];
        storeProducts.forEach( item => {
            /* Copying from original data using spread operator; not referencing 
            anymore as above described—each item is an object     */ 
            const singleItem = { ...item };
            
            tempProducts.push(singleItem);                
        });

        this.setState( () => {
            return {products: tempProducts}
        })
    }

    getItem = (id) =>{
        const product = this.state.products.find( item => item.id === id);
        
        return product;
    }

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState( ()=>{
            return {detailProduct: product}
        })
    }

    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        this.setState( 
        () => {
            return { products: tempProducts, 
                    cart: [...this.state.cart, product] };
        },()=>{this.addTotals();}        
        );

    }

    openModal = id => {
        const product = this.getItem(id);
        this.setState( () => {
            return { modalProduct: product, modalOpen: true }
        })
    }

    closeModal = () => {
        this.setState( () => {
            return { modalOpen: false};
        })
    }

    increment = id => {
        /* can leave it out cuz removing or clearing the item 
        will reset the products*/
        /* const tempProducts = [...this.state.products]; */
        const tempCart = [...this.state.cart];        
        const incrementedProduct = this.getItem(id);
        const index = tempCart.indexOf(incrementedProduct);
        
        incrementedProduct.count += 1;
        incrementedProduct.total += incrementedProduct.price;
        tempCart[index] = incrementedProduct;
        /* tempCart[index].count += 1;
        tempCart[index].total += tempCart[index].price; */
        
        this.setState(()=>{
            return{
                /* products: [...tempProducts], */
                cart: [...tempCart]
            }
        }, this.addTotals());
       
    }
    decrement = id => {
        /* const tempProducts = [...this.state.products]; */
        const tempCart = [...this.state.cart];        
        const decrementedProduct = this.getItem(id);
        const index = tempCart.indexOf(decrementedProduct);
        
        if (decrementedProduct.count === 1)
        {
            this.removeItem(id);                        
        }
        
          else {           
            decrementedProduct.count -= 1;
            decrementedProduct.total -= decrementedProduct.price;
            tempCart[index] = decrementedProduct;
                 
        this.setState(()=>{
            return{
                /* products: [...tempProducts], */
                cart: [...tempCart]
            }
        }, this.addTotals());
    }
    }

    removeItem = id => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter( item => item.id !== id);
        const index = tempProducts.indexOf(this.getItem(id));

        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;


        this.setState(()=>{
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            }
        }, () => {
            this.addTotals();
        })
    }

    clearCart = () =>{
        this.state.cart.forEach( item => item.inCart = false);
        this.setState(()=>{
            return {
                    cartTax: 0,
                    cartSubtotal: 0,
                    cartTotal: 0, 
                    cart: []
                }
        })  //freecodecamp guy ran this.setProducts() and this.addTotals() 
            //here in this call back
            //automatically resets everything 
        
       
    }

    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map( item => subTotal += item.total);        
        const tempTax = subTotal * 0.05;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState( () =>{
            return {
                cartSubtotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }
    
    render() {
        return (
            //return ProductContext and Provider component
            <ProductContext.Provider value={{
                //...three dots(spread operator) necessary before this.state to put the 
                //state object's properties inside value
                
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart

            }}> 
                {this.props.children}
                
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider , ProductConsumer };