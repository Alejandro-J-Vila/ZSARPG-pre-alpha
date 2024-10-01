
// Clase que representa un boton de menu.
export default class MenuButton extends Phaser.GameObjects.Image
{
  constructor (config)
  {
    // Llamamos al constructor de la clase base Image.
    super(config.scene, config.x, config.y, config.backgroundKey, config.baseFrame);

    // ATRIBUTOS

    this.scene; // Escena donde se ubica el boton.
    this.baseFrame; // Frame base del boton.
    this.highlightFrame; // Frame de marcado del boton.

    // INICIALIZACION

    this.scene = config.scene;
    this.baseFrame = config.baseFrame;
    this.highlightFrame = config.highlightFrame;

    // CONFIGURACION

    config.scene.add.existing(this);
    this.setVisible(config.visible);

    this.setInteractive();

    this.on('pointerover', (pointer) =>
    {
      this.setFrame(this.highlightFrame, false, false);
    });

    this.on('pointerout', (pointer) =>
    {
      this.setFrame(this.baseFrame, false, false);
    });

  }
}
