import Button from "./button.js";

export default class HelpScreen
{
  constructor (config)
  {
    // ATRIBUTOS

    this.background; // Imagen de fondo.
    this.closeButton; // Boton para cerrar la pantalla de ayuda.
    this.visible; // Si la pantalla de opciones es visible o no.

    // INICIALIZACION

    this.background = config.scene.add.image(0, 0, config.background);

    this.closeButton = new Button(
      {
        scene: config.scene,
        x: 750,
        y: 50,
        backgroundKey: "button-atlas",
        backgroundFrame: "close.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -20,
        labelText: "Close"
      });

    this.closeButton.on('pointerdown', (pointer) =>
    {
      this.setVisible(false);
      if(config.scene.scene.key === "main-menu")
      {
        config.scene.newGameButton.setVisible(true);
        config.scene.loadGameButton.setVisible(true);
        config.scene.helpButton.setVisible(true);
      }
    });

    this.visible = config.visible;

    // CONFIGURACION

    this.background.setOrigin(0, 0);
    this.background.setDisplaySize(config.width, config.height);
    this.background.setVisible(config.visible);

  }

  setVisible (value)
  {
    this.visible = value;
    this.background.setVisible(value);
    this.closeButton.setVisible(value);
  }

}
