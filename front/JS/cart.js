const cart = document.getElementById("cart__items");
const products = getProductFromLocalStorage();
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");
console.log(totalPrice);
console.log(totalQuantity);
console.log(products);
if (products) {
  for (const [id, colors] of Object.entries(products)) {
    for (const [color, count] of Object.entries(colors)) {
      console.log(id);
      let productfromapi = fetch(
        "http://localhost:3000/api/products/" + id
      ).then(async (result) => {
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
                    <p>${response.price} €</p>
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
                        value="${count}"
                      />
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;

        //CALCUL TOTAL
        totalQuantity.innerHTML = count;
        const priceTotal = response.price * count;
        totalPrice.innerHTML = priceTotal;
        //MODIF PANIER
        const itemsQuantity = document.getElementsByClassName("itemQuantity");
        console.log(itemsQuantity);
        Object.values(itemsQuantity).forEach((item) => {
          item.addEventListener("change", (Event) => {
            console.log(item.value);
            const itemId = item.closest("article").getAttribute("data-id");
            console.log(itemId);
            const itemColor = item
              .closest("article")
              .getAttribute("data-color");
            console.log(itemColor);
            if (item.value > 0 && item.value <= 100) {
              countProduct(itemId, item.value, itemColor);
            }
          });
        });
        //BOUTTON SUPPRIME
        const deleteItem = document.querySelectorAll(".deleteItem");
        deleteItem.forEach((btn) => {
          console.log(btn);
          const itemId = btn.closest("article").getAttribute("data-id");
          const itemColor = btn.closest("article").getAttribute("data-color");
          btn.addEventListener("click", function (e) {
            deleteItemSelect(itemId, itemColor);
          });
        });
      });
    }
  }
} else {
}

const btnSubmit = document.getElementById("order");
btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(btnSubmit);
  let valid = false;

  /***FIRST NAME***/
  const firstName = document.getElementById("firstName");
  const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  const nameRegex = /^[a-zA-Z\-]+$/;
  console.log(firstName.value.match(nameRegex));
  if (firstName.value === "") {
    firstNameErrorMsg.innerHTML = "se champ ne  doit pas etre vide";
    firstName.style.border = "2px solid red";
  } else if (firstName.value.match(nameRegex) === null) {
    firstNameErrorMsg.innerHTML =
      "renseignez se champ sans caractères spéciaux et sans chiffres";
    firstName.style.border = "2px solid red";
  } else {
    firstNameErrorMsg.innerHTML = "";
    firstName.style.border = "2px solid green";
    valid = true;
  }

  /******EMAIL*****/
  const email = document.getElementById("email");
  const emailReg = new RegExp(
    "^([a-zA-Z0-9_-])+([.]?[a-zA-Z0-9_-]{1,})*@([a-zA-Z0-9-_]{2,}[.])+[a-zA-Z]{2,3}$"
  );
  const validationEmail = email.value.match(emailReg);

  console.log(validationEmail);
  if (email.value === "") {
    emailErrorMsg.innerHTML = "se champ ne  doit pas etre vide";
    email.style.border = "2px solid red";
  } else if (validationEmail === false) {
    emailErrorMsg.innerHTML = "se champ ne  doit pas etre vide";
    email.style.border = "2px solid red";
  } else {
    emailErrorMsg.innerHTML = "";
    email.style.border = "2px solid green";
    valid = true;
  }

  if (valid === true) {
    /**effectuer un FETCH pour envoie au serveur http://localhost:3000/api/products/order**/
  }
});
/* validation du formulaire : add event btn au click pour validation, 
regardez REGEX pour validation des champs et faire une request API pour envoyer la commande (order)*/
/*function sendData(data) {
  const XHR = new XMLHttpRequest();
  const urlEncodedData = "http://127.0.0.1:5500/front/html/index.html";
  const urlEncodedDataPairs = [];
  const name;
}
*/
