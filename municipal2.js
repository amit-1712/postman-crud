

// //////////////////Getting Municipal List\\\\\\\\\\\\\\\\\\

let getData = () => {

    url = "http://13.234.120.2:5000/api/municipals/list";


    params = {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + localStorage.token
        }
    };
    fetch(url, params)
        .then((res => {
            return res.json();
        }))
        .then(data => {

            let municipals = data.data;

            municipals.map((municipal,index) => {
                document.getElementById("municipal-list").innerHTML += `
           <div class="list-municipal" style="margin:2rem">
           <h4 style="position:relative;right:150px;top:40px; color:blue">${index+1}:-</h4>
           <h3 class="munci-name"">${municipal.municipalName}</h3>
           <div class = "municipal-box">
           <button id="municipal-edit" onclick="editMunicipal('${municipal._id}')" data-toggle="modal" data-target="#modelId" style="position:relative;left:240px;bottom:35px; padding: 0.4rem 2rem; margin-left: 7rem; border-radius:10px" >
           <i class="fa fa-solid fa-pencil"></i>
            </button>

           <button id="municipal-delete" onclick="deleteMunicipal('${municipal._id}')" style="position:relative;left:250px;bottom:35px; padding: 0.4rem 2rem;border-radius:10px">
           <i class="fa fa-solid fa-trash"></i>
           </button>
           <button onclick="viewWard('${municipal._id}')" style="position:relative;left:260px;bottom:35px; padding: 0.4rem 2rem; border-radius:10px"><i class="fa fa-solid fa-street-view"></i></button>
           </div>
            </div>
           `
            });
        });

}

getData();



function editMunicipal(id) {

    localStorage.setItem("municipalId", id);
}

// ///////////////////Delete Municipal Name\\\\\\\\\\\\\\\\\\\\\

function deleteMunicipal(id) {

    // console.log(id);

    url = "http://13.234.120.2:5000/api/municipals/delete";

    if (confirm("Are you sure you want to Delete this Municipal!!")) {

        data = {
            "municipalId": id
        }

        params = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body: JSON.stringify(data)
        };
        fetch(url, params)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                if (data.status) {
                    location.reload();
                }
            });
    }

}

// /////////////////Edit Municipal Name\\\\\\\\\\\\\\\\\

document.getElementById("municipal-edit").addEventListener("submit", (e) => {

    e.preventDefault();

    let id = localStorage.getItem("municipalId");
    let name = document.getElementById("municipal-name").value;

    url = "http://13.234.120.2:5000/api/municipals/edit";

    if (confirm("Are you sure you want to edit Municipal Name!!")) {

        data = {
            "municipalId": id,
            "municipalName": name
        }

        params = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body: JSON.stringify(data)
        };
        fetch(url, params)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                if (data.status) {
                    location.reload();
                }
            });
    }


});

// ////////////// Search Box \\\\\\\\\\\\\\\\\

document.getElementById("search-box").addEventListener("submit", (e) => {

    e.preventDefault();

    let search = (document.getElementById("searching-text").value).toLowerCase();
    let ar = search.split(" ");



    document.getElementById("municipal-list-search").innerHTML = ``;

    if (search) {


        document.getElementById("municipal-list").style.display = "none";

        url = "http://13.234.120.2:5000/api/municipals/list";


        params = {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + localStorage.token
            }
        };
        fetch(url, params)
            .then((res => {
                return res.json();
            }))
            .then(data => {

                let municipals = data.data;
                let name = "";

                municipals.map(municipal => {
                    let c = 0;

                    name = (municipal.municipalName).toLowerCase();

                    let arr = name.split(" ");
                    // console.log(arr);

                    for (let i = 0; i < ar.length; i++) {
                        if (ar[i] === arr[i] || (ar[i] + ",") === arr[i]) {
                            c++;
                        }
                    }

                    // console.log(c);

                    if (c === ar.length) {
                        document.getElementById("municipal-list-search").innerHTML += `
                    <div class="list-municipal" >
                    <div class="munci-name" onclick="viewWard('${municipal._id}')">${municipal.municipalName}</div>
                    <div class = "municipal-box">
                    <button id="municipal-edit" onclick="editMunicipal('${municipal._id}')" data-toggle="modal" data-target="#modelId">
                    <img class="img-edit" src="photos/pencil.png" alt="edit" width="24px" height="30px">
                        </button>
        
                    <button id="municipal-delete" onclick="deleteMunicipal('${municipal._id}')">
                    <img class="img-delete" src="photos/delete.png" alt="delete" width="24px" height="30px">
                    </button>
        
                    </div>
                        </div>
                    `
                    }

                });
            });

    } else {
        location.reload();
    }
})

// ////////////////// Add Municipal \\\\\\\\\\\\\\\\\\\\\

document.getElementById("municipal-add").addEventListener("submit", (e) => {

    e.preventDefault();

    let name = document.getElementById("new-municipal-name").value;

    url = "http://13.234.120.2:5000/api/municipals/create";

    if (confirm("Are you sure you want to Add this Municipal!!")) {

        data = {
            "municipalName": name
        }

        params = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body: JSON.stringify(data)
        };
        fetch(url, params)
            .then(res => {
                return res.json();
            })
            .then(data => {
                // console.log(data);
                if (data.status) {
                    location.reload();
                }
            });
    }
});

// ////////////////// View Ward \\\\\\\\\\\\\\\

let viewWard = (id) => {

    // console.log(id);
    localStorage.setItem("municipalId", id);
    location.href = "ward.html";
}

