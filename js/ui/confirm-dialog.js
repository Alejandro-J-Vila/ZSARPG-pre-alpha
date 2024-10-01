import Button from "./button.js";

// Clase que representa un cuadro de dialogo del juego.
export default class ConfirmDialog extends Phaser.GameObjects.Image
{
  constructor (config)
  {
    // Llamamos al constructor de la clase Image para que inicialice la misma.
    super(config.scene, config.x, config.y, config.backgroundKey);

    config.scene.add.existing(this);

    // ATRIBUTOS

    this.scene; // Escena donde se ubica el dialogo.
    this.title;
    this.text; // Texto del dialogo.
    this.textOffset; // Offset del texto con respecto al dialogo.
    this.yesButton;
    this.noButton;

    // INICIALIZACION

    this.scene = config.scene;
    this.title = config.scene.add.text(config.x, config.y, config.title, { font: '18px Arial', fill: '#FFFFFF' });
    this.text = config.scene.add.text(config.x, config.y, config.text, { font: '16px Arial', fill: '#FFFFFF' });
    this.textOffset = 5;

    this.yesButton = new Button(
      {
        scene: config.scene,
        x: config.x,
        y: config.y,
        backgroundKey: "button-atlas",
        backgroundFrame: "accept.png",
        visible: config.visible,
        labelOffsetX: 0,
        labelOffsetY: 30,
        labelText: "Confirm"
      });

    this.noButton = new Button(
      {
        scene: config.scene,
        x: config.x,
        y: config.y,
        backgroundKey: "button-atlas",
        backgroundFrame: "cancel.png",
        visible: config.visible,
        labelOffsetX: 0,
        labelOffsetY: 30,
        labelText: "Cancel"
      });

    // CONFIGURACION

    this.setVisible(config.visible);
    var w = this.text.width + (this.textOffset * 2);
    var h = this.title.height + this.text.height + this.yesButton.height + (this.textOffset * 6);
    this.setDisplaySize(w, h);

    var bgOrigin = this.getTopLeft();
    this.title.setPosition(bgOrigin.x + (w / 2.7), bgOrigin.y + this.textOffset);
    this.text.setPosition(bgOrigin.x + this.textOffset, this.title.y + this.title.height + this.textOffset * 2);
    this.yesButton.setPos(bgOrigin.x + (w / 4), this.text.y + this.text.height + (this.textOffset * 5));
    this.noButton.setPos(bgOrigin.x + ((w / 2) + (w / 4)), this.text.y + this.text.height + (this.textOffset * 5));
    this.title.setVisible(config.visible);
    this.text.setVisible(config.visible);
  }

  // Metodo que utilizamos para cambiar la visibilidad del dialogo.
  setVisibility (value)
  {
    this.setVisible(value);
    this.title.setVisible(value);
    this.text.setVisible(value);
    this.yesButton.setVisible(value);
    this.noButton.setVisible(value);
  }

  // Metodo que utilizamos para cambiar la profundidad en escena del dialogo.
  setGroupDepth (value)
  {
    this.setDepth(value);
    this.title.setDepth(value + 1);
    this.text.setDepth(value + 1);
    this.yesButton.setGroupDepth(value + 1);
    this.noButton.setGroupDepth(value + 1);
  }

}
