import {cart, addToCart,calculateCartQuantity} from '../data/cart.js';

import {products,loadProducts} from '../data/products.js';

import {formatCurrency} from './utils/money.js';

loadProducts(renderProductsGrid);

function renderProductsGrid(){
  let productHTML = '';
  
  products.forEach((product) => {
  productHTML += `
     <div class="product-container">
          <div class="product-image-container">
          <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>
        `
      });
      
      document.querySelector('.js-products-grid').innerHTML = productHTML;
      
      // We're going to use an object to save the timeout ids.
// The reason we use an object is because each product
// will have its own timeoutId. So an object lets us
// save multiple timeout ids for different products.
// For example:
// {
  //   'product-id1': 2,
  //   'product-id2': 5,
//   ...
// }
// (2 and 5 are ids that are returned when we call setTimeout).
const addedMessageTimeouts = {};


//Updating the cart quantity
function updateCartQuantity(){
  const cartQuantity = calculateCartQuantity();

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity || ''; //displaying cart quantity
  }

//Runs when we reload the page
window.onload = () => {
  updateCartQuantity();
}

//Updating the Cart
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click',() =>{
    
    /*
       const productId = button.dataset.productId; //(data-product-name) when we use data-* attributes in HTML, JavaScript automatically converts "product-name" into camelCase 
    */
      const { productId } = button.dataset; //shorthand Destructuring, Extracting productId from button.dataset, and store it in a variable named productId

      addToCart(productId);
      updateCartQuantity();
    
    //Added Message
    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);

    addedMessage.classList.add('added-to-cart-visible');
    
    //Check if previous timeout for this product. If there is, we should stop it
    const previousTimeoutId = addedMessageTimeouts[productId];

    if(previousTimeoutId){
      clearTimeout(previousTimeoutId);
    } 

    const timeoutId = setTimeout(() => {
      addedMessage.classList.remove('added-to-cart-visible');
    },2000);

    addedMessageTimeouts[productId] = timeoutId;
    });
  });
}