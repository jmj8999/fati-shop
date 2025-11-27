
:wrench: نسخه‌ی اصلاح‌شدهٔ کامل admin.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const product = {
      id: Date.now(), // :star: اضافه شد
      name: document.getElementById("name").value,
      price: Number(document.getElementById("price").value), // :star: تبدیل به عدد
      image: document.getElementById("image").value,
      description: document.getElementById("description").value
    };

    await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });

    alert("محصول اضافه شد 🟢");
    form.reset();
  });
});