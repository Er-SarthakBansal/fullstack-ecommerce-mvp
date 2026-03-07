// const { json } = require("express");

// Get product id from URL: product.html?id=123
const id = new URLSearchParams(window.location.search).get("id");

// DOM elements
const breadcrumb = document.getElementById("breadcrumb-name");
const productName = document.getElementById("product-name");
const category = document.getElementById("product-category");
const productImg = document.getElementById("product-image");
const shortDescription = document.getElementById("short-description");
const price = document.getElementById("actual-price");
const mrp = document.getElementById("mrp");
const discount = document.getElementById("discount-percentage");
const fabric = document.getElementById("fabric");
const work = document.getElementById("work");
const idealFor = document.getElementById("ideal-for");
const includes = document.getElementById("includes");
const description = document.getElementById("description");
const whatsappBtn = document.getElementById("whatsapp-btn");
const addToCartBtn = document.getElementById("add-to-cart-btn");

if(!id){
  productName.textContent = "Product Not Found";
}else{
  loadProduct();
}

async function loadProduct(){
  try{
    const res = await fetch(`/api/products/${id}`);
    if(!res.ok) throw new Error("Failed to Fetch Product");
    const product = await res.json();

    breadcrumb.textContent = product.name;
    productName.textContent = product.name;
    productImg.src = product.image;
    productImg.alt = product.name;
    category.textContent = formatCategory(product.category);
    shortDescription.textContent = product.shortDescription;
    description.textContent = product.Description;
    price.textContent = `₹${product.price}`;

    if(product.mrp && product.mrp>product.price){
      mrp.textContent = product.mrp;
      const off = Math.round(((product.mrp)-(product.price))/(product.mrp)*100);
      discount.textContent = `${off}% OFF`
    }
    fabric.textContent = product.fabric;
    work.textContent = product.work;
    includes.textContent = product.includes;
    description.textContent = product.description;

    // WhatsApp order link
    const shopPhone = "916398165279";
    const waText = encodeURIComponent(
      `Jai Shree Krishna 🙏\nI want to order this product:\n${product.name}\nPrice: ₹${product.price}\nProduct ID: ${product._id}`
    );
    whatsappBtn.href = `https://wa.me/${shopPhone}?text=${waText}`;

    addToCartBtn.addEventListener("click",()=>addToCart(product));

  }catch(err){
    console.log(err);
    productName.textContent = "Unable to load product";
  }
  function formatCategory(cat){
    if(!cat) return "";
    const map = {
      winter:"winter collection",
      daily:"daily wear",
      festive:"festive collection",
      accessory:"accessory"
    };
    return map[cat]|| cat;
  }
}
// function addToCart(product){
//   const key = "lg_cart";
//   const existing = JSON.parse(localStorage.getItem(key)||"[]");
//   const index = existing.findIndex(item => item._id === product._id );
//   if(index>=0){
//     existing[index].qty += 1;
//   }else{
//     existing.push({...product, qty:1 });
//   }
//   localStorage.setItem(key, JSON.stringify(existing));
//   alert("Added to cart ✅");
// }

async function addToCart(product){
  try{
    await fetch("/api/cart/add",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        userId:"user123",
        productId: product._id
      })
    });
  }catch (error) {
    console.error("Error adding to cart:", error);
  }
}
