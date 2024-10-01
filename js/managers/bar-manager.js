import Bar from "../ui/bar.js";

// Clase que se encarga de administrar las barras de salud y experiencia presentes en el juego.
export default class BarManager
{
  constructor (config)
  {
    // ATRIBUTOS

    this.scene; // Escena donde se ubican las barras.
    this.playerHealth; // Barra que representa la salud del jugador.
    this.playerXP; // Barra que representa la experiencia del jugador.
    this.targetName; // Texto que usamos para mostrar el nombre del objetivo.
    this.targetHealth; // Barra que representa la salud del objetivo.

    // INICIALIZACION

    this.scene = config.scene;

    this.playerHealth = new Bar(
      {
        scene: config.scene,
        x: config.x / 2 - 161,
        y: 475,
        width: 320,
        height: 30,
        visible: false,
        value: 0,
        maxValue: 0,
        barColor: 0x1DF52B,
        barAlpha: 1,
        backgroundColor: 0x000000,
        backgroundAlpha: 1,
        borderColor: 0xFFFFFF,
        borderAlpha: 1,
        textSize: 18,
        extraText: "Health:"
      });

    this.playerXP = new Bar(
      {
        scene: config.scene,
        x: config.x / 2 - 161,
        y: 511,
        width: 320,
        height: 15,
        visible: false,
        value: 0,
        maxValue: 0,
        barColor: 0x1A00FF,
        barAlpha: 1,
        backgroundColor: 0x000000,
        backgroundAlpha: 1,
        borderColor: 0xFFFFFF,
        borderAlpha: 1,
        textSize: 12,
        extraText: "XP:"
      });

    this.targetName = config.scene.add.text(config.x / 2, 2, "", { font: '25px Arial', fill: '#ffffff' });
    this.targetName.setOrigin(0.5, 0);

    this.targetHealth = new Bar(
      {
        scene: config.scene,
        x: config.x / 2 - 150,
        y: 30,
        width: 300,
        height: 30,
        visible: false,
        value: 0,
        maxValue: 0,
        barColor: 0xCD2626,
        barAlpha: 1,
        backgroundColor: 0x000000,
        backgroundAlpha: 1,
        borderColor: 0xFFFFFF,
        borderAlpha: 1,
        textSize: 18,
        extraText: ""
      });

    // CONFIGURACION

  }

  // Metodo que utilizamos para setear el valor actual y el maximo de la barra de salud del jugador.
  setPlayerHealth (health, maxHealth)
  {
    this.playerHealth.setValue(health, maxHealth);
    this.playerHealth.setVisible(true);
  }

  // Metodo que utilizamos para setear el valor actual y el maximo de la barra de experiencia del jugador.
  setPlayerXP (xp, maxXP)
  {
    this.playerXP.setValue(xp, maxXP);
    this.playerXP.setVisible(true);
  }

  // Metodo que utilizamos para setear los datos del objetivo.
  setTargetHealth (name, health, maxHealth, visible)
  {
    this.targetName.setText(name);
    this.targetHealth.setValue(health, maxHealth);
    this.targetHealth.setVisible(visible);
  }

  // Metodo que utilizamos para actualizar la barra de salud del jugador cuando se cura.
  healPlayerHealth (value)
  {
    this.playerHealth.increment(value);
  }

  // Metodo que utilizamos para actualizar la barra de salud del jugador cuando recibe daño.
  damagePlayerHealth (damage)
  {
    this.playerHealth.decrement(damage);
  }

  // Metodo que utilizamos para actualizar la barra de salud del objetivo cuando recibe daño.
  damageTargetHealth (damage)
  {
    this.targetHealth.decrement(damage);
  }

  // Metodo que utilizamos para actualizar la barra de salud del objetivo cuando se cura.
  healTargetHealth (value)
  {
    this.targetHealth.increment(value);
  }

  // Metodo que utilizamos para actualizar la barra de experiencia del jugador cuando este recibe experiencia.
  increaseXP (value)
  {
    this.playerXP.increment(value);
  }

  // Metodo que utilizamos para actualizar la barra de experiencia del jugador cuando este pierde experiencia.
  decreaseXP (value)
  {
    this.playerXP.decrement(value);
  }

  // Metodo que utilizamos para mostrar / ocultar la barra de salud y experiencia.
  hideUI (value)
  {
    this.playerHealth.setVisible(!value);
    this.playerXP.setVisible(!value);
    if(value)
    {
      this.targetName.setVisible(!value);
      this.targetHealth.setVisible(!value);
    }
  }
}
