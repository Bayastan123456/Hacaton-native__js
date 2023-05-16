let API = "http://localhost:8000/product";

let name = document.querySelector(".inp-name");
let number = document.querySelector(".inp-number");
let btnCreate = document.querySelector(".create-btn");

let editName = document.querySelector(".inp-modal-name");
let editNumber = document.querySelector("inp-modal-number");

let list = document.querySelector(".list");

let search = document.querySelector(".navbar-inp");
let searchVal = "";

let modal = document.querySelector(".modal");
let container = document.querySelector(".container");

btnCreate.addEventListener("click", async function () {
  if (!name.value.trim() || !number.value.trim()) {
    alert("Заполните поля");
    return;
  }
  let obj = {
    name: name.value,
    number: number.value,
  };
  console.log(obj);

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  });
  name.value = "";
  number.value = "";

  render();
});

async function render() {
  let fotbolka = await fetch(`${API}?q=${searchVal}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
  list.innerHTML = "";
  console.log(fotbolka);
  fotbolka.forEach((element) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<img src="https://storage.fabrikamaek.ru/images/0/1/1525/1525399/previews/people_16_womanshortfull_back_white_500.jpg"><div class ="card-title"><h4>${element.name}</h4>
    <h2>${element.number}</h2></div>
    <div class = "card-btn">
    <button onclick="deleteElement(${element.id})">Delete</button>
    <button onclick="editElement(${element.id})">Edit</button></div>`;
    list.append(card);
  });
}
render();

async function deleteElement(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  render();
}
search.addEventListener("input", (e) => {
  searchVal = e.target.value;
  render();
});

async function editElement(id) {
  modal.style.display = "block";
  container.style.display = "none";

  fetch(`${API}/${id}`)
    .then((res) => res.json())
    .then((data) => {
      editName.value = data.name;
      editNumber.value = data.number;
    });
}
