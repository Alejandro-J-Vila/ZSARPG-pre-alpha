import Item from "./item.js";

// Clase que representa el combustible.
export default class Gas extends Item
{
  constructor (config)
  {
    // Llamada al constructor de la clase base Item.
    super(config);

    // ATRIBUTOS

    //INICIALIZACION

    // CONFIGURACION

    if(!config.quantity)
    {
      // Seteamos el nombre del item.
      this.name = "Gas Can";
      // Seteamos el tipo de item.
      this.type = "gas";

      var q = Phaser.Math.RND.integerInRange(1, 5);
      // Seteamos la cantidad de combustible que otorga.
      this.quantity = q;
    }
    // Seteamos la imagen del item.
    this.setFrame(this.type + ".png", false, false);

  }
}
