import Item from "./item.js";

// Clase que representa semillas para plantar.
export default class Seed extends Item
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
      this.name = "Carrot Seed";
      // Seteamos el tipo de item.
      this.type = "seed";

      var q = Phaser.Math.RND.integerInRange(5, 10);
      // Seteamos la cantidad de comida que otorga.
      this.quantity = q;
    }

    // Seteamos la imagen del item.
    this.setFrame(this.type + ".png", false, false);

  }
}
