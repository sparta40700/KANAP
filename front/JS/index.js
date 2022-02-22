/**@module js/index */

const items = document.getElementById("items");
console.log(items);

//reccuperation de l'API produit
async function getProducts() {
  const response = await fetch("http://localhost:3000/api/products");
  return response.json();
}

const products = await getProducts();
console.log(products);
//je boucle dans les produits recus de l'API
products.forEach((element) => {
  console.log(element.name);

  // INJECTION DES PRODUITS DE L'API DANS L'HTML
  items.innerHTML += `<a href="./product.html?id=${element._id}">
            <article>
              <img
                src="${element.imageUrl}"
                alt="${element.altTxt}"
              />
              <h3 class="productName">${element.name}</h3>
              <p class="productDescription">
                ${element.description}
              </p>
            </article>
          </a>`;
});
