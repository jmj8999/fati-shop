const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const product = {
    name: document.getElementById('name').value,
    price: document.getElementById('price').value,
    image: document.getElementById('image').value,
    description: document.getElementById('description').value
  };

  let products = JSON.parse(localStorage.getItem('products')) || [];
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));

  alert('✅ محصول اضافه شد');
  form.reset();
});