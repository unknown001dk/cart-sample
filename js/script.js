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

const closeBtn = document.getElementById('close-btn');

closeBtn.addEventListener('click', function () {
  modal.style.display = 'none';
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
  successMsg();
}

// remove an item from the cart
function decreaseQuantity(productName, price) {
  if (cart[productName] && cart[productName].quantity > 0) {
    cart[productName].quantity -= 1;
    if (cart[productName].quantity === 0) {
      delete cart[productName];
    }
  }
  setCookie('cart', JSON.stringify(cart), 7);
  updateCartDisplay();
}

// increase quantity 
function increaseQuantity(productName, price) {
  if (cart[productName]) {
    cart[productName].quantity += 1;
  } else {
    cart[productName] = { price: price, quantity: 1 };
  }

  setCookie('cart', JSON.stringify(cart), 7);
  updateCartDisplay();
}

// remove an item from the cart

function removeFromCart(productName) {
  if (cart[productName]) {
    delete cart[productName];
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
    cartItemDiv.innerHTML = `
    <span style="font-size: 24px; font-weight: 500; margin-bottom: 10px; margin-left: 90px;">${productName}</span>
      <div style="margin-top: 10px; margin-bottom: 10px;">
        <button 
            style="font-size: 18px;
                width: 20px;
                padding: 5px;
                border: none;
                background-color: #4CAF50;
                color: white;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;" 
                onclick="decreaseQuantity('${productName}')"
        >-</button>
        <span class="quantity-display">${cartItem.quantity}</span>
        <button onclick="increaseQuantity('${productName}')"
        style="font-size: 18px;
                width: 20px;
                padding: 5px;
                border: none;
                background-color: #008CBA;
                color: white;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;"
        >+</button>
        <button class="remove" onclick="removeFromCart('${productName}')"
        style="
          font-size: 18px;
                padding: 5px;
                border: none;
                background-color: #d72929;
                color: white;
                border-radius: 5px;
                cursor: pointer;
                float: right;
                transition: background-color 0.3s ease;
        "
        >Remove</button>
      </div>
    `
    cartItemsElement.appendChild(cartItemDiv);

    totalAmount += cartItem.price * cartItem.quantity;
  }

  document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
}

//  display from the cookie
window.onload = function() {
  updateCartDisplay();
};

function successMsg() {
  const toast = document.getElementById('toast');
  toast.textContent = 'Item added to cart Sucessfully!';
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}