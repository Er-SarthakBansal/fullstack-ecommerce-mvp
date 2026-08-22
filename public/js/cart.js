const cartLoading = document.getElementById("cart-loading");
async function loadCart() {
  cartLoading.classList.remove("hidden");
  document.getElementById("cart-container").innerHTML = "";
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login.html";
    return;
  }
  const res = await fetch(`${BASE_URL}/api/cart/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
    return;
  }
  const data = await res.json();
  renderCart(data);
}
function renderCart(data) {
  const container = document.getElementById("cart-container");
  container.innerHTML = "";
  const checkoutBtn = document.getElementById("checkout-btn");

  if (!data || data.items.length === 0) {
    container.innerHTML = `
    <div class="py-16 sm:py-20 text-center">
      <p class="text-lg sm:text-xl font-semibold text-gray-600">
        Hey, it feels so light!
      </p>
      <p class="mt-2 text-sm sm:text-base font-semibold text-gray-500">
        There is nothing in your bag.
      </p>
      <p class="text-sm sm:text-base font-semibold text-gray-500">
        Let's add some items.
      </p>
    </div>
    `;
    cartLoading.classList.add("hidden");
    return;
  }
  checkoutBtn.classList.remove("hidden");
  checkoutBtn.classList.add("block");
  let total = 0;
  data.items.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
  <div class="flex gap-4 p-4 border-b border-slate-200">

    <!-- Product Image -->
    <div class="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-slate-100">
      <img
        src="${item.productId.image}"
        alt="${item.productId.name}"
        class="w-full h-full object-cover"
      >
    </div>

    <!-- Product Info -->
    <div class="flex-1 min-w-0">
      <h3 class="font-semibold text-slate-900 truncate">
        ${item.productId.name}
      </h3>

      <p class="mt-1 text-sm text-slate-500">
        ₹${item.productId.price}
      </p>

      <p class="mt-1 text-sm text-slate-500">
        Quantity: ${item.quantity}
      </p>

      <button
        onclick="removeItem('${item.productId._id}')"
        class="mt-2 text-sm text-red-500 hover:text-red-700">
        Remove
      </button>
    </div>

  </div>
`;
    total += item.productId.price * item.quantity;
    div.className = "p-6";
    container.appendChild(div);
  });
  const totalDiv = document.createElement("h2");
  totalDiv.innerText = "Total Amount: ₹" + total;
  totalDiv.className = "pl-10 pt-4 font-bold";
  container.appendChild(totalDiv);
  cartLoading.classList.add("hidden");
}
async function removeItem(productId) {
  const res = await fetch(`${BASE_URL}/api/cart/remove/${productId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }
  await loadCart();
}
loadCart();
