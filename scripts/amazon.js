
import { cart } from "../data/cart.js";
import { product } from "../data/products.js";

export let quantityTot=0;
export function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}
let productsHtml='';

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}
document.querySelector('.js-total-count').innerHTML=cart.length;

product.forEach((product)=>{
    productsHtml += `
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
        ${product.rating.votes}
      </div>
    </div>

    <div class="product-price">
      $${(product.priceCents / 100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
      <select>
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

    <div class="added-to-cart js-added-${product.id}">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
      Add to Cart
    </button>
  </div>
    `;
});

document.querySelector('.js-products-grid').innerHTML = productsHtml;
document.querySelectorAll('.add-to-cart-button')
.forEach((button)=>{
  button.addEventListener('click',()=>
  {
    let product = button.dataset.productId;
    
    let addedToCartElement = document.querySelector(`.js-added-${product}`);
    if (addedToCartElement) {
      addedToCartElement.classList.add('addeed-to-cart');
      setTimeout(() => {
        addedToCartElement.classList.remove('addeed-to-cart');
      }, 2000);}

    let match;

    cart.forEach((item)=>{
      if(product  === item.productId){
        match = item;
      }
    })
    
    if(match){
      match.quantity += 1;
    }else{
      cart.push({
        productId :product,
        quantity :1
      }
      
      )
      saveToStorage();
     
    }
    

    
    document.querySelector('.js-total-count').innerHTML=cart.length;
    console.log(JSON.parse(localStorage.getItem('cart')))
  })
  
  
});



