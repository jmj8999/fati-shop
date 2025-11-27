

async function getCart() {
  try {
    const res = await fetch("http://localhost:3000/cart");
    const cart = await res.json();
    return cart;
  } catch (err) {
    console.error("خطا در دریافت سبد خرید از سرور:", err);
    return [];
  }
}

async function renderCart() {
  const cart = await getCart();
  const container = document.getElementById("cart-container");
  const totalItems = document.getElementById("total-items");
  const totalPrice = document.getElementById("total-price");
  const clearBtn = document.getElementById("clear-cart");

  container.innerHTML = "";
  let total = 0;

  if (!cart || cart.length === 0) {
    container.innerHTML = "<p>سبد خرید خالی است 🛍️</p>";
  } else {
    cart.forEach((item) => {
      total += item.price * (item.quantity || 1);

      const div = document.createElement("div");
      div.classList.add("cart-item");

      // اصلاح innerHTML با backticks
      div.innerHTML = 
        <img src="${item.image || 'https://via.placeholder.com/100'}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>قیمت: ${item.price.toLocaleString()} تومان</p>
        <p>تعداد: ${item.quantity || 1}</p>
      ;

      // دکمه حذف محصول
      const delBtn = document.createElement("button");
      delBtn.textContent = "حذف";
      delBtn.addEventListener("click", async () => {
        try {
          await fetch("http://localhost:3000/cart/" + item.id, { method: "DELETE" });
          renderCart(); // بعد از حذف دوباره رندر کن
        } catch (err) {
          console.error("خطا در حذف محصول:", err);
        }
      });

      div.appendChild(delBtn);
      container.appendChild(div);
    });
  }

  totalItems.textContent = cart.length;
  totalPrice.textContent = total.toLocaleString();

  // دکمه پاک کردن کل سبد
  clearBtn.addEventListener("click", async () => {
    try {
      await fetch("http://localhost:3000/cart", { method: "DELETE" });
      renderCart();
    } catch (err) {
      console.error("خطا در پاک کردن سبد:", err);
    }
  });
}

// گوش دادن به event برای بروزرسانی خودکار سبد
window.addEventListener("cart:updated", renderCart);

// رندر اولیه
document.addEventListener("DOMContentLoaded", renderCart);



