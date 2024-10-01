// Clase que representa un grupo de botones de texto.
export default class ButtonGroup extends Phaser.GameObjects.Image
{
  constructor (config)
  {
    // Llamamos al constructor de la clase Image para que inicialice la misma.
    super(config.scene, config.x, config.y, config.key);

    config.scene.add.existing(this);

    // ATRIBUTOS

    this.scene; // Escena donde se ubica el grupo de botones.
    this.buttons; // Grupo de botones.
    this.cantButtons; // Cantidad de botones en el grupo.
    this.closeButton; // Boton extra para cerrar el panel.

    // INICIALIZACION

    this.scene = config.scene;

    this.buttons = [];
    for(var i = 0; i < config.cantButtons; i++)
    {
      this.buttons[i] = config.scene.add.text(config.x, config.y, config.buttonNames[i], { font: '16px Arial', fill: '#FFFFFF' });
      this.buttons[i].setVisible(config.visible);
      this.buttons[i].setInteractive();
    }

    this.closeButton = config.scene.add.text(config.x, config.y, "Close", { font: '16px Arial', fill: '#FFFFFF' });
    this.buttons[i] = this.closeButton;

    // Agregamos un boton extra para cerrar el grupo.

    this.closeButton.setVisible(config.visible);
    this.closeButton.setInteractive();

    this.buttons.forEach((button) =>
    {
      button.on('pointerover', (pointer) =>
      {
        button.setTint(0xFFEF00);
      });

      button.on('pointerout', (pointer) =>
      {
        button.clearTint();
      });
    });

    this.cantButtons = config.cantButtons + 1;

    // CONFIGURACION

    this.setVisible(config.visible);

  }

  // Metodo que utilizamos para cambiar la visibilidad del grupo de botones.
  setVisibility (value)
  {
    this.setVisible(value);
    for(var i = 0; i < this.cantButtons; i++)
    {
      this.buttons[i].setVisible(value);
    }
  }

  // Metodo que utilizamos para setear la posicion del grupo de botones.
  setPos (x, y)
  {
    var w = 0;
    var h = 0;
    for(var i = 0; i < this.buttons.length; i++)
    {
      h += this.buttons[i].height;
      if(this.buttons[i].width > w)
      {
        w = this.buttons[i].width;
      }
    }
    w += 10;
    h += 10;
    this.setDisplaySize(w, h);
    this.setPosition(x, y);
    var bgOrigin = this.getTopLeft();
    Phaser.Actions.GridAlign(this.buttons,
      {
        width: 1,
        height: this.cantButtons,
        cellWidth: w,
        cellHeight: this.buttons[0].height,
        position: Phaser.Display.Align.CENTER,
        x: bgOrigin.x + (w / 2),
        y: bgOrigin.y + 13
      });
  }

  // Metodo que utilizamos para setear la profundidad en escena del grupo de botones.
  setGroupDepth (value)
  {
    this.setDepth(value);
    for(var i = 0; i < this.cantButtons; i++)
    {
      this.buttons[i].setDepth(value + 1);
    }
  }

}
