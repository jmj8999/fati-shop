async function loadProducts() {
  const list = document.querySelector('.product-list');
  list.innerHTML = '<p>در حال بارگذاری محصولات...</p>';

  try {
    const res = await fetch('data/products.json');
    if (!res.ok) throw new Error('فایل products.json پیدا نشد');

    const products = await res.json();
    list.innerHTML = '';

    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product';

      const img = document.createElement('img');
      img.src = p.image || '';
      img.alt = p.name || '';

      const h3 = document.createElement('h3');
      h3.textContent = p.name || '';

      const desc = document.createElement('p');
      desc.textContent = p.description || '';

      const price = document.createElement('p');
      price.className = 'price';
      price.textContent = (p.price ? (p.price + ' تومان') : '');

      card.appendChild(img);
      card.appendChild(h3);
      card.appendChild(desc);
      card.appendChild(price);

      list.appendChild(card);
    });

  } catch (err) {
    console.error('خطا در بارگذاری محصولات:', err);
    list.innerHTML = '<p style="color:red;">خطا در بارگذاری محصولات — کنسول را چک کن</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadProducts);