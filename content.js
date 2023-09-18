// Ce script est injecté dans la page par le manifest.json
const priceElement = document.querySelector(".f-faPriceBox__price.userPrice.js-ProductBuy-standardCheckable.checked");
const titleElement = document.querySelector(".f-productHeader-Title");
const imgElement = document.querySelector(".f-productMedias__viewItem--main");

const price = priceElement.textContent.trim();
const title = titleElement.textContent.trim();
const img = imgElement.src;
console.log(price,'pricecontentjs')
console.log(title,'titlecontentjs')
console.log(img,'imgcontentjs')

// Envoie les données récupérées au script de fond (background.js)
chrome.runtime.sendMessage({ price, title, img });