import Interactible from "./interactible.js";
import Item from "../items/item.js";
import ItemGenerator from "../items/item-generator.js";

// Clase que representa un cofre que contiene items.
export default class Chest extends Interactible
{
  constructor (config)
  {
    // Llamamos al constructor de la clase base Interactible.
    super(config);

    // ATRIBUTOS

    this.items; // Grupo de items que contiene el cofre.
    this.chestType; // Tipo de cofre que determinara el tipo de items que contiene.
    this.chestName; // Nombre del cofre.
    this.itemQuantity; // Cantidad de items que contiene el cofre.

    // INICIALIZACION

    this.items = this.scene.UI.add.group();
    var chestTypeRandom = 0;
    if(config.type === "")
    {
      chestTypeRandom = Phaser.Math.RND.integerInRange(1, 6);
    }
    if((config.type === "weapons-ammo") | (chestTypeRandom === 1))
    {
      this.chestType = "military";
      this.chestName = "Military Cache";
    }
    else if((config.type === "health") | (chestTypeRandom === 2))
    {
      this.chestType = "health";
      this.chestName = "Firs Aid Cache";
    }
    else if((config.type === "food") | (chestTypeRandom === 3))
    {
      this.chestType = "food";
      this.chestName = "Food Cache";
    }
    else if((config.type === "materials") | (chestTypeRandom === 4))
    {
      this.chestType = "materials";
      this.chestName = "Construction Cache";
    }
    else if((config.type === "gas") | (chestTypeRandom === 5))
    {
      this.chestType = "gas";
      this.chestName = "Gas Cache";
    }
    else if((config.type === "random") | (chestTypeRandom === 6))
    {
      this.chestType = "random";
      this.chestName = "Container";
    }

    // Seteamos la imagen del cofre.
    this.setFrame(this.chestType + ".png", false, false);

    this.itemQuantity = Phaser.Math.RND.integerInRange(config.difficulty, config.difficulty * 2);

    // CONFIGURACION

    // Creamos los items de acuerdo a la cantidad.
    for(var i = 0; i < this.itemQuantity; i++)
    {
      var item = ItemGenerator.generateChestItem(
        {
          scene: this.scene,
          type: this.chestType
        });
      // Los agregamos al grupo de items.
      this.items.add(item);
    }
    // Los ocultamos para que solo sean visibles cuando se abra el cofre.
    this.items.toggleVisible();

    // Oyente para mostrar el contenido del cofre al hacer click.
    this.on('pointerdown', (pointer) =>
    {
      var d = this.scene.player.getDistanceTo(this.body.center);
      if(d <= 35)
      {
        this.scene.UI.inventoryManager.showContainer(this);
      }
    });
  }

  destroyChest ()
  {
    this.items.destroy(true);
    this.destroy();
  }
}
