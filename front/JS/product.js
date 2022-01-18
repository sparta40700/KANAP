//URLsearchparams
//reccuper l'api product

//appeler img/desc/couleur/tittre et prix
let urlparam = new URLSearchParams(window.location.search);
console.log(new URLSearchParams(window.location.search));
console.log(urlparam.get("id"));
let idProduct = urlparam.get("id");

// localhost:3000/api/products/107fb5b75607497b96722bda5b504926
let productfromapi = fetch(
  "http://localhost:3000/api/products/" + idProduct
).then(async (result) => {
  const response = await result.json();
  console.log(response);
  let tittle = document.getElementById("title");
  console.log(tittle);
  tittle.innerHTML = response.name;

  let price = document.getElementById("price");
  console.log(price);
  price.innerHTML = response.price;

  let item__img = document.querySelector(".item__img img");
  console.log(item__img);
  item__img.setAttribute("src", response.imageUrl);
  item__img.setAttribute("alt", response.altTxt);

  let description = document.getElementById("description");
  console.log(description);
  description.innerHTML = response.description;
  let colors = document.getElementById("colors");
  console.log(colors);
  const colorsArray = response.colors;
  console.log(colorsArray);
  colorsArray.forEach((color) => {
    console.log(color);
    let option = document.createElement("option");
    option.value = color;
    option.innerHTML = color;
    colors.appendChild(option);
  });
});
const newLocal =
  '<img width="default" src="http://localhost:3000/api/products/"';
//rajouter un evenement au click sur le button add to cart
//mettre en place le traitement

/**********PANIER**********/
//select id product
const colorProduct = document.querySelector("option");
//select button add to cart
const btnaddtocart = document.querySelector("#addToCart");
//listen button add to cart
btnaddtocart.addEventListener("click", (Event) => {
  Event.preventDefault();
  console.log(colors.value);
  console.log(document.querySelector("#quantity").value);
  const quantity = document.querySelector("#quantity").value;
  if (quantity > 0 && quantity <= 100) {
    addtocart(idProduct, colors.value, quantity);
  }
});
// reccupération des données

/*let optionProducts = {
  name: idProduct.name,
  id_Product: idProduct._id,
  optionProducts: option,
  quantity: option /100,
  price: idProduct.price,
};

/**********LOCAL STORAGE************/

/*mypc = localStorage;
const localStorage = mypc;
let productfromapi = JSON.parse(localStorage.getItem("products"));
console.log(productfromapi);

if (productfromapi) {
} else {
  productfromapi = [];
  productfromapi.push(option);
  console.log(productfromapi);
  localstorage.setItem("products",JSON.stringify(productfromapi));
}*/
