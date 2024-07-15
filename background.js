// Dans background.js
function keepServiceWorkerActive() {
  setInterval(() => {
    chrome.runtime.sendMessage({ type: "keepActive" });
  }, 20000); // Envoie un message toutes les 20 secondes
}

keepServiceWorkerActive();

const products = [];

//recois les messages envoyes par le script injecter dans la page
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "productData") {
    const { price, title, img, link } = message;
    //recuperation des produits existsnts a partir du stockage local
    chrome.storage.local.get({ products: [] }, (data) => {
      const products = data.products;

      //ajouter du nouveau produit a la liste
      products.push({ price, title, img, link });

      //mis a jour du stockage local avec la nouvelle liste
      chrome.storage.local.set({ products }, () => {
        console.log("produit ajouter:", { price, title, img, link });
      });
    });
  } else if (message.type === "keepActive") {
    //pour maintenir le service worker active
    console.log("keep service worker active");
  }
});
