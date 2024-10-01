import MenuButton from "./menu-button.js";

export default class DeathScreen
{
  constructor (config)
  {
    // ATRIBUTOS

    this.background; // Imagen de fondo.
    this.deathMessage; // Mensaje de muerte.
    this.continueButton; // Boton de continue.
    this.quitButton; // Boton de salir.
    this.visible; // Si la pantalla de muerte es visible o no.

    // INICIALIZACION

    this.background = config.scene.add.image(0, 0, config.background);

    this.deathMessage = config.scene.add.image(0, 0, config.deathMessage);

    this.continueButton = new MenuButton(
      {
        scene: config.scene,
        x: config.width / 2,
        y: config.height / 2 + 50,
        backgroundKey: "menu-button-atlas",
        baseFrame: "restart.png",
        highlightFrame: "restart-hl.png",
        visible: config.visible
      });

    this.continueButton.on('pointerdown', (pointer) =>
    {
      config.scene.gameScene.endLevel();
      config.scene.showDeathScreen(false);
      config.scene.characterSheet.fullHeal();
    });

    this.quitButton = new MenuButton(
      {
        scene: config.scene,
        x: config.width / 2,
        y: config.height / 2 + 50,
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
    this.background.setDisplaySize(config.width, config.height);
    this.background.setAlpha(0.8);
    this.background.setVisible(config.visible);

    this.deathMessage.setOrigin(0.5, 0.5);
    this.deathMessage.setPosition(config.width / 2, config.height / 2 - 50);
    this.deathMessage.setDisplaySize(this.deathMessage.width * 2.5, this.deathMessage.height * 2.5);
    this.deathMessage.setVisible(config.visible);

    this.continueButton.setDisplaySize(this.continueButton.width * 1.5, this.continueButton.height * 1.5);
    this.quitButton.setDisplaySize(this.quitButton.width * 1.5, this.quitButton.height * 1.5);

  }

  setVisibleContinue (value)
  {
    this.visible = value;
    this.background.setVisible(value);
    this.deathMessage.setVisible(value);
    this.continueButton.setVisible(value);
  }

  setVisibleQuit (value)
  {
    this.visible = value;
    this.background.setVisible(value);
    this.deathMessage.setVisible(value);
    this.quitButton.setVisible(value);
  }

}
