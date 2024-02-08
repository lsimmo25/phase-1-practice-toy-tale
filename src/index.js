let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");
  const toyForm = document.querySelector(".add-toy-form");
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // Handle Submit
  function handleSubmit(e) {
    e.preventDefault();
    let toyObj = {
      name: toyForm.name.value,
      image: toyForm.image.value,
      likes: 0,
    };
    submitToy(toyObj);
  }

  toyForm.addEventListener("submit", handleSubmit);

  // GET Request
  function fetchToys() {
    fetch("http://localhost:3000/toys")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        data.forEach(toy => {
          renderToy(toy);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  function renderToy(toy) {
    const card = document.createElement("div");
    card.classList.add("card");
    toyCollection.appendChild(card);
    const name = document.createElement("h2");
    name.textContent = toy.name;
    name.id = "toy-header img";
    card.appendChild(name);
    const img = document.createElement("img");
    img.src = toy.image;
    img.classList.add("toy-avatar");
    card.appendChild(img);
    const p = document.createElement("p");
    p.textContent = `${toy.likes} likes`;
    card.appendChild(p);
    const btn = document.createElement("button");
    btn.classList.add("like-btn");
    btn.textContent = "Like ❤️";
    card.appendChild(btn);

    btn.addEventListener("click", () => {
      // event listener for like button
      toy.likes++;
      p.textContent = `${toy.likes} likes`;

      updateLikes(toy);
    });
  }

  //PATCH request

  function updateLikes(toy) {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({likes: toy.likes})
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
  }

  // POST Request
  function submitToy(toyObj) {
    fetch(`http://localhost:3000/toys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(toyObj),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        toyCollection.innerHTML = "";
        fetchToys();
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchToys();
});
