document.addEventListener("DOMContentLoaded", () => {
  loadProductsByCategory();
})
async function loadProductsByCategory() {
  try {
    const winterRes = await fetch(`${BASE_URL}/api/products?category=winter`);
    const winterProducts = await winterRes.json();
    renderWinter(winterProducts);
    const festiveRes = await fetch(`${BASE_URL}/api/products?category=festive`);
    const festiveProducts = await festiveRes.json();
    renderFestive(festiveProducts);
    const dailyRes = await fetch(`${BASE_URL}/api/products?category=daily`);
    const dailyProducts = await dailyRes.json();
    renderDaily(dailyProducts);
    const accessoryRes = await fetch(`${BASE_URL}/api/products?category=accessory`);
    const accessoryProducts = await accessoryRes.json();
    renderAccessory(accessoryProducts);

    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  } catch (err) {
    console.log("Category Products Loading Error:", err);
  }
}
function renderWinter(winterProducts) {
  const winterContainer = document.getElementById("winter-container");
  winterContainer.innerHTML = "";
  winterProducts.forEach(p => {
    winterContainer.innerHTML += `
        <a href="/product-detail.html?id=${p._id}"
          class="group block border border-slate-200 bg-white p-3 rounded-xl hover:shadow-md transition">
          <div class="aspect-square rounded-lg bg-slate-100 overflow-hidden">
            <img src="${p.image}" alt="${p.name}"
              class="h-full w-full object-cover group-hover:scale-105 transition ">
          </div>
          <div class="mt-2 space-y-1">
            <p class="uppercase text-xs tracking-wide text-slate-500">${p.category} collection</p>
            <h3 class="text-sm font-semibold text-slate-900 line-clamp-1">${p.name}</h3>
            <p class="text-sm font-medium text-emerald-700">${p.price}</p>
            <p class="text-[11px] text-slate-500">Size: 2 No., 3 No.</p>
          </div>
        </a>`
  });
}
function renderFestive(festiveProducts) {
  const festiveContainer = document.getElementById("festive-container");
  festiveContainer.innerHTML = "";
  festiveProducts.forEach(p => {
    festiveContainer.innerHTML +=
      `<a href="/product-detail.html?id=${p._id}"
            class="group block border border-slate-200 bg-white p-3 rounded-xl hover:shadow-md transition">
            <div class="aspect-square rounded-lg bg-slate-100 overflow-hidden">
              <img src="${p.image}" alt="${p.name}"
                class="h-full w-full object-cover group-hover:scale-105 transition ">
            </div>
            <div class="mt-2 space-y-1">
              <p class="uppercase text-xs tracking-wide text-slate-500">${p.category} collection</p>
              <h3 class="text-sm font-semibold text-slate-900 line-clamp-1">${p.name}</h3>
              <p class="text-sm font-medium text-emerald-700">${p.price}</p>
              <p class="text-[11px] text-slate-500">Size: 2 No., 3 No.</p>
            </div>
          </a>`;
  });
}
function renderDaily(dailyProducts) {
  const dailyContainer = document.getElementById("daily-container");
  dailyContainer.innerHTML = "";
  dailyProducts.forEach(p => {
    dailyContainer.innerHTML += `
          <a href="/product-detail.html?id=${p._id}"
            class="group block border border-slate-200 bg-white p-3 rounded-xl hover:shadow-md transition">
            <div class="aspect-square rounded-lg bg-slate-100 overflow-hidden">
              <img src="${p.image}" alt="${p.name}"
                class="h-full w-full object-cover group-hover:scale-105 transition ">
            </div>
            <div class="mt-2 space-y-1">
              <p class="uppercase text-xs tracking-wide text-slate-500">${p.category} collection</p>
              <h3 class="text-sm font-semibold text-slate-900 line-clamp-1">${p.name}</h3>
              <p class="text-sm font-medium text-emerald-700">${p.price}</p>
              <p class="text-[11px] text-slate-500">Size: 2 No., 3 No.</p>
            </div>
          </a>`
  });
}
function renderAccessory(accessoryProducts) {
  const accessoryContainer = document.getElementById("accessory-container");
  accessoryContainer.innerHTML = "";
  accessoryProducts.forEach(p => {
    accessoryContainer.innerHTML += `
          <a href="/product-detail.html?id=${p._id}"
            class="group block border border-slate-200 bg-white p-3 rounded-xl hover:shadow-md transition">
            <div class="aspect-square rounded-lg bg-slate-100 overflow-hidden">
              <img src="${p.image}" alt="${p.name}"
                class="h-full w-full object-cover group-hover:scale-105 transition ">
            </div>
            <div class="mt-2 space-y-1">
              <p class="uppercase text-xs tracking-wide text-slate-500">${p.category}</p>
              <h3 class="text-sm font-semibold text-slate-900 line-clamp-1">${p.name}</h3>
              <p class="text-sm font-medium text-emerald-700">${p.price}</p>
              <p class="text-[11px] text-slate-500">Size: 2 No., 3 No.</p>
            </div>
          </a>`
  });
}
