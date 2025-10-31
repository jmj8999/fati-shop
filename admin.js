const form = document.getElementById('productForm');

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

  alert(':white_check_mark: محصول با موفقیت اضافه شد!');
  form.reset();
});