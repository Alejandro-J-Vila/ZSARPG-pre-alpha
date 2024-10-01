import BootScene from "./scenes/boot.js";
import PreloadScene from "./scenes/preload.js";
import MainMenu from "./scenes/main-menu.js";
import GameUI from "./scenes/game-ui.js";
import StartScene from "./scenes/start.js";
import BaseScene from "./scenes/base.js";
import CityScene from "./scenes/city.js";

const config = {
  type: Phaser.AUTO, // Dependiendo del navegador Phaser elige el mejor metodo para renderizar.
  width: 800, // Tamaño de la ventana del juego en x.
  height: 600, // Tamaño de la ventana del juego en y.
  parent: "game-container", // Nombre del div que contiene el juego.
  pixelArt: true,
  scene: [BootScene, PreloadScene, StartScene, BaseScene, CityScene, MainMenu, GameUI], // Arreglo de escenas del juego.
  physics:
  {
    default: "arcade", // Motor de fisica que utiliza el juego.
    arcade:
    {
      gravity: { y: 0 }, // Gravedad del juego.
      debug: false // Setear en falso para no ver las lineas de zonas.
    }
  }
};

const game = new Phaser.Game(config);
