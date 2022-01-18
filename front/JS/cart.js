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
        /*<p>
                Total (<span id="totalQuantity"> 2 </span> articles) :
                <span id="totalPrice"> 84,00 </span> €
              </p>*/

        totalQuantity.innerHTML = count;
        const priceTotal = response.price * count;
        totalPrice.innerHTML = priceTotal;

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
        /*rendre le bouton supprimé fonctionnel*/
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
/* validation du formulaire : add event btn au click pour validation, 
regardez REGEX pour validation des champs et faire une request API pour envoyer la commande (order)