loadFeaturedProducts();
async function loadFeaturedProducts() {
  try {
    const res = await fetch(`${BASE_URL}/api/products?featured=true`);
    const products = await res.json();
    renderProducts(products);
  } catch (error) {
    console.log("Error Loading Featured:", error);
  }
}

function renderProducts(products) {
  const container = document.getElementById("featured-container");
  container.innerHTML = "";
  products.forEach(p => {
    container.innerHTML += `
          <a href="/product-detail.html?id=${p._id}"
            class="group block rounded-xl border border-slate-200 bg-white p-3 hover:shadow-md transition">
            <div class="aspect-square overflow-hidden rounded-lg bg-slate-100">
              <img src="${p.image}" alt="${p.name}"
                class="h-full w-full object-cover group-hover:scale-105 transition">
            </div>
            <div class="mt-2 space-y-1">
              <p class="text-xs uppercase tracking-wide text-slate-500">${p.category} Collection</p>
              <h3 class="text-sm font-semibold text-slate-900 line-clamp-1">${p.name}</h3>
              <p class="text-sm font-medium text-emerald-700">${p.price}</p>
              <p class="text-[11px] text-slate-500">Size: 2 No., 3 No.</p>
            </div>
          </a>
    `
  });
}

const links = document.querySelectorAll(".nav-link");
const menu = document.querySelector("#mobileMenu");
links.forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.add("hidden");
  });
});
