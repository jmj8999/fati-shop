


const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

let products = []; // محصولات
let cart = [];     // سبد خرید

// ======================
// Products
// ======================

// GET همه محصولات
app.get("/products", (req, res) => {
  res.json(products);
});

// POST اضافه کردن محصول (ادمین)
app.post("/products", (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.json({ message: "product added", data: newProduct });
});

// DELETE حذف محصول
app.delete("/products/:id", (req, res) => {
  products = products.filter(p => p.id !== req.params.id);
  res.json({ message: "product deleted" });
});

// ======================
// Cart
// ======================

// GET همه محصولات سبد خرید
app.get("/cart", (req, res) => {
  res.json(cart);
});

// POST اضافه کردن محصول به سبد خرید
app.post("/cart", (req, res) => {
  const product = { ...req.body, id: uuidv4(), quantity: 1 };
  cart.push(product);
  res.json({ message: "product added to cart", data: product });
});

// DELETE حذف یک محصول از سبد خرید
app.delete("/cart/:id", (req, res) => {
  cart = cart.filter(item => item.id !== req.params.id);
  res.json({ message: "product removed from cart" });
});

// DELETE پاک کردن کل سبد خرید
app.delete("/cart", (req, res) => {
  cart = [];
  res.json({ message: "cart cleared" });
});

// ======================
// سرور
// ======================
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

