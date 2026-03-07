const openSearchBtn = document.getElementById('openSearchBtn');
const backBtn = document.getElementById('backBtn');
const searchInput = document.getElementById('searchInput');
const searchSection = document.querySelector('.search-section');
function openSearch() {
  searchSection.classList.remove('hidden');
  searchInput.focus();
}
function closeSearch() {
  searchSection.classList.add('hidden');
}
openSearchBtn.addEventListener('click', openSearch);
backBtn.addEventListener('click', closeSearch);