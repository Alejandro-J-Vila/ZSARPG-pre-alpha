import Label from "../ui/label.js";

// Clase que representa un boton de imagen con un label de descripcion.
export default class Button extends Phaser.GameObjects.Image
{
  constructor (config)
  {
    // Llamamos al constructor de la clase base Image.
    super(config.scene, config.x, config.y, config.backgroundKey, config.backgroundFrame);

    // ATRIBUTOS

    this.scene; // Escena donde se ubica el boton.
    this.labelOffsetX; // Offset del label en x.
    this.labelOffsetY; // Offset del label en y.
    this.label; // Label del boton que muestra informacion sobre el mismo.

    // INICIALIZACION

    this.scene = config.scene;
    this.labelOffsetX = config.labelOffsetX;
    this.labelOffsetY = config.labelOffsetY;
    this.label = new Label(
      {
        scene: config.scene,
        x: config.x + config.labelOffsetX,
        y: config.y + config.labelOffsetY,
        backgroundKey: "label",
        visible: false,
        text: config.labelText
      });

    // CONFIGURACION

    config.scene.add.existing(this);
    this.setVisible(config.visible);

    this.setInteractive();

    this.on('pointerover', (pointer) =>
    {
      this.label.setVisibility(true);
    });

    this.on('pointerout', (pointer) =>
    {
      this.label.setVisibility(false);
    });

    this.label.setGroupDepth(1);

  }

  // Metodo que utilizamos para setear la posicion del boton.
  setPos (x, y)
  {
    this.setPosition(x, y);
    this.label.setPos(x + this.labelOffsetX, y + this.labelOffsetY);
  }

  // Metodo que utilizamos para cambiar la profundidad en escena del boton.
  setGroupDepth (value)
  {
    this.setDepth(value);
    this.label.setGroupDepth(value + 1);
  }

  // Metodo que utilizamos para ajustar la posicion del label.
  adjustLabel ()
  {
    this.label.setPos(this.x + this.labelOffsetX, this.y + this.labelOffsetY);
  }

  destroyButton ()
  {
    this.label.destroyLabel();
    this.destroy();
  }

}
