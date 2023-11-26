

export let cart = JSON.parse(localStorage.getItem('cart'))
if(!cart)
{
  cart = [
  {productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',quantity:4},
  {productId:'83d4ca15-0f35-48f5-b7a3-1ea210004f2e',quantity:1}
]
}

