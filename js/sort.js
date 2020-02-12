const btnAz = document.querySelector(".sort-az");
const btnZa = document.querySelector(".sort-za");


btnAz.addEventListener("click", e => {
  e.preventDefault();
  sort("Az");
  btnAz.classList.add("btn-sort-active");
  btnZa.classList.remove("btn-sort-active");
});

btnZa.addEventListener("click", e => {
  e.preventDefault();
  sort("Za");
  btnZa.classList.add("btn-sort-active");
  btnAz.classList.remove("btn-sort-active");
 });


function sort(sortOrder) {
  let nodeList = document.querySelectorAll(".user");
  let itemsArray = [];
  let parent = nodeList[0].parentNode;
  for (let i = 0; i < nodeList.length; i++) {    
    itemsArray.push(parent.removeChild(nodeList[i]));
  }
  let itemsArrayOriginal = [];
  for (let i = 0; i < itemsArray.length; i++) {    
    itemsArrayOriginal.push(itemsArray[i]);
  }
  itemsArray.sort(function(nodeA, nodeB) {
      let textA = nodeA.querySelector(".user-name").textContent.toLowerCase();
      let textB = nodeB.querySelector(".user-name").textContent.toLowerCase();
      if (sortOrder === "Az") {
        if (textA < textB) return -1;
        if (textA > textB) return 1;
        return 0;
      }
      if (sortOrder === "Za") {
        if (textA < textB) return 1;
        if (textA > textB) return -1;
        return 0;
      }
    })
    .forEach(function(node) {
      parent.appendChild(node)
    });
}

// function sortZa() {
//   let nodeList = document.querySelectorAll(".user");
//   let itemsArray = [];
//   let parent = nodeList[0].parentNode;
//   for (let i = 0; i < nodeList.length; i++) {    
//     itemsArray.push(parent.removeChild(nodeList[i]));
//   }
//   let itemsArrayOriginal = [];
//   for (let i = 0; i < itemsArray.length; i++) {    
//     itemsArrayOriginal.push(itemsArray[i]);
//   }
//   itemsArray.sort(function(nodeA, nodeB) {
//       let textA = nodeA.querySelector(".user-name").textContent.toLowerCase();
//       let textB = nodeB.querySelector(".user-name").textContent.toLowerCase();
//       if (textA < textB) return 1;
//       if (textA > textB) return -1;
//       return 0;
//     })
//     .forEach(function(node) {
//       parent.appendChild(node)
//     });

// }
