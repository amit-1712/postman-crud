

// //////////////////Getting Ward List\\\\\\\\\\\\\\\\\\

let getData = () => {
  url = "http://13.234.120.2:5000/api/wards/list";
  let municipal = localStorage.municipalId;

  // console.log(municipal);

  data = {
    municipalId: municipal,
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
    .then((result) => {
      // console.log(result);
      let wards = result.data;
      wards.map((ward) => {
        document.getElementById("ward-box").innerHTML += `
           <div class="list-ward" style="margin:4rem">
           <h2  class="ward-name">${ward.wardName}</h2>
           <div class = "ward-inside-box">
           <button id="ward-edit" onclick="editWard('${ward.id}')" data-toggle="modal" data-target="#modelId" style="position:relative;left:220px;bottom:35px; padding: 0.4rem 2rem; margin-left: 7rem; border-radius:10px" >
           <i class="fa fa-solid fa-pencil"></i>
     
            </button>

           <button id="ward-delete" onclick="deleteWard('${ward.id}')" style="position:relative;left:250px;bottom:40px; padding: 0.4rem 2rem;border-radius:10px">
           <i class="fa fa-solid fa-trash"></i>
           </button>

           </div>
            </div>
           `;
      });
    });
};

getData();

function editWard(id) {
  localStorage.setItem("wardId", id);
}

// /////////////////// Delete Ward \\\\\\\\\\\\\\\\\\\\\

function deleteWard(id) {
  // console.log(id);

  url = "http://13.234.120.2:5000/api/wards/delete";

  if (confirm("Are you sure you want to Delete this Ward!!")) {
    data = {
      municipalId: localStorage.municipalId,
      wardId: id,
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
        // console.log(data);
        if (data.status) {
          location.reload();
        }
      });
  } else {
    location.reload();
  }
}

// ///////////////// Edit Ward Name \\\\\\\\\\\\\\\\\

document.getElementById("ward-edit").addEventListener("submit", (e) => {
  e.preventDefault();

  let id = localStorage.getItem("wardId");
  let name = document.getElementById("new-ward-name").value;
  let municipal = localStorage.municipalId;

  url = "http://13.234.120.2:5000/api/wards/edit";

  if (confirm("Are you sure you want to edit Ward Name!!")) {
    data = {
      municipalId: municipal,
      wardId: id,
      wardName: name,
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
        // console.log(data);
        if (data.status) {
          location.reload();
        }
      });
  }
});

// ////////////////// Add Municipal \\\\\\\\\\\\\\\\\\\\\

document.getElementById("ward-add").addEventListener("submit", (e) => {
  e.preventDefault();

  let name = document.getElementById("new-ward").value;

  url = "http://13.234.120.2:5000/api/wards/create";

  if (confirm("Are you sure you want to Add this Ward!!")) {
    data = {
      municipalId: localStorage.municipalId,
      wardName: name,
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
        // console.log(data);
        if (data.status) {
          location.reload();
        }
      });
  }
});

// ////////////// Search Box \\\\\\\\\\\\\\\\\

document.getElementById("search-box").addEventListener("submit", (e) => {
  e.preventDefault();

  let search = document.getElementById("searching-text").value.toLowerCase();
  let ar = search.split(" ");

  document.getElementById("ward-list-search").innerHTML = ``;

  if (search) {
    document.getElementById("ward-box").style.display = "none";

    url = "http://13.234.120.2:5000/api/wards/list";
    let municipal = localStorage.municipalId;

    // console.log(municipal);

    data = {
      municipalId: municipal,
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
        // console.log(data);
        let wards = data.data;
        let name = "";

        wards.map((ward) => {
          let c = 0;

          name = ward.wardName.toLowerCase();

          let arr = name.split(" ");
          // console.log(arr);

          for (let i = 0; i < ar.length; i++) {
            if (ar[i] === arr[i] || ar[i] + "," === arr[i]) {
              c++;
            }
          }

          // console.log(c);

          if (c === ar.length) {
            document.getElementById("ward-list-search").innerHTML += `
           <div class="list-ward">
           <div class="ward-name">${ward.wardName}</div>
           <div class = "ward-inside-box">
           <button id="ward-edit" onclick="editWard('${ward.id}')" data-toggle="modal" data-target="#modelId">
           <img class="img-edit" src="photos/pencil.png" alt="edit" width="24px" height="30px">
            </button>

           <button id="ward-delete" onclick="deleteWard('${ward.id}')">
           <img class="img-delete" src="photos/delete.png" alt="delete" width="24px" height="30px">
           </button>

           </div>
            </div>
           `;
          }
        });
      });
  } else {
    location.reload();
  }
});

