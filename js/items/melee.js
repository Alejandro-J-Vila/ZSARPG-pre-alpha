import Item from "./item.js";

// Clase que representa un arma blanca.
export default class Melee extends Item
{
  constructor (config)
  {
    // Llamada al constructor de la clase base Item.
    super(config);

    // ATRIBUTOS

    this.damage; // Daño que inflinge al utilizarla.

    //INICIALIZACION

    // CONFIGURACION

    if(config.damage)
    {
      this.damage = config.damage;
    }
    else
    {
      this.damage = 50;
      // Seteamos el nombre del item.
      this.name = "Knife";
      // Seteamos el tipo de item.
      this.type = "melee";
    }
    // Seteamos la imagen del item.
    this.setFrame(this.type + ".png", false, false);

  }

}
