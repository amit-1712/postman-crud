
const loginbtn = document.getElementById("loginbtn");


loginbtn.addEventListener("click", function (e){

  e.preventDefault();
    
  url = "http://13.234.120.2:5000/api/auth/login";

  let username = document.getElementById("checkuser").value;
  let password = document.getElementById("checkpassword").value;

  data= {
      "username": username,
      "password": password
  }

  params = {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  };

  fetch(url, params)
  .then((res => {
      // console.log(res.json());
      return res.json();
  }))
  .then(data => {
      alert(data.message);
      if(data.status){
          
          localStorage.setItem("token", data.data.token);
          location.href = "./admin.html"
      }
      
  })


}

)
  










