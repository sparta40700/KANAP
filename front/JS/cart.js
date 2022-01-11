/*const cart = () => {
  let cart = document.getElementsByClassName("cart__order");
  let firstNameStorage = localStorage.getItem("firstName");

  if (firstNameStorage == null) {
    cart.innerHTML = "bienvenue dans votre panier";
  } else {
    cart.innerHTML = "bonjour ${firstNameStorage}";
  }
};
function submit() {
  let prenom = document.getElementById("firstName").value;
  localStorage.setItem("firstNameStorage", pseudo);
}*/
const cart = document.getElementById("cart__items");
const products = getProductFromLocalStorage();
console.log(products);
if (products) {
  for (const [id, color] of Object.entries(products)) {
    console.log(id);
    let productfromapi = fetch("http://localhost:3000/api/products/" + id).then(
      async (result) => {
        const response = await result.json();
        console.log(response);
        cart.innerHTML += `<article
                class="cart__item"
                data-id="${response._id}"
                data-color="${color}"
              >
                <div class="cart__item__img">
                  <img
                    src="${response.imageUrl}"
                    alt="${response.altTxt}"
                  />
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${response.name}</h2>
                    <p>${color}</p>
                    <p>${response.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :</p>
                      <input
                        type="number"
                        class="itemQuantity"
                        name="itemQuantity"
                        min="1"
                        max="100"
                        value="42"
                      />
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
      }
    );
  }
} else {
}

/*
regardez sur index.js pour l'injection dans le HTML*/
