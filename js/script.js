const cartButton = document.getElementById('modal-open');
const modal = document.getElementById('modal');

cartButton.addEventListener('click', function () {
  if (modal.style.display === 'none' || modal.style.display === '') {
    modal.style.display = 'block';
  } else {
    modal.style.display = 'none';
  }
});

window.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  name = name + "=";
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Initialize cookie
let cart = JSON.parse(getCookie('cart') || '{}');

// add an item to the cart
function addToCart(productName, price) {
  if (cart[productName]) {
    cart[productName].quantity += 1;
  } else {
    cart[productName] = { price: price, quantity: 1 };
  }

  setCookie('cart', JSON.stringify(cart), 7); 
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItemsElement = document.getElementById('cart-items');
  cartItemsElement.innerHTML = ''; 

  let totalAmount = 0;

  for (const productName in cart) {
    const cartItem = cart[productName];
    const cartItemDiv = document.createElement('div');
    cartItemDiv.textContent = `${productName} - $${cartItem.price.toFixed(2)} x ${cartItem.quantity}`;
    cartItemsElement.appendChild(cartItemDiv);

    totalAmount += cartItem.price * cartItem.quantity;
  }

  document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
}

//  display from the cookie
window.onload = function() {
  updateCartDisplay();
};