let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  
  function getToys() {
    return fetch("http://localhost:3000/toys").then(function(response) {
      return response.json();
    });
  }
  
  function postToy(toy) {
    return fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": toy.name,
        "image": toy.image,
        "likes": 0
      })
    }).then(function(response) {
      return response.json();
    }).then(function(object) {
      let h2 = document.createElement("h2");
      h2.innerText = object.name;
      
      let img = document.createElement("img");
      img.setAttribute("src", object.image);
      img.setAttribute("class", "toy-avatar");
      
      let p = document.createElement("p");
      p.innerText = `${object.likes} likes`;
      
      let btn = document.createElement("button");
      btn.setAttribute("class", "like-btn");
      btn.setAttribute("id", object.id);
      btn.innerText = "like";
      btn.addEventListener("click", function(event) {
        console.log(event.target.dataset);
        likes(event);
      });
      
      let divCard = document.createElement("div");
      divCard.setAttribute("class", "card");
      divCard.append(h2, img, p, btn);
      document.querySelector().append(divCard);
    });
  }
});
