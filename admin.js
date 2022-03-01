

getData();

// <<<<<<<<<<<user Adding>>>>>>>>>>>>>>>>>>>>>>>>></user>


const useradder = document.getElementById("useradder");

useradder.addEventListener("click", function (e) {
  e.preventDefault();

  document.getElementById("demobtn").click();
});

savebtn.addEventListener("click", function () {
  let url = "http://13.234.120.2:5000/api/auth/register";
  const names = document.getElementById("names");
  const usercontent = document.getElementById("usercontent");
  const passwordcontent = document.getElementById("passwordcontent");
  const role = document.getElementById("role");

  console.log(usercontent.value);

  data = {
    name: names.value,
    username: usercontent.value,
    password: passwordcontent.value,
    role: role.value,
  };

  params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.token,
    },
    body: JSON.stringify(data),
  };
  fetch(url, params)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.status) {
        location.reload();
      }
      getData();

      console.log(data);
    });
});


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<getting data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


function getData() {
  //   e.preventDefault();
  let url = "http://13.234.120.2:5000/api/auth/get-users";

  params = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.token,
    },
  };

  fetch(url, params)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let arr = data.data.users;

      let html = "";

      arr.map((element) => {
        html += ` <tr class="table" style="margin: 4rem; background-color: lightblue; width: 300px; height: 50px; border-radius: 2px; margin-top:2rem">
                  <td class="username text-center" style="display: flex;align-items: center; justify-content: center;">${element.name}</td>
                  <div class="button" style="margin-left: 6rem;">
                  <td><button id="editbtn btn-primary" style="position: relative; left: 210px; bottom: 35px;;padding: .5rem 2rem; border-radius: 10px;" onclick="editbtn('${element.username}')"><i class="fa fa-solid fa-pen"></i></button></td>
                  <td><button id="deletbtn " style="position: relative; left: 220px; bottom: 35px; background-color:lightgreen;padding:.5rem 1.5rem ; border-radius: 10px;" onclick="changepasswordbtn('${element.username}')" ><i class="fa fa-solid fa-key"></i></button></td>
              </div>
              </tr>`;

        document.getElementById("content").innerHTML = html;

      });
    });
}

getData();


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<edit button>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function editbtn(username){
  
  localStorage.setItem("username",username );
  document.getElementById("staticdrop").click();
}

changeuser.addEventListener("click",function(e){
  e.preventDefault();
 
  let username = localStorage.getItem("username")
  document.getElementById("content").style.display = "none";
  
  const updatedname = document.getElementById("updatedname");
  console.log(updatedname);
  
  


    url = "http://13.234.120.2:5000/api/auth/update-name";

    data = {
      "username" : username,
      "name" : updatedname.value

    };

    params = {
      method: "POST",
      headers: {

        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.token,
      },
      body:JSON.stringify(data)
    };

    fetch(url, params)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if(data.status){
          location.reload();
      }
        
      });


})
getData();



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<changing password>>>>>>>>>>>>>>>>>>>>>></changing>



function changepasswordbtn(password){
  
  
   localStorage.setItem("password", password);
   $("#getCodeModal").modal("show");



}




document.getElementById("passwordchange").addEventListener("click",function(e){

  e.preventDefault();
 
  let password = localStorage.getItem("password");
  
  const updatedpassword = document.getElementById("changingpassword");
  
  


    url = "http://13.234.120.2:5000/api/auth/update-password";

    data = {
      username : password,
      password : updatedpassword.value

    };

    params = {
      method: "POST",
      headers: {

        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.token,
      },
      body:JSON.stringify(data)
    };

    fetch(url, params)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        getData();
        
      });


});




const searchbutton = document.getElementById("searchbutton");

searchbutton.addEventListener("click",function(e){
  e.preventDefault();

  let search = (document.getElementById("searchinput").value).toLowerCase();
  let ar = search.split(" ");
  

  if(search){
    document.getElementById("content").style.display = "none";

    url = "http://13.234.120.2:5000/api/auth/get-users";


        params = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.token
            }
        };
        fetch(url, params)
        .then((res => {
            return res.json();
        }))
        .then(data=>{
          
          let results = data.data.users;
          console.log(data);

          results.map(result =>{
            let c = 0; 

            let name = result.username;
            console.log(name);
            let arr = name.split(" ");

            for(let i = 0; i<ar.length; i++){
              if(ar[i]===arr[i] || (ar[i]+ ",")===arr[i] ) {
                c++
              }

            }
            console.log(c);
            console.log(ar.length);
            console.log(arr.length);
            if(c===ar.length){
              document.getElementById("extracontent").innerHTML +=` <tr class="table" style="margin: 4rem; background-color: lightblue; width: 300px; height: 50px; border-radius: 2px; margin-top:2rem">
              <td class="username text-center" style="display: flex;align-items: center; justify-content: center;">${result.username}</td>
              <div class="button" style="margin-left: 6rem;">
              <td><button id="editbtn btn-primary" style="position: relative; left: 210px; bottom: 35px;;padding: .5rem 2rem; border-radius: 10px;" ><i class="fa fa-solid fa-pen"></i></button></td>
              <td><button  style="position: relative; left: 220px; bottom: 35px; background-color:lightgreen;padding:.5rem 1.5rem ; border-radius: 10px;"  ><i class="fa fa-solid fa-key"></i></button></td>
          </div>
          </tr>`




            }
            // else{
            //   location.reload();
            // }
            

            
            
            

          })
          
        })


  }

  
  

 







})

  

