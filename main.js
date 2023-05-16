let API = "http://localhost:8000/product";

let name = document.querySelector(".inp-name");
let number = document.querySelector(".inp-number");
let btnCreate = document.querySelector(".create-btn");

let list = document.querySelector(".list");

let search = document.querySelector(".navbar-inp");
let searchVal = "";

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
    card.innerHTML = `<img src="https://storage.fabrikamaek.ru/images/0/1/1525/1525399/previews/people_16_womanshortfull_back_white_500.jpg"><div class ="card-title"><h2>${element.name}</h2>
    <h4>${element.number}</h4></div>
    <div class = "card-btn">
    <button onclick="deleteElement(${element.id})">Delete</button>
    <button>Edit</button></div>`;
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
