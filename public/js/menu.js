const menuButton = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');
const menuPanel = document.getElementById('menuPanel');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const login = document.getElementById('login');

function isLogin(){
  if(localStorage.getItem("token")){
    login.textContent = "Logout";

    login.onclick = () => {
      login.textContent = "Login";
      localStorage.removeItem("token");
      isLogin();
    };
  }else{
    login.onclick = () => {
      window.location.href = "/login.html";
    };
  }
}
isLogin();
function openMenu() {
  mobileMenu.classList.remove('hidden');

  requestAnimationFrame(() => {
    menuPanel.classList.remove('translate-x-full');
    menuPanel.classList.add('translate-x-0');
  });
}
function closeMenu() {
  menuPanel.classList.remove('translate-x-0');
  menuPanel.classList.add('translate-x-full');
  setTimeout(() => {
    mobileMenu.classList.add('hidden');
  }, 300);
}
menuButton.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);
