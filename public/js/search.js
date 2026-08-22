const openSearchBtn = document.getElementById('openSearchBtn');
const backBtn = document.getElementById('backBtn');
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById('searchInput');
const searchSection = document.querySelector('.search-section');
const searchForm = document.getElementById("searchForm");
function openSearch() {
  searchSection.classList.remove('hidden');
  searchInput.focus();
}
function closeSearch() {
  searchSection.classList.add('hidden');
}
function handleSearch() {
  const query = searchInput.value.trim();
  if (query === "") {
    return;
  }
  window.location.href = `/products.html?q=${encodeURIComponent(query)}`;
}
openSearchBtn.addEventListener('click', openSearch);
backBtn.addEventListener('click', closeSearch);
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  handleSearch();
});
