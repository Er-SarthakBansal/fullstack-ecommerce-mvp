const openSearchBtn = document.getElementById('openSearchBtn');
const backBtn = document.getElementById('backBtn');
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById('searchInput');
const searchSection = document.querySelector('.search-section');
function openSearch() {
  searchSection.classList.remove('hidden');
  searchInput.focus();
}
function closeSearch() {
  searchSection.classList.add('hidden');
}
function handleSearch(){
  const query = searchInput.value.trim();
  searchInput.innerHTML = "";
  if(query === ""){
    return;
  }
  window.location.href = `/products.html?q=${encodeURIComponent(query)}`; 
}
openSearchBtn.addEventListener('click', openSearch);
backBtn.addEventListener('click', closeSearch);
searchBtn.addEventListener('click',handleSearch);
