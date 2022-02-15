const storage = localStorage;
function getProductFromLocalStorage() {
  const products = storage.getItem("CartProducts");
  if (!products) {
    return {};
  }
  return JSON.parse(products);
}

function updateLocalStorage(products) {
  storage.setItem("CartProducts", JSON.stringify(products));
}

function getCountProduct(id, color) {
  const localStorage = getProductFromLocalStorage();
  console.log(localStorage);
  if (localStorage[id][color]) {
    console.log(localStorage[id][color]);
    return localStorage[id][color];
  }
  /*reccuper le local storage puis le mettre dans une variable, faire une condition pour savoir si le 
  idcolor existe, effectuer un return de la quantity
   */
}

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
  delete productElements[itemId];
  console.log(productElements);
  updateLocalStorage(productElements);
}
function submit(cart_order) {
  console.log(cart_order);
}

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
