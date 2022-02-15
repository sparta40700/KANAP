let urlparam = new URLSearchParams(window.location.search);
console.log(new URLSearchParams(window.location.search));
console.log(urlparam.get("orderId"));

const orderId = document.getElementById("orderId");
console.log(orderId);
orderId.innerHTML = urlparam.get("orderId");
localStorage.removeItem("CartProducts");
