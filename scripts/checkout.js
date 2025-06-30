import { renderCheckoutHeader } from "./Checkout/checkoutHeader.js";
import { renderOrderSummary } from "./Checkout/orderSummary.js";
import { renderPaymentSummary } from "./Checkout/paymentSummary.js";
// import '../data/backend-practice.js';
import { loadProducts } from "../data/products.js";

loadProducts(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});