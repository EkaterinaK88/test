const popup = document.querySelector(".popup");
const close = popup.querySelector(".btn-close");
const button = popup.querySelector(".btn-users");


setTimeout(() => {
  popup.classList.add("popup-show");
}, 2000);

close.addEventListener("click", e => {
 e.preventDefault();
 popup.classList.remove("popup-show");
});

button.addEventListener("click", e => {
  e.preventDefault();
  popup.classList.remove("popup-show");
 });

window.addEventListener("keydown", e => {
 if (e.keyCode === 27) {
  e.preventDefault();

  if (popup.classList.contains("popup-show")) {
   popup.classList.remove("popup-show");
  }

 }
});
