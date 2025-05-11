import {cart} from '../data/cart.js'

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
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
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

//Updating the Cart
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click',() =>{
    
    /*
       const productId = button.dataset.productId; //(data-product-name) when we use data-* attributes in HTML, JavaScript automatically converts "product-name" into camelCase 
    */
      const { productId } = button.dataset; //shorthand Destructuring, Extracting productId from button.dataset, and store it in a variable named productId


      let matchingItem = '';

      cart.forEach((item) => {
        if(productId === item.productId){
          matchingItem = item;
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
  
    //Updating the cart quantity
    let cartQuantity = 0;

    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity; //displaying cart quantity

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