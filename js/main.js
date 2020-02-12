const btn = document.querySelector(".btn-users");
const container = document.querySelector(".container");


function getUsers(cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture");
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText);
    cb(response.results);
  });

  xhr.addEventListener("error", () => {
    console.log("error");
  });

  xhr.send();
}

//с большой буквы
function toCapitalLetter(str) {
  return str[0].toUpperCase() + str.slice(1);
}


//пользователь
function cardTemplate(user) {
  const card = document.createElement("div");
  card.classList.add("user");

  const cardPicture = document.createElement("img");
  cardPicture.src = user.picture.medium;
  cardPicture.classList.add("user-picture");

  const cardText = getUserName(user);

  card.appendChild(cardPicture);
  card.appendChild(cardText);
  return card;
}

//имя пользователя
function getUserName(user) {
  const cardTitle = document.createElement("div");
  cardTitle.textContent = toCapitalLetter(user.name.title);
  if (user.name.title !== "miss") {
    cardTitle.textContent += '.';
  }; 

  const cardName = document.createElement("span");
  cardName.classList.add("user-name");
  cardName.textContent = ' ' + toCapitalLetter(user.name.first) + ' ' + toCapitalLetter(user.name.last);

  cardTitle.appendChild(cardName);

  return cardTitle;
}

//всплывающее окно
function infoTemplate (obj) {
  const cardLarge = document.createElement("div");
  cardLarge.classList.add("user-info");

  const picture = document.createElement("img");
  picture.src = obj.picture.large;

  const cardText = document.createElement("div");
  cardText.classList.add("card-text");

  const cardTitle = getUserName(obj);

  const cardInfo = document.createElement("ul");
  cardInfo.classList.add("user-text");
  for (let key in obj) {
    const cardItem = document.createElement("li");
    cardItem.classList.add("user-item");
    if (key === "email" || key === "phone") {
      cardItem.textContent = `${key}: ${obj[key]}`;
      cardInfo.appendChild(cardItem);
    }
    if (key === "location") {
      for (let key in obj.location) {
        const cardItem = document.createElement("li");
        cardItem.classList.add("user-item");
        if (key !== "postcode") {
        cardItem.textContent = `${key}: ${obj.location[key]}`;
        cardInfo.appendChild(cardItem);
        }
      }
    }
  }
  cardText.appendChild(cardTitle);
  cardText.appendChild(cardInfo);

  const buttonClose = document.createElement("button");
  buttonClose.classList.add("btn-close");
  buttonClose.textContent = "Закрыть";

  cardLarge.appendChild(buttonClose);
  cardLarge.appendChild(picture);
  cardLarge.appendChild(cardText);

  return cardLarge;
} 


//список пользователей
function renderUsers(response) {
  const fragment  = document.createDocumentFragment();
    response.forEach(user => {
      const card = cardTemplate(user);
      fragment.appendChild(card);
      card.addEventListener("click", e => {
        e.preventDefault();
        const list = infoTemplate(user);
        card.insertAdjacentElement("afterend", list);

        const overlay = document.querySelector(".overlay");
        overlay.classList.add("overlay-show");
        overlay.addEventListener("click", e => {
          e.preventDefault();
          list.parentNode.removeChild(list);
          overlay.classList.remove("overlay-show");
         });
 
        const close = list.querySelector(".btn-close");
        close.addEventListener("click", e => {
          e.preventDefault();
          list.parentNode.removeChild(list);
          overlay.classList.remove("overlay-show");
          });
      });
    });
    container.appendChild(fragment);
}


btn.addEventListener("click", e => {
  e.preventDefault();
  getUsers(renderUsers);
});







