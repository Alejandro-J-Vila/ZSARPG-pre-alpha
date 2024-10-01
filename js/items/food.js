import Item from "./item.js";

// Clase que representa la comida.
export default class Food extends Item
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
      this.name = "Carrots Can";
      // Seteamos el tipo de item.
      this.type = "food";

      var q = Phaser.Math.RND.integerInRange(1, 5);
      // Seteamos la cantidad de comida que otorga.
      this.quantity = q;
    }
    // Seteamos la imagen del item.
    this.setFrame(this.type + ".png", false, false);

  }
}
