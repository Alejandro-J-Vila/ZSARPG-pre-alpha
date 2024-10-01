import Item from "./item.js";

// Clase que representa un material de construccion.
export default class Material extends Item
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
      this.name = "Materials";
      // Seteamos el tipo de item.
      this.type = "material";

      var q = Phaser.Math.RND.integerInRange(1, 10);
      // Seteamos la cantidad de materiales que otorga.
      this.quantity = q;
    }
    // Seteamos la imagen del item.
    this.setFrame(this.type + ".png", false, false);

  }
}
