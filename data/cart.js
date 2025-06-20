import { products } from "../data/products.js";

export let cart = JSON.parse(localStorage.getItem('cart')); //retrives the cart products if saved earlier
 
if(!cart){ //if cart is empty, we will display some default products in cart
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  },{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 5,
    deliveryOptionId: '3'
  }];
}

  function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
  }

//Adding Products in Cart
export function addToCart(productId){
    let matchingItem = '';

    cart.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
    
    //Quanitiy Selector
    let quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);

    let quantity = Number(quantitySelector.value) || 1;
    
    if(matchingItem){
      matchingItem.quantity += quantity;
      console.log(quantity);
    } else {
      cart.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }

    saveToStorage();
  }
  
//Removing Product form a cart
export function removeFromCart(productId){
  const newCart = []; // Creates a new empty array

  /* Instead of directly deleting an item from the existing cart array,we are creating a new array (newCart).
     Then, it loops through the original cart:
     If a product’s id matches the one being deleted, it is ignored.
     All other products are added to newCart. */
  cart.forEach((cartItem) => { 
    if(cartItem.productId !== productId){ // Keeps only items that DON'T match the given productId
      newCart.push(cartItem); //// Adds those items to the new cart
    }
  });
  cart = newCart; // Replaces the old cart with the updated one

  saveToStorage();
}

//Calculate Total Cart Quantity
export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

//Finds a matching productId in cart and updates its quantity to new Quantity
export function updateQuantity(productId,newQuantity){
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}