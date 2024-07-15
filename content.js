//utilisation du service worker
function keepServiceWorkerActive() {
  setInterval(() => {
    chrome.runtime.sendMessage({ type: "keepActive" });
  }, 20000);
}
keepServiceWorkerActive();

// Ce script est injecté dans la page par le manifest.json
const priceElement = document.querySelector(
  ".f-faPriceBox__price.userPrice.checked"
);
const titleElement = document.querySelector(".f-productHeader-Title");
const imgElement = document.querySelector(".f-productMedias__viewItem--main");
const linkElement = document.querySelector("link[rel='canonical']");

if (priceElement && titleElement && imgElement && linkElement) {
  //extraction des donnees
  const price = priceElement.textContent.trim();
  const title = titleElement.textContent.trim();
  const img = imgElement.src;
  const link = linkElement.href;
  //afichage au console
  console.log(price, "pricecontentjs");
  console.log(title, "titlecontentjs");
  console.log(img, "imgcontentjs");
  console.log(link, "linkcontentjs");

  // Envoie les données récupérées au script de fond (background.js)
  chrome.runtime.sendMessage({ type: "productData", price, title, img, link });
} else {
  console.error("Impossible de trouver les donnees");
}
