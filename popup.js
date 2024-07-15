//ici qui gere l'affichage du pupup

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("productList");
});
//recuperation des produits depuis le stockage local
// Accéder à chrome.storage.local après avoir reçu le message.
chrome.storage.local.get({ products: [] }, (data) => {
  const products = data.products;
  //affichage des produits dans 'popup.html'
  products.forEach((products, index) => {
    const listItem = document.createElement("div");
    listItem.classList.add("product");
    listItem.innerHTML = `
  <img src="${data.products[index].img}" alt="${data.products[index].title}" id="productImage">
  <h4>${data.products[index].title}</h4>
  <p>Prix : ${data.products[index].price}</p>
  <div class="taping">
  <button class="view-product" data-link= "${data.products[index].link} target="_blank">Voir le produit</button>
  <button class="del" data-index="${index}">Supprimer</button>
  </div>
  `;
    productList.appendChild(listItem);
  });

  //gestion d'evenement pour le bouton "suprimer"
  const deleteButtons = document.querySelectorAll(".del");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = parseInt(event.target.dataset.index, 10);

      //supprimer les produits dans le stockage local
      products.splice(index, 1);
      chrome.storage.local.set({ products }, () => {
        console.log("produit supprimer:", products[index]);

        //suppresion de l'element du DOM
        event.target.parentElement.remove();
      });
    });
  });
  //gestion d'evenement sur le clic "voir le produit"
  const viewProductButtons = document.querySelectorAll(".view-product");
  viewProductButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const productLink = event.target.dataset.link;
      chrome.tabs.create({ url: productLink });
    });
  });
});
