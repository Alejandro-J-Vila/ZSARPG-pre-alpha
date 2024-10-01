import MenuButton from "./menu-button.js";

export default class OptionsScreen
{
  constructor (config)
  {
    // ATRIBUTOS

    this.background; // Imagen de fondo.
    this.returnButton; // Boton para volver al juego.
    this.optionsButton; // Boton de opciones.
    this.helpButton; // Boton de ayuda.
    this.quitButton; // Boton de salir.
    this.visible; // Si la pantalla de opciones es visible o no.

    // INICIALIZACION

    this.background = config.scene.add.image(0, 0, config.background);

    this.returnButton = new MenuButton(
      {
        scene: config.scene,
        x: config.width / 2,
        y: config.height / 2 - 100,
        backgroundKey: "menu-button-atlas",
        baseFrame: "return.png",
        highlightFrame: "return-hl.png",
        visible: config.visible
      });

    this.returnButton.on('pointerdown', (pointer) =>
    {
      config.scene.showOptionsScreen(false);
    });

    this.optionsButton = new MenuButton(
      {
        scene: config.scene,
        x: config.width / 2,
        y: config.height / 2,
        backgroundKey: "menu-button-atlas",
        baseFrame: "options.png",
        highlightFrame: "options-hl.png",
        visible: config.visible
      });

    this.optionsButton.on('pointerdown', (pointer) =>
    {
      console.log("TO DO");
    });

    // Boton para cargar un juego guardado.
    this.helpButton = new MenuButton(
      {
        scene: config.scene,
        x: config.width / 2,
        y: config.height / 2 + 100,
        backgroundKey: "menu-button-atlas",
        baseFrame: "help.png",
        highlightFrame: "help-hl.png",
        visible: config.visible
      });

    // Oyente para el boton de cargar juego.
    this.helpButton.on('pointerdown', (pointer) =>
    {
      config.scene.helpScreen.setVisible(true);
    });

    this.quitButton = new MenuButton(
      {
        scene: config.scene,
        x: config.width / 2,
        y: config.height / 2 + 200,
        backgroundKey: "menu-button-atlas",
        baseFrame: "quit.png",
        highlightFrame: "quit-hl.png",
        visible: config.visible
      });

    this.quitButton.on('pointerdown', (pointer) =>
    {
      config.scene.gameScene.scene.stop();
      config.scene.removeAllKeys();
      config.scene.scene.stop();
      config.scene.scene.start("main-menu");
    });

    this.visible = config.visible;

    // CONFIGURACION

    this.background.setOrigin(0, 0);
    this.background.setAlpha(0.5);
    this.background.setDisplaySize(config.width, config.height);
    this.background.setVisible(config.visible);

    this.returnButton.setDisplaySize(this.returnButton.width * 1.5, this.returnButton.height * 1.5);
    this.optionsButton.setDisplaySize(this.optionsButton.width * 1.5, this.optionsButton.height * 1.5);
    this.helpButton.setDisplaySize(this.helpButton.width * 1.5, this.helpButton.height * 1.5);
    this.quitButton.setDisplaySize(this.quitButton.width * 1.5, this.quitButton.height * 1.5);

  }

  setVisible (value)
  {
    this.visible = value;
    this.background.setVisible(value);
    this.returnButton.setVisible(value);
    this.optionsButton.setVisible(value);
    this.helpButton.setVisible(value);
    this.quitButton.setVisible(value);
  }

}
