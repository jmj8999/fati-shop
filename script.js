function loadProducts() {
  const container = document.getElementById("productsContainer");
  if (!container) return;
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  try {
    const products = JSON.parse(localStorage.getItem("products")) || [];

    if (products.length === 0) {
      container.innerHTML = "<p>هیچ محصولی پیدا نشد.</p>";
      return;
    }

    container.innerHTML = "";

    products.forEach((p, index) => {
      const card = document.createElement("div");
      card.className = "product-card";
      const img = document.createElement("img");
img.src = p.image || "https://via.placeholder.com/200";
card.appendChild(img);

      const name = document.createElement("h3");
      name.textContent = p.name || "بدون نام";

      const price = document.createElement("p");
      if (p.price) {
        price.textContent = "قیمت: " + p.price + " تومان";
      } else {
        price.textContent = "قیمت ثبت نشده";
      }

      const desc = document.createElement("p");
      desc.textContent = p.description || "";

      card.appendChild(name);
      card.appendChild(price);
      card.appendChild(desc);

      if (isAdmin) {
        const delBtn = document.createElement("button");
        delBtn.textContent = "حذف محصول";
        delBtn.className = "delete-btn";
        delBtn.addEventListener("click", () => {
          if (confirm("آیا مطمئنی می‌خوای این محصول حذف بشه؟")) {
            deleteProduct(index);
          }
        });
        card.appendChild(delBtn);
      }

const addBtn = document.createElement("button");
addBtn.textContent = "افزودن به سبد خرید";
addBtn.className = "add-to-cart-btn";
card.appendChild(addBtn);
      container.appendChild(card);
    });
  } catch (err) {
    console.error("خطا در بارگذاری محصولات:", err);
    container.innerHTML =
      "<p style='color:red;'>خطایی در نمایش محصولات رخ داده است.</p>";
  }
}

function deleteProduct(index) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
}

document.addEventListener("DOMContentLoaded", loadProducts);