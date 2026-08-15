function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed top-5 right-5 z-50 flex flex-col gap-2';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    
    // Define distinct background and text colors for success vs error
    const styling = type === 'success' 
        ? 'bg-green-100 text-green-800 border border-green-300' 
        : 'bg-red-100 text-red-800 border border-red-300';
    
    toast.className = `min-w-[250px] px-4 py-3 rounded-lg font-medium shadow-lg transition-all duration-300 transform -translate-y-5 opacity-0 ${styling}`;
    toast.textContent = message;
    
    container.appendChild(toast);

    // Trigger smooth entrance
    requestAnimationFrame(() => {
        toast.classList.remove('-translate-y-5', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
    });

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('-translate-y-5', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
const signupForm = document.getElementById("signupForm").addEventListener('submit', async(e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try{
    const response = await fetch(`${BASE_URL}/api/auth/signup`,{
      method : 'POST',
      headers : {'Content-Type':'application/json'},
      body: JSON.stringify({email,password})
    });

    const data = await response.json();
    
    if(response.ok){
      showToast('Account created successfully! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = "/login.html";
      },1500);
    }else{
      showToast(data.message , 'error');
    }
  }catch(err){
    showToast('An unexpected error occurred.', 'error');
  }
});