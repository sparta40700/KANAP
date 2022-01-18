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

function addtocart(id, color, quantity) {
  const productElements = getProductFromLocalStorage();
  console.log(productElements);
  productElements[id] = {
    [color]: quantity,
  };
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
