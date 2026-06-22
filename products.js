/* ============================================================
   products.js
   This is our "database" of products. In a real store this list
   would come from a server, but since this is a front-end-only
   project, we just keep it as a plain JavaScript array of objects.

   Every other page reads from this SAME array, so if you want to
   add, remove, or edit a product, you only have to do it here —
   it will automatically show up on the Home page, Products page,
   and Cart page (the cart just looks up products by id).
   ============================================================ */

const PRODUCTS = [
  {
    id: "smartphone-x",
    name: "Smartphone X (128 GB)",
    desc: "Fast performance, excellent camera.",
    price: 29999,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmjAGp1vtMbsXuu2JOYqwBttUE7H0aEPU6hCVmbML1PExzFuxtdJzw3zs67g6FoPqmdnA&usqp=CAU",
  },
  {
    id: "laptop-pro-14",
    name: 'Laptop Pro 14"',
    desc: "Lightweight & powerful for creators.",
    price: 79990,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDlKxDHBgAANq4JHpD8GzeLveRzWfk3yywSQ&s",
  },
  {
    id: "noise-cancel-headphones",
    name: "Noise-Cancel Headphones",
    desc: "Immersive sound & long battery life.",
    price: 4499,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5gKM09LrQGtCUBwxcvTUEarNrIfICqzjzEQ&s",
  },
  {
    id: "4k-smart-tv-55",
    name: '4K Smart TV 55"',
    desc: "Vivid colors & smart features.",
    price: 39990,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyqpBsaTg1JNkx-vtXrOEo5cExMCMwGsQotA&s",
  },
  {
    id: "fitness-band",
    name: "Fitness Band",
    desc: "Track health metrics on the go.",
    price: 1999,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRj4a0cd0JraH-Saw1lOp_oMnlRObYs7jcLQ&s",
  },
  {
    id: "bluetooth-speaker",
    name: "Bluetooth Speaker",
    desc: "Portable sound, punchy bass.",
    price: 2499,
    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSqEe-hkykHW4CmE6fRzbujDLvr8FNnKFluY2ktvELWiw8exftaAcJRF5xFyBfTA7Lmwo7zMCew1qKSscgJseNfh9agraEnfrOuaxYwTAhYbQ-COkE2llU1",
  },
];

// Small helper used by several pages: turn 29999 into "₹29,999"
function formatPrice(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

// Find one product by its id (used on the Cart page)
function findProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}
