/* chrome.scripting.executeScript({
  target: { tabId: id, allFrames : true },
  files : ["content.js"]
}).then(() => console.log("script injected"));
 */


// Accéder à chrome.storage.local après avoir reçu le message
chrome.storage.local.get(["products"], (data) => {
  

  // Récupérez la liste des produits
  const productList = document.getElementById("productList");

  // Parcourez le tableau de produits et ajoutez-les à la liste
  for (let i=0; i<=data.products.length; i++){
    console.log(data.products[i].title)
    const listItem = document.createElement("div");
    listItem.classList.add("product");

    listItem.innerHTML = `
      <img src="${data.products[i].img}" alt="${data.products[i].title}" id="productImage">
      <h4>${data.products[i].title}</h4>
      <p>Prix : ${data.products[i].price}</p>
      <button id="del">Supprimer</button>
    `;

    productList.appendChild(listItem);
  };
});
