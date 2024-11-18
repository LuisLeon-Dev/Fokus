const html = document.querySelector("html");
const botonCorto = document.querySelector(".app__card-button--corto");
const botonEnfoque = document.querySelector(".app__card-button--enfoque");
const botonLargo = document.querySelector(".app__card-button--largo");
const banner = document.querySelector(".app__image");

botonCorto.addEventListener("click", () => {
  cambiarContext("descanso-corto");
});

botonEnfoque.addEventListener("click", () => {
  cambiarContext("enfoque");
});

botonLargo.addEventListener("click", () => {
  cambiarContext("descanso-largo");
});

function cambiarContext(contexto) {
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./imagenes/${contexto}.png`);
}
