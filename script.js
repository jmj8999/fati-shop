

async function loadProducts(isAdmin) {
  const container = document.getElementById("productsContainer");
  if (!container) return;

  try {
    const res = await fetch("http://localhost:3000/products");
    const products = await res.json();

    if (!products || products.length === 0) {
      container.innerHTML = "<p>هیچ محصولی پیدا نشد.</p>";
      return;
    }

    container.innerHTML = "";

    products.forEach((p) => {
      const card = document.createElement("div");
      card.className = "product-card";

      // تصویر
      const img = document.createElement("img");
      img.src = p.image ? p.image : "https://via.placeholder.com/200";
      card.appendChild(img);

      // نام
      const name = document.createElement("h3");
      name.textContent = p.name ? p.name : "بدون نام";
      card.appendChild(name);

      // قیمت
      const price = document.createElement("p");
      price.textContent = p.price ? "قیمت: " + p.price + " تومان" : "قیمت ثبت نشده";
      card.appendChild(price);

      // توضیحات
      const desc = document.createElement("p");
      desc.textContent = p.description ? p.description : "";
      card.appendChild(desc);

      // دکمه حذف (فقط برای ادمین)
      if (isAdmin) {
        const delBtn = document.createElement("button");
        delBtn.textContent = "حذف محصول";
        delBtn.className = "delete-btn";

        delBtn.addEventListener("click", async function () {
          const ok = confirm("آیا مطمئنی می‌خوای حذفش کنی؟");
          if (!ok) return;

          await fetch("http://localhost:3000/products/" + p.id, {
            method: "DELETE",
          });

          loadProducts(isAdmin);
        });

        card.appendChild(delBtn);
      }

      // دکمه افزودن به سبد خرید
      const addBtn = document.createElement("button");
      addBtn.textContent = "افزودن به سبد خرید";
      addBtn.className = "add-to-cart-btn";

      addBtn.addEventListener("click", async function () {
        try {
          // ارسال محصول به سرور سبد خرید
          const res = await fetch("http://localhost:3000/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(p),
          });

          if (res.ok) {
            alert('محصول "' + p.name + '" به سبد خرید اضافه شد.');
          } else {
            alert("خطا در افزودن محصول به سبد خرید!");
          }
        } catch (err) {
          console.error("خطا در افزودن محصول به سبد سرور:", err);
          alert("خطا در اتصال به سرور!");
        }
      });

      card.appendChild(addBtn);

      // اضافه کردن کارت به صفحه
      container.appendChild(card);
    });
  } catch (err) {
    console.log(err);
    container.innerHTML =
      "<p style='color:red;'>خطا در دریافت محصولات از سرور.</p>";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const isAdmin = true; // بعداً می‌تونی تغییرش بدی
  loadProducts(isAdmin);
});
