//allez chercher les paramètre dans l'url
let urlparam = new URLSearchParams(window.location.search);
let idProduct = urlparam.get("id");

//appel API pour un seul produit (idProduct)
fetch("http://localhost:3000/api/products/" + idProduct).then(
  async (result) => {
    //réccupération de la réponse
    const response = await result.json();
    console.log(response);
    //injection des informations produits
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
    //réccupération du select dans le HTML
    let colors = document.getElementById("colors");
    console.log(colors);
    const colorsArray = response.colors;
    console.log(colorsArray);
    //on boucle dans le tableau colorsArray
    colorsArray.forEach((color) => {
      console.log(color);
      let option = document.createElement("option");
      option.value = color;
      option.innerHTML = color;
      colors.appendChild(option);
    });
  }
);

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
