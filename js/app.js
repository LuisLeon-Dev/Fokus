const html = document.querySelector("html");
const botonCorto = document.querySelector(".app__card-button--corto");
const botonEnfoque = document.querySelector(".app__card-button--enfoque");
const botonLargo = document.querySelector(".app__card-button--largo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botones = document.querySelectorAll(".app__card-button");
const inputEnfoqueMusica = document.querySelector("#alternar-musica");
const musica = new Audio("./sonidos/luna-rise-part-one.mp3");
const audioPausa = new Audio("./sonidos/pause.mp3");
const audioPlay = new Audio("./sonidos/play.wav");
const audioBeep = new Audio("./sonidos/beep.mp3");
const botonIniciarPausa = document.querySelector("#start-pause");
const textoInciarPausar = document.querySelector("#start-pause span");
const iconoIniciarPausar = document.querySelector(
  ".app__card-primary-button img"
);
const tiempoEnPantalla = document.querySelector("#timer");

let tiempoTrasncurridoEnSegundos = 1500;
let idIntervalo = null;

//Eventos
musica.loop = true;
inputEnfoqueMusica.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

botonCorto.addEventListener("click", () => {
  tiempoTrasncurridoEnSegundos = 300;
  cambiarContext("descanso-corto");
  botonCorto.classList.add("active");
});

botonEnfoque.addEventListener("click", () => {
  tiempoTrasncurridoEnSegundos = 1500;
  cambiarContext("enfoque");
  botonEnfoque.classList.add("active");
});

botonLargo.addEventListener("click", () => {
  tiempoTrasncurridoEnSegundos = 900;
  cambiarContext("descanso-largo");
  botonLargo.classList.add("active");
});

//Funcion para cambiar el contexto de la interface
function cambiarContext(contexto) {
  mostrarTiempo();
  botones.forEach(function (contexto) {
    contexto.classList.remove("active");
  });

  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./imagenes/${contexto}.png`);

  switch (contexto) {
    case "enfoque":
      titulo.innerHTML = `
      Optimiza tu productividad,<br />
          <strong class="app__title-strong"
            >sumérgete en lo que importa.</strong
          >
      `;
      break;
    case "descanso-corto":
      titulo.innerHTML = `
          ¿Qué tal un respiro?,<br />
          <strong class="app__title-strong"
            >¡Haz una pausa corta!.</strong
          >
        `;
      break;

    case "descanso-largo":
      titulo.innerHTML = `
        Hora de volver a la superficie,<br />
          <strong class="app__title-strong"
            >toma un descanso largo.</strong
          >
      `;
      break;
  }
}

const cuentaRegresiva = () => {
  if (tiempoTrasncurridoEnSegundos <= 0) {
    reiniciar();
    audioBeep.play();
    return;
  }
  textoInciarPausar.textContent = "Pausar";
  iconoIniciarPausar.setAttribute("src", "/imagenes/pause.png");
  tiempoTrasncurridoEnSegundos -= 1;
  mostrarTiempo();
};

botonIniciarPausa.addEventListener("click", iniciarPausar);

function iniciarPausar() {
  if (idIntervalo) {
    audioPausa.play();
    reiniciar();
    return;
  }
  audioPlay.play();
  idIntervalo = setInterval(cuentaRegresiva, 1000);
}

function reiniciar() {
  clearInterval(idIntervalo);
  textoInciarPausar.textContent = "Comenzar";
  iconoIniciarPausar.setAttribute("src", "/imagenes/play_arrow.png");
  idIntervalo = null;
}

function mostrarTiempo() {
  const tiempo = new Date(tiempoTrasncurridoEnSegundos * 1000);
  const tiempoFormatedo = tiempo.toLocaleTimeString("es-MX", {
    minute: "2-digit",
    second: "2-digit",
  });
  tiempoEnPantalla.innerHTML = `${tiempoFormatedo}`;
}

mostrarTiempo();
