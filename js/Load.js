const products = [
  { id: 'fish-1', name: 'Product Name', price: 100, image: './images/fish-1.jpeg' },
  { id: 'fish-2', name: 'Product Name', price: 99.99, image: './images/fish-2.jpeg' },
  { id: 'fish-3', name: 'Product Name', price: 340, image: './images/fish-3.jpeg' },
  { id: 'fish-4', name: 'Product Name', price: 899, image: './images/fish-4.jpeg' },
  { id: 'fish-5', name: 'Product Name', price: 99.99, image: './images/fish-5.jpeg' },
  { id: 'fish-6', name: 'Product Name', price: 100, image: './images/fish-6.jpeg' },
  { id: 'fish-7', name: 'Product Name', price: 459, image: './images/fish-1.jpeg' },
  { id: 'fish-8', name: 'Product Name', price: 78, image: './images/fish-2.jpeg' },
  { id: 'fish-9', name: 'Product Name', price: 233, image: './images/fish-3.jpeg' },
  { id: 'fish-10', name: 'Product Name', price: 245, image: './images/fish-4.jpeg' },
];

function loadProducts() {
  const container = document.getElementById('productContainer');
  products.forEach(product => {
    container.innerHTML += `
      <div class="card">
        <img src="${product.image}" alt="Product Image">
        <h2>${product.name}</h2>
        <p>Price: $${product.price}</p>
        <button onclick="addToCart('${product.id}', ${product.price})" class="btn">Add to Cart</button>
      </div>
    `;
  });
}

loadProducts();