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
