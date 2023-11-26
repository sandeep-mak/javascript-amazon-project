import {cart} from '../data/cart.js';
import {product} from '../data/products.js';


let html='';
let h=[];
        product.forEach((k)=>
        {
          cart.forEach((ele)=>{
           if(ele.productId == k.id){
            h.push(k);
           }
          })
        }
    );
    
document.querySelector('.checkout-header-middle-section').innerHTML = `<div class="checkout-header-middle-section">
Checkout (<a class="return-to-home-link"
  href="amazon.html">${cart.length} items</a>)
</div>` 

h.forEach((element,index) => {
 
    html +=`
    <div class="cart-item-container">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src=${element.image}>

      <div class="cart-item-details">
        <div class="product-name">
          ${element.name}
        </div>
        <div class="product-price">
        $${(element.priceCents /100)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${element.id}">${(Object.values(cart)[index]).quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-product-${element.id}" data-product-id="${element.id}">
            Update
          </span>
          <span class="delete-quantity-link link-primary">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-1">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-1">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-1">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

`
});
document.querySelector('.order-summary').innerHTML=html;

//adding the code for the update button which adds one more product once clicked
cart.forEach((ele)=>
{
  document.querySelector(`.js-product-${ele.productId}`).addEventListener('click',()=>{
    ele.quantity = prompt('enter the quantity');
    document.querySelector(`.js-quantity-label-${ele.productId}`).innerHTML = ele.quantity;
  })
})

let itemAmnt;
let Handling;
function priceCalculate(prod,qua){
  itemAmnt = ((prod.priceCents)*qua); 
  
  Handling = ((prod.priceCents *(8/100)))*qua;
 return  [itemAmnt,Handling];
}


let titemAmnt=0;
let tHandling=0;
let tbeforeTxAmnt=0;
let ttax=0;
let ttotalAmnt=0;
//payment-summary
h.forEach((ele,index)=>{
  let k= priceCalculate(ele,(Object.values(cart)[index]).quantity);
  console.log(k);
  titemAmnt += k[0];
  tHandling += k[1];
});
tbeforeTxAmnt = titemAmnt + tHandling;
ttax = tbeforeTxAmnt*(10/100);
ttotalAmnt = tbeforeTxAmnt + ttax;

document.querySelector('.payment-summary').innerHTML= `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.length}):</div>
            <div class="payment-summary-money">$${titemAmnt/100}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(tHandling /100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(tbeforeTxAmnt/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(ttax/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(ttotalAmnt/100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        
  `;

  
