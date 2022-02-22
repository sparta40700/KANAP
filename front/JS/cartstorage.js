//reccuperation du stockage local
const storage = localStorage;
/**
 *reccuperation de tout les produits provenant du localstorage
 * @returns {json}
 */
function getProductFromLocalStorage() {
  const products = storage.getItem("CartProducts");
  if (!products) {
    return {};
  }
  return JSON.parse(products);
}
/**
 * actualisation du localstorage
 * @param products
 * @returns void
 */
function updateLocalStorage(products) {
  storage.setItem("CartProducts", JSON.stringify(products));
}
//obtention de la quantitée d'un produit sélectionné par l'utilisateur
function getCountProduct(id, color) {
  const localStorage = getProductFromLocalStorage();
  console.log(localStorage);
  if (localStorage[id][color]) {
    console.log(localStorage[id][color]);
    return localStorage[id][color];
  }
}
//AJOUT AU PANIER
function addtocart(id, color, quantity) {
  const productElements = getProductFromLocalStorage();
  console.log(productElements);
  if (productElements[id]) {
    console.log("existe déjà");
    if (productElements[id][color]) {
      const currentCount = getCountProduct(id, color);
      productElements[id][color] = parseInt(currentCount) + parseInt(quantity);
    } else {
      console.log("initialisation");
      productElements[id][color] = parseInt(quantity);
      console.log(parseInt(quantity));
    }
  }
  if (!productElements[id]) {
    productElements[id] = {
      [color]: quantity,
    };
  }

  updateLocalStorage(productElements);
}

function countProduct(id, count, color) {
  const productElements = getProductFromLocalStorage();
  console.log(productElements);
  productElements[id][color] = count;

  updateLocalStorage(productElements);
  location.reload();
}
function deleteItemSelect(itemId, itemColor) {
  console.log(itemId);
  console.log(itemColor);
  const productElements = getProductFromLocalStorage();
  console.log(productElements);
  console.log(Object.keys(productElements[itemId]));
  if (Object.keys(productElements[itemId]).length > 1) {
    delete productElements[itemId][itemColor];
  } else {
    delete productElements[itemId];
  }

  console.log(productElements);
  updateLocalStorage(productElements);
  location.reload();
}
//reccuperation de l'id produit pour la commande
function getProductId(products) {
  console.log(products);
  let ids = [];
  for (const [id, colors] of Object.entries(products)) {
    console.log(id);
    ids.push(id);
  }
  console.log(ids);
  return ids;
}
