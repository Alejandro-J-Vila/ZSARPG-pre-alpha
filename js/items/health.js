import Item from "./item.js";

// Clase que representa un item de curacion.
export default class Health extends Item
{
  constructor (config)
  {
    // Llamada al constructor de la clase base Item.
    super(config);

    // ATRIBUTOS

    this.healAmount; // Cantidad de salud que restaura al usarse.

    //INICIALIZACION

    // CONFIGURACION

    if(config.healAmount)
    {
      this.healAmount = config.healAmount;
    }
    else
    {
      this.healAmount = 60;
      // Seteamos el nombre del item.
      this.name = "Med-Kit";
      // Seteamos el tipo de item.
      this.type = "health";
    }
    // Seteamos la imagen del item.
    this.setFrame(this.type + ".png", false, false);
  }
}
