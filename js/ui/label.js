// Clase que representa un label dentro del juego.
export default class Label extends Phaser.GameObjects.Image
{
  constructor (config)
  {
    // Llamamos al constructor de la clase Image para que inicialice la misma.
    super(config.scene, config.x, config.y, config.backgroundKey);

    config.scene.add.existing(this);

    // ATRIBUTOS

    this.scene; // Escena donde se ubica el label.
    this.text; // Texto del label.
    this.textOffset; // Offset del texto con respecto al label.

    // INICIALIZACION

    this.scene = config.scene;
    this.text = config.scene.add.text(config.x, config.y, config.text, { font: '16px Arial', fill: '#FFFFFF' });
    this.textOffset = 5;

    // CONFIGURACION

    this.setVisible(config.visible);
    this.setDisplaySize(this.text.width + (this.textOffset * 2), this.text.height + (this.textOffset * 2));

    var bgOrigin = this.getTopLeft();
    this.text.setPosition(bgOrigin.x + this.textOffset, bgOrigin.y + this.textOffset);
    this.text.setVisible(config.visible);

  }

  // Metodo que utilizamos para cambiar la visibilidad del label.
  setVisibility (value)
  {
    this.setVisible(value);
    this.text.setVisible(value);
  }

  // Metodo que utilizamos para cambiar la posicion del label.
  setPos (x, y)
  {
    this.setPosition(x, y);
    var bgOrigin = this.getTopLeft();
    this.text.setPosition(bgOrigin.x + this.textOffset, bgOrigin.y + this.textOffset);
  }

  // Metodo que utilizamos para cambiar la profundidad en escena del label.
  setGroupDepth (value)
  {
    this.setDepth(value);
    this.text.setDepth(value + 1);
  }

  // Metodo que utilizamos para cambiar el texto del label.
  setText (text)
  {
    this.text.setText(text);
    this.setDisplaySize(this.text.width + (this.textOffset * 2), this.text.height + (this.textOffset * 2));
  }

  destroyLabel ()
  {
    this.text.destroy();
    this.destroy();
  }
}
