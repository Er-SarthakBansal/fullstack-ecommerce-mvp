async function loadCart(){
  const res = await fetch(`${BASE_URL}/api/cart/user123`);
  const data = await res.json();

  const container = document.getElementById("cart-container");
  container.innerHTML = "";
  const checkoutBtn = document.getElementById("checkout-btn");

  if(!data || data.items.length === 0){
    container.innerHTML = `
    <p class="pt-40 text-lg font-semibold text-gray-600" >Hey, it feels so light!<p>
    <p class="text-sm font-semibold text-gray-500">There is nothing in your bag.</p>
    <p class="text-sm font-semibold text-gray-500">Let's add some items.</p>
    `;
    checkoutBtn.classList.add("hidden");
    return;
  }
  let total=0;
  data.items.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${item.productId.name}</h3>
      <p>Price:${item.productId.price}</p>
      <p>Quantity:${item.quantity}</p>
      <button onclick="removeItem('${item.productId._id}')" class="text-red-400" >Remove</button>
      `;
      total += item.productId.price * item.quantity;
      div.className = "p-6";
      container.appendChild(div);
      checkoutBtn.classList.remove("hidden");
  });
  const totalDiv = document.createElement("h2");
  totalDiv.innerText = "Total Amount: ₹"+total;
  totalDiv.className = "pl-10 pt-4 font-bold";
  container.appendChild(totalDiv);
}
async function removeItem(productId){
    await fetch(`${BASE_URL}/api/cart/remove/${productId}`,{method:"DELETE"});
    location.reload();
}
loadCart();