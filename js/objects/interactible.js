// Clase que representa un objeto interactuable dentro del juego.
export default class Interactible extends Phaser.GameObjects.Sprite
{
  constructor (config)
  {
    // Llamamos al constructor de la clase base Sprite.
    super(config.scene, config.x, config.y, config.spriteKey);

    // ATRIBUTOS

    this.scene; // Escena donde se ubica el objeto.

    // INICIALIZACION

    this.scene = config.scene;

    // CONFIGURACION

    // Habilitamos el cuerpo del sprite y lo agregamos a la escena.
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    // Seteamos la propiedad de inamovible para que el jugador no pueda empujar los objetos.
    this.body.setImmovable(true);
    // Seteamos la propiedad de interactuable para que se pueda interactuar con el mouse.
    this.setInteractive();

    // Oyente para mostrar informacion del objeto al pasar el mouse por encima.
    this.on('pointerover', (pointer) =>
    {
      this.setTint(0xff0000);
      this.scene.UI.chestInteraction = true;
      //var d = this.scene.player.getDistanceTo(this.body.center);
      //console.log(d);
    });

    // Oyente para ocultar la informacion del objeto al sacar el mouse de encima.
    this.on('pointerout', (pointer) =>
    {
      this.clearTint();
      this.scene.UI.chestInteraction = false;
    });

  }

}
