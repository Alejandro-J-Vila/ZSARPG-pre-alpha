import Bar from "./bar.js";

export default class LoadingScreen
{
  constructor (config)
  {
    // ATRIBUTOS

    this.background; // Fondo de pantalla.
    this.loadingBar; // Barra de carga.
    this.loadingText; // Texto de carga.
    this.visible; // Si la pantalla de carga es visible o no.

    // INICIALIZACION

    this.background = config.scene.add.image(0, 0, config.background);

    this.loadingBar = new Bar(
      {
        scene: config.scene,
        x: config.width / 2 - 161,
        y: config.height / 2,
        width: 320,
        height: 40,
        visible: config.visible,
        value: 0,
        maxValue: 100,
        barColor: 0xCD2626,
        barAlpha: 1,
        backgroundColor: 0x000000,
        backgroundAlpha: 1,
        borderColor: 0xFFFFFF,
        borderAlpha: 1,
        textSize: 18,
        extraText: "Progress:"
      });

    this.loadingText = config.scene.make.text(
      {
        x: config.width / 2,
        y: config.height / 2 - 30,
        text: "LOADING...",
        style: { font: "25px Arial", fill: "#ffffff" }
      });

    this.visible = config.visible;

    // CONFIGURACION

    this.background.setOrigin(0, 0);
    this.background.setDisplaySize(config.width, config.height);
    this.background.setVisible(config.visible);
    
    this.loadingText.setOrigin(0.5, 0.5);
    this.loadingText.setVisible(config.visible);

  }

  setVisible (value)
  {
    if(value)
    {
      this.loadingBar.setValue(0, 100);
    }
    this.visible = value;
    this.background.setVisible(value);
    this.loadingBar.setVisible(value);
    this.loadingText.setVisible(value);
  }

}
