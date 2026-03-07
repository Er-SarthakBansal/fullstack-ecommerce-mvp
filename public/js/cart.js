async function loadCart(){
  const res = await fetch("http://localhost:5000/api/cart/user123");
  const data = await res.json();

  const container = document.getElementById("cart-container");
  container.innerHTML = "";

  if(!data || data.items.length === 0){
    container.innerHTML = "<p>Cart is Empty</p>";
    return;
  }
  let total=0;
  data.items.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${item.productId.name}</h3>
      <p>Price:${item.productId.price}</p>
      <p>Quantity:${item.quantity}</p>
      <button onclick="removeItem('${item.productId._id}')">Remove</button>
      `;
      total += item.productId.price * item.quantity;
      div.className = "p-6";
      container.appendChild(div);
  });
  const totalDiv = document.createElement("h2");
  totalDiv.innerText = "Total Amount: ₹"+total;
  totalDiv.className = "pl-10 pt-4 font-bold";
  container.appendChild(totalDiv);
}
async function removeItem(productId){
    await fetch(`http://localhost:5000/api/cart/remove/${productId}`,{method:"DELETE"});
    location.reload();
}
loadCart();