// import { products } from "./products.js";
class Cart{
  cartItems; //retrives the cart products if saved earlier
  #localStorageKey; //Makes it Private Property , cant be accessed outside the class
  
  //Constructor
  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();    
  } 

  #loadFromStorage(){       
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
    if(!this.cartItems){ //if cart is empty, we will display some default products in cart
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      },{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '3'
      }];
    }
  };

  saveToStorage(){
    localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
  };

  //Adding Products in Cart
  addToCart(productId){
      let matchingItem = '';
  
      this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId){
          matchingItem = cartItem;
        }
      });
      
      //Quanitiy Selector
      let quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  
      let quantity = Number(quantitySelector.value) || 1;
      
      if(matchingItem){ //if product is already present, update quantity
        matchingItem.quantity += quantity;
      } else { //if not present in cart Push it in cart
        this.cartItems.push({
          productId,
          quantity,
          deliveryOptionId: '1'
        });
      }
  
      this.saveToStorage();
  };
  
  //Removing Product form a cart
  removeFromCart(productId){
    const newCart = []; // Creates a new empty array
  
    /* Instead of directly deleting an item from the existing cart array,we are creating a new array (newCart).
       Then, it loops through the original cart:
       If a product’s id matches the one being deleted, it is ignored.
       All other products are added to newCart. */
    this.cartItems.forEach((cartItem) => { 
      if(cartItem.productId !== productId){ // Keeps only items that DON'T match the given productId
        newCart.push(cartItem); // Adds those items to the new cart
      }
    });
    this.cartItems = newCart; // Replaces the old cart with the updated one
  
    this.saveToStorage();
  };
  
  //Calculate Total Cart Quantity
  calculateCartQuantity() {
    let cartQuantity = 0;
  
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    return cartQuantity;
  };

  //Finds a matching productId in cart and updates its quantity to new Quantity
  updateQuantity(productId,newQuantity){
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
  
    matchingItem.quantity = newQuantity;
  
    this.saveToStorage();
  };
  
  updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem = '';
  
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
  
    matchingItem.deliveryOptionId = deliveryOptionId;
  
    this.saveToStorage();
  }
}


const cart = new Cart('cart-oop'); //Instance of class 'Cart'
const businessCart = new Cart('cart-business'); //Instance of class 'Cart'

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);