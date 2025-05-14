import { products } from "../data/products.js";

export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
  },{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 5
  }];
}

  function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
  }

//Ading Products in Cart
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
        quantity
      });
    }

    saveToStorage();
  }
  
//Removing Priouct form a cart
export function removeFromCart(productId){
  const newCart = []; // Creates a new empty array
  
  cart.forEach((cartItem) => { 
    if(cartItem.productId !== productId){ // Keeps only items that DON'T match the given productId
      newCart.push(cartItem); //// Adds those items to the new cart
    }
  });

  cart = newCart; // Replaces the old cart with the updated one

/*
  Instead of modifying the existing cart array, it creates a new one (newCart).

  It loops through each item and only keeps the ones whose productId does not match the deleted item's productId.

  At the end, it replaces the old cart with newCart, effectively removing the unwanted product.
  */
 saveToStorage();
}