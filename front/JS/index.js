/**@module js/index */

//console.log(aide à debuguer)
// reccuperer les produits cote serveur via l'adresse http://localhost:3000/api/products
//boucler (for each) sur la variables qui contient tout les produits
//reccuperer la section "id" "items"
const items = document.getElementById("items");
console.log(items);
//chaque boucle creer le code html pour l'injecter
async function getProducts() {
  const response = await fetch("http://localhost:3000/api/products");
  return response.json();
}
/*const products = fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      console.log(res.json());
      const products = res.json();
      return products;
    }
  })
  .then(function (value) {
    console.log(value);
  })
  .catch(function (err) {
     Une erreur est survenue
  });*/
const products = await getProducts();
console.log(products);
products.forEach((element) => {
  console.log(element.name);
  //innerHTML
  /*items.innerHTML +=
    '<img width="100px" src="' +
    element.imageUrl +
    '" alt="' +
    element.altTxt +
    element.name +
    element.price +
    '"/>';*/
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
