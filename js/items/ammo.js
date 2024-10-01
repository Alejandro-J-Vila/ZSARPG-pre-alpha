import Item from "./item.js";

// Clase que representa la municion de las armas.
export default class Ammo extends Item
{
  constructor (config)
  {
    // Llamada al constructor de la clase base Item.
    super(config);

    // ATRIBUTOS

    this.weapon; // Tipo de arma a la cual pertenece esta municion.

    //INICIALIZACION

    // CONFIGURACION

    if(config.weapon)
    {
      this.weapon = config.weapon;
    }
    else
    {
      var ammoType = Phaser.Math.RND.integerInRange(1, 3);
      // Seteamos el nombre del item.
      if(ammoType === 1)
      {
        this.weapon = "gun";
        this.name = "Gun Ammo";
      }
      else if(ammoType === 2)
      {
        this.weapon = "machine-gun";
        this.name = "Machine Gun Ammo";
      }
      else if(ammoType === 3)
      {
        this.weapon = "shot-gun";
        this.name = "Shot Gun Ammo";
      }
      // Seteamos el tipo de item.
      this.type = this.weapon + "-ammo";

      // Seteamos la cantidad de municion que proporciona.
      this.quantity = Phaser.Math.RND.integerInRange(5, 10);
    }
    // Seteamos la imagen del item.
    this.setFrame(this.type + ".png", false, false);

  }

  // Metodo que utilizamos cuando se utiliza la municion para recargar las armas.
  use (count)
  {
    this.quantity -= count;
    if(this.quantity < 0)
    {
      this.quantity = 0;
    }
  }
}
