async function loadSummary(){
  const res = await fetch("http://localhost:5000/api/cart/user123");
  const data = await res.json();

  const orderSummary = document.getElementById("order-summary");
  let subTotal=0, shipFee=50 ,total=0;
  
  data.items.forEach(item => {
    const div = document.createElement("div");
    div.className = "flex justify-between py-2";
    div.innerHTML = `
      <span>${item.productId.name} x ${item.quantity}</span>
      <span>₹${item.productId.price * item.quantity}</span>
    `
    subTotal += item.productId.price * item.quantity;
    orderSummary.appendChild(div);
  });
  const subTotalDiv = document.createElement("h3");
  subTotalDiv.className = "flex justify-between pt-2 font-semibold  border-t";
  subTotalDiv.innerHTML = `<span>Subtotal</span><span>₹${subTotal}</span>`;
  orderSummary.appendChild(subTotalDiv);
  const shipping = document.createElement("h3");
  shipping.className = "flex justify-between pt-2 font-semibold text-gray-700"
  shipping.innerHTML = `<span>Shipping Fee</span><span>₹${shipFee}</span>`;
  orderSummary.appendChild(shipping);
  total = subTotal + 50;
  const totalDiv = document.createElement("h3");
  totalDiv.className = "flex justify-between pt-4 font-bold text-lg"
  totalDiv.innerHTML = `<span>Total Amount</span><span>${total}</span>`;
  orderSummary.appendChild(totalDiv);
}
loadSummary();