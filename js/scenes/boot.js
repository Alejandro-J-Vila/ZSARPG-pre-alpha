// Usamos esta escena para cargar las cosas que necesitamos para la pantalla de carga.
export default class BootScene extends Phaser.Scene
{
  constructor ()
  {
    super("boot");
  }

  preload ()
  {
    //this.load.image("logo", "./assets/images/logo.png");
    this.load.image("loading-screen", "./assets/sprites/backgrounds/loading-screen.png");
  }

  create ()
  {
    this.scene.start("preload");
  }
}
