import MenuButton from "../ui/menu-button.js";
import SaveManager from "../managers/save-manager.js";
import HelpScreen from "../ui/help-screen.js";

// Escena encargada de mostrar el menu principal.
export default class MainMenu extends Phaser.Scene
{
  constructor ()
  {
    super("main-menu");
  }

  preload ()
  {

  }

  create ()
  {
    // El ancho de la camara.
    this.width = this.cameras.main.width;
    // El alto de la camara.
    this.height = this.cameras.main.height;

    // Imagen de fondo del menu.
    this.background = this.add.image(0, 0, "loading-screen");
    this.background.setOrigin(0, 0);
    this.background.setDisplaySize(this.width, this.height);

    // Creamos las pantalla de ayuda.
    this.helpScreen = new HelpScreen(
      {
        scene: this,
        width: this.width,
        height: this.height,
        background: "help-screen",
        visible: false
      });

    // Boton para empezar un nuevo juego.
    this.newGameButton = new MenuButton(
      {
        scene: this,
        x: this.width / 2,
        y: this.height / 2 - 50,
        backgroundKey: "menu-button-atlas",
        baseFrame: "new-game.png",
        highlightFrame: "new-game-hl.png",
        visible: true
      });

    // Oyente para el boton de nuevo juego.
    this.newGameButton.on('pointerdown', (pointer) =>
    {
      this.newGame();
    });

    // Boton para cargar un juego guardado.
    this.loadGameButton = new MenuButton(
      {
        scene: this,
        x: this.width / 2,
        y: this.height / 2 + 50,
        backgroundKey: "menu-button-atlas",
        baseFrame: "load-game.png",
        highlightFrame: "load-game-hl.png",
        visible: true
      });

    // Oyente para el boton de cargar juego.
    this.loadGameButton.on('pointerdown', (pointer) =>
    {
      this.loadGame();
    });

    // Boton para cargar un juego guardado.
    this.helpButton = new MenuButton(
      {
        scene: this,
        x: this.width / 2,
        y: this.height / 2 + 150,
        backgroundKey: "menu-button-atlas",
        baseFrame: "help.png",
        highlightFrame: "help-hl.png",
        visible: true
      });

    // Oyente para el boton de cargar juego.
    this.helpButton.on('pointerdown', (pointer) =>
    {
      this.newGameButton.setVisible(false);
      this.loadGameButton.setVisible(false);
      this.helpButton.setVisible(false);
      this.helpScreen.setVisible(true);
    });

    this.newGameButton.setDisplaySize(this.newGameButton.width * 2, this.newGameButton.height * 2);
    this.loadGameButton.setDisplaySize(this.loadGameButton.width * 2, this.loadGameButton.height * 2);
    this.helpButton.setDisplaySize(this.helpButton.width * 2, this.helpButton.height * 2);

  }

  update (time, delta)
  {

  }

  newGame ()
  {
    this.scene.start("ui");
    this.scene.start("start");
  }

  loadGame ()
  {
    var load = SaveManager.loadGame("Player");
    if(load)
    {
      this.scene.start("ui", load);
      this.scene.start("base", load);
    }
    else
    {
      this.newGame();
    }
  }
}
