const loginForm = document.getElementById("loginForm");
loginForm.addEventListener('submit',async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try{
      const response = await fetch(`${BASE_URL}/api/auth/login`,{
        method:'POST',
        body:JSON.stringify({email,password}),
        headers:{'Content-Type':'application/json'}
      });
      const data = await response.json();
      if(response.ok){
        localStorage.setItem('token',data.token);
        window.location.href = 'index.html';
      }else{
        console.log("issue occur: ",data.message);
      }
  }catch(err){
    console.log('error occur: ',err);
  }

});