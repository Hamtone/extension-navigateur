// Dans background.js
function keepServiceWorkerActive() {
    setInterval(() => {
      chrome.runtime.sendMessage({ type: "keepActive" });
    }, 20000); // Envoie un message toutes les 20 secondes
  }
  
  keepServiceWorkerActive();



const products = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.price && message.title) {
      // Accéder aux données du message
      const price = message.price;
      const title = message.title;
      const img = message.img;

    
      
        const item = { title : title, price : price, img : img}
        console.log(item)
        products.push(item)
        console.log(products)
      
        // Faire quelque chose avec les données, par exemple, les afficher dans la console
        console.log(price, title, img,'pricetitlebg');
      
        //Stocker les données dans localStorage
        chrome.storage.local.set({"products" : products});

    }
  });