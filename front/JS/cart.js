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
      fetch("http://localhost:3000/api/products/" + id).then(async (result) => {
        const response = await result.json();
        console.log(response);
        //injection js dans l'html
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

        //QUANTITE TOTAL
        console.log(totalQuantity);
        if (totalQuantity.innerHTML === " ") {
          totalQuantity.innerHTML = "0";
        }
        const previousQuantity = parseInt(totalQuantity.innerHTML);
        const finalQuantity = previousQuantity + parseInt(count);
        totalQuantity.innerHTML = finalQuantity.toString();

        //PRIX TOTAL
        const priceTotal = response.price * count;
        if (totalPrice.innerHTML === " ") {
          totalPrice.innerHTML = "0";
        }
        const finalPrice =
          parseInt(priceTotal) + parseInt(totalPrice.innerHTML);
        totalPrice.innerHTML = finalPrice.toString();
        console.log(finalPrice);
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
//validation formulaire
const btnSubmit = document.getElementById("order");
btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(btnSubmit);
  let valid = false;

  /***FIRST NAME***/
  let firstName = document.getElementById("firstName");
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

  /**LAST NAME**/
  let lastName = document.getElementById("lastName");
  const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  console.log(lastName.value.match(nameRegex));
  if (lastName.value === "") {
    lastNameErrorMsg.innerHTML = "se champ ne  doit pas etre vide";
    lastName.style.border = "2px solid red";
  } else if (lastName.value.match(nameRegex) === null) {
    lastNameErrorMsg.innerHTML =
      "renseignez se champ sans caractères spéciaux et sans chiffres";
    lastName.style.border = "2px solid red";
  } else {
    lastNameErrorMsg.innerHTML = "";
    lastName.style.border = "2px solid green";
    valid = true;
  }

  /**ADRESS***/
  let address = document.getElementById("address");
  const addressErrorMsg = document.getElementById("addressErrorMsg");
  const adressRegex = /^[a-zA-Z0-9\s,'-]*$/;
  console.log(address.value.match(adressRegex));
  if (address.value === "") {
    addressErrorMsg.innerHTML = "se champ ne  doit pas etre vide";
    address.style.border = "2px solid red";
  } else if (address.value.match(adressRegex) === null) {
    addressErrorMsg.innerHTML =
      "renseignez se champ sans caractères spéciaux et sans chiffres";
    address.style.border = "2px solid red";
  } else {
    addressErrorMsg.innerHTML = "";
    address.style.border = "2px solid green";
    valid = true;
  }
  /***CITY****/
  let city = document.getElementById("city");
  const cityErrorMsg = document.getElementById("cityErrorMsg");
  const cityRegex = /^[a-zA-Z\-]+$/;
  console.log(city.value.match(cityRegex));
  if (city.value === "") {
    cityErrorMsg.innerHTML = "se champ ne  doit pas etre vide";
    city.style.border = "2px solid red";
  } else if (city.value.match(cityRegex) === null) {
    cityErrorMsg.innerHTML =
      "renseignez se champ sans caractères spéciaux et sans chiffres";
    city.style.border = "2px solid red";
  } else {
    cityErrorMsg.innerHTML = "";
    city.style.border = "2px solid green";
    valid = true;
  }

  /******EMAIL*****/
  let email = document.getElementById("email");
  const emailErrorMsg = document.getElementById("emailErrorMsg");
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
  //envoie de la commande à l'API avec POST
  if (valid === true) {
    let productsId = getProductId(products);
    firstName = firstName.value;
    lastName = lastName.value;
    address = address.value;
    city = city.value;
    email = email.value;

    fetch("http://localhost:3000/api/products/order", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contact: {
          firstName,
          lastName,
          address,
          city,
          email,
        },
        products: productsId,
      }),
    })
      .then(async (result) => {
        const apiResult = await result.json();
        console.log(apiResult);
        window.location = "confirmation.html?orderId=" + apiResult.orderId;
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
