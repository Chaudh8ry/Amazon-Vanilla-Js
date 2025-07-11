import {
  cart, 
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryOption
} from '../../data/cart.js';
import {products,getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js'; //'named export' using curly braces
import {deliveryOptions,getDeliveryOption,calculateDeliveryDate} from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'; //'default export' syntax (no curly braces) we use it when we have to import only 1 thing 
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderOrderSummary(){
  
let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  const matchingProduct = getProduct(productId);
  // Retrieve the selected delivery option ID from the cart item
  const deliveryOptionId = cartItem.deliveryOptionId;

  const deliveryOption = getDeliveryOption(deliveryOptionId);

   const dateString = calculateDeliveryDate(deliveryOption);

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString} 
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            ${matchingProduct.getPrice()}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}" >${cartItem.quantity}</span>
            </span>

            <span class="update-quantity-link js-update-link  link-primary" data-product-id = '${matchingProduct.id}'>
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-link" data-product-id = "${matchingProduct.id}">Save</span>

            <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct,cartItem)}
        </div>
      </div>
    </div>
  `;
});

// Loop through each available delivery option
function deliveryOptionsHTML(matchingProduct,cartItem){
  let html = '';
  deliveryOptions.forEach((deliveryOption) =>{
    const dateString = calculateDeliveryDate(deliveryOption);

    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
    
    // Check if this delivery option is the one currently selected
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html +=
    `<div class="delivery-option js-delivery-option" data-product-id = "${matchingProduct.id}"
    data-delivery-option-id = "${deliveryOption.id}">
      <input type="radio"
      ${isChecked ? 'checked' : ''}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString} Shipping
        </div>
      </div>
    </div>`
  });
  return html;
}

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

//Delete from Cart
document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
  
  //Updating Checkout Cart Quantity (reusing updateCartQuantity() code from amazon.js)
    function updateCartQuantity(){
    const cartQuantity = calculateCartQuantity();

    document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`; //displaying cart quantity
  };

    updateCartQuantity();
  
  //Update Cart Button 
  document.querySelectorAll('.js-update-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        
        container.classList.add('is-editing-quantity');
      });
    });

  //Save Cart Button
  document.querySelectorAll('.js-save-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;

    // Here's an example of a feature we can add: validation.
    // Note: we need to move the quantity-related code up
    // because if the new quantity is not valid, we should
    // return early and NOT run the rest of the code. This
    // technique is called an "early return"
    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
    const newQuantity = Number(quantityInput.value);
    updateQuantity(productId,newQuantity);

    if(newQuantity < 0 || newQuantity >= 1000){
      alert('Quantity must be at least 0 and less than 1000');
      return;
    }

    updateQuantity(productId, newQuantity);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove('is-editing-quantity');
    
    const quantityLabel = document.querySelector(`
      .js-quantity-label-${productId}`);
      quantityLabel.innerHTML = newQuantity;

      updateCartQuantity();
      renderPaymentSummary();
  });
  });

  document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener('click',() => {
      const {productId,deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
