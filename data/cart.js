export const cart = [];

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
    } else {
      cart.push({
        productId,
        quantity
      });
    }
}