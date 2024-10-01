import Item from "./item.js";
import Gas from "./gas.js";
import Material from "./material.js";
import Food from "./food.js";
import Seed from "./seed.js";
import Health from "./health.js";
import Melee from "./melee.js";
import Ammo from "./ammo.js";
import Gun from "./gun.js";
import MachineGun from "./machine-gun.js";
import ShotGun from "./shot-gun.js";

// Clase que se encarga de generar todos los item del juego.
export default class ItemGenerator
{
  constructor ()
  {
    // ATRIBUTOS

    //INICIALIZACION

    // CONFIGURACION
  }

  // Metodo que utilizamos para generar item para un cofre, segun una configuracion.
  static generateChestItem (config)
  {
    var sc = config.scene.UI;
    var x = sc.inventoryManager.container.bgOrigin.x;
    var y = sc.inventoryManager.container.bgOrigin.y;
    // Si el cofre es de armas y municion.
    if(config.type === "military")
    {
      var itemType = Phaser.Math.RND.integerInRange(1, 7);
      if(itemType === 1)
      {
        var item = new Melee(
          {
            scene: sc,
            x: x,
            y: y,
            key: "item-atlas",
            equipped: false,
            inContainer: true,
            inBag: false,
            equipable: true,
            usable: false,
            stackable: false,
            name: "Item Name",
            type: "Item Type",
            quantity: 0,
          });
        return item;
      }
      if(itemType === 2)
      {
        var item = new Gun(
          {
            scene: sc,
            x: x,
            y: y,
            key: "item-atlas",
            equipped: false,
            inContainer: true,
            inBag: false,
            equipable: true,
            usable: false,
            stackable: false,
            name: "Item Name",
            type: "Item Type",
            quantity: 0,
          });
        return item;
      }
      if(itemType === 3)
      {
        var item = new MachineGun(
          {
            scene: sc,
            x: x,
            y: y,
            key: "item-atlas",
            equipped: false,
            inContainer: true,
            inBag: false,
            equipable: true,
            usable: false,
            stackable: false,
            name: "Item Name",
            type: "Item Type",
            quantity: 0,
          });
        return item;
      }
      if(itemType === 4)
      {
        var item = new ShotGun(
          {
            scene: sc,
            x: x,
            y: y,
            key: "item-atlas",
            equipped: false,
            inContainer: true,
            inBag: false,
            equipable: true,
            usable: false,
            stackable: false,
            name: "Item Name",
            type: "Item Type",
            quantity: 0,
          });
        return item;
      }
      if(itemType === 5)
      {
        var item = new Ammo(
          {
            scene: sc,
            x: x,
            y: y,
            key: "item-atlas",
            equipped: false,
            inContainer: true,
            inBag: false,
            equipable: true,
            usable: false,
            stackable: true,
            name: "Item Name",
            type: "Item Type"
          });
        return item;
      }
      if(itemType === 6)
      {
        var item = new Ammo(
          {
            scene: sc,
            x: x,
            y: y,
            key: "item-atlas",
            equipped: false,
            inContainer: true,
            inBag: false,
            equipable: true,
            usable: false,
            stackable: true,
            name: "Item Name",
            type: "Item Type"
          });
        return item;
      }
      if(itemType === 7)
      {
        var item = new Ammo(
          {
            scene: sc,
            x: x,
            y: y,
            key: "item-atlas",
            equipped: false,
            inContainer: true,
            inBag: false,
            equipable: true,
            usable: false,
            stackable: true,
            name: "Item Name",
            type: "Item Type"
          });
        return item;
      }
    }

    // Si el cofre es de salud.
    if(config.type === "health")
    {
      var item = new Health(
        {
          scene: sc,
          x: x,
          y: y,
          key: "item-atlas",
          equipped: false,
          inContainer: true,
          inBag: false,
          equipable: true,
          usable: true,
          stackable: false,
          name: "Item Name",
          type: "Item Type",
          quantity: 0,
        });
      return item;
    }

    // Si el cofre es de materiales.
    if(config.type === "materials")
    {
      var item = new Material(
        {
          scene: sc,
          x: x,
          y: y,
          key: "item-atlas",
          equipped: false,
          inContainer: true,
          inBag: false,
          equipable: false,
          usable: false,
          stackable: true,
          name: "Item Name",
          type: "Item Type"
        });
      return item;
    }

    // Si el cofre es de comida.
    if(config.type === "food")
    {
      var itemType = Phaser.Math.RND.integerInRange(1, 2);
      if(itemType === 1)
      {
        var item = new Food(
          {
            scene: sc,
            x: x,
            y: y,
            key: "item-atlas",
            equipped: false,
            inContainer: true,
            inBag: false,
            equipable: false,
            usable: false,
            stackable: true,
            name: "Item Name",
            type: "Item Type"
          });
        return item;
      }
      else if(itemType === 2)
      {
        var item = new Seed(
          {
            scene: sc,
            x: x,
            y: y,
            key: "item-atlas",
            equipped: false,
            inContainer: true,
            inBag: false,
            equipable: false,
            usable: false,
            stackable: true,
            name: "Item Name",
            type: "Item Type"
          });
        return item;
      }
    }

    // Si el cofre es de combustible.
    if(config.type === "gas")
    {
      var item = new Gas(
        {
          scene: sc,
          x: x,
          y: y,
          key: "item-atlas",
          equipped: false,
          inContainer: true,
          inBag: false,
          equipable: false,
          usable: false,
          stackable: true,
          name: "Item Name",
          type: "Item Type"
        });
      return item;
    }

    // Si el cofre es de contenido random.
    if(config.type === "random")
    {
      var itemType = Phaser.Math.RND.integerInRange(1, 12);
      if(itemType === 1)
      {
        var item = new Melee(
          {
            scene: sc,
            x: x,
            y: y,
            key: "item-atlas",
            equipped: false,
            inContainer: true,
            inBag: false,
            equipable: true,
            usable: false,
            stackable: false,
            name: "Item Name",
            type: "Item Type",
            quantity: 0,
          });
        return item;
      }
      if(itemType === 2)
      {
        var item = new Gun(
          {
            scene: sc,
            x: x,
            y: y,
            key: "item-atlas",
            equipped: false,
            inContainer: true,
            inBag: false,
            equipable: true,
            usable: false,
            stackable: false,
            name: "Item Name",
            type: "Item Type",
            quantity: 0,
          });
        return item;
      }
      if(itemType === 3)
      {
        var item = new MachineGun(
          {
            scene: sc,
            x: x,
            y: y,
            key: "item-atlas",
            equipped: false,
            inContainer: true,
            inBag: false,
            equipable: true,
            usable: false,
            stackable: false,
            name: "Item Name",
            type: "Item Type",
            quantity: 0,
          });
        return item;
      }
      if(itemType === 4)
      {
        var item = new ShotGun(
          {
            scene: sc,
            x: x,
            y: y,
            key: "item-atlas",
            equipped: false,
            inContainer: true,
            inBag: false,
            equipable: true,
            usable: false,
            stackable: false,
            name: "Item Name",
            type: "Item Type",
            quantity: 0,
          });
        return item;
      }
      if(itemType === 5)
      {
        var item = new Ammo(
          {
            scene: sc,
            x: x,
            y: y,
            key: "item-atlas",
            equipped: false,
            inContainer: true,
            inBag: false,
            equipable: true,
            usable: false,
            stackable: true,
            name: "Item Name",
            type: "Item Type"
          });
        return item;
      }
      if(itemType === 6)
      {
        var item = new Ammo(
          {
            scene: sc,
            x: x,
            y: y,
            key: "item-atlas",
            equipped: false,
            inContainer: true,
            inBag: false,
            equipable: true,
            usable: false,
            stackable: true,
            name: "Item Name",
            type: "Item Type"
          });
        return item;
      }
      if(itemType === 7)
      {
        var item = new Ammo(
          {
            scene: sc,
            x: x,
            y: y,
            key: "item-atlas",
            equipped: false,
            inContainer: true,
            inBag: false,
            equipable: true,
            usable: false,
            stackable: true,
            name: "Item Name",
            type: "Item Type"
          });
        return item;
      }
      if(itemType === 8)
      {
        var item = new Health(
          {
            scene: sc,
            x: x,
            y: y,
            key: "item-atlas",
            equipped: false,
            inContainer: true,
            inBag: false,
            equipable: true,
            usable: true,
            stackable: false,
            name: "Item Name",
            type: "Item Type",
            quantity: 0,
          });
        return item;
      }
      if(itemType === 9)
      {
        var item = new Material(
          {
            scene: sc,
            x: x,
            y: y,
            key: "item-atlas",
            equipped: false,
            inContainer: true,
            inBag: false,
            equipable: false,
            usable: false,
            stackable: true,
            name: "Item Name",
            type: "Item Type"
          });
        return item;
      }
      if(itemType === 10)
      {
        var item = new Food(
          {
            scene: sc,
            x: x,
            y: y,
            key: "item-atlas",
            equipped: false,
            inContainer: true,
            inBag: false,
            equipable: false,
            usable: false,
            stackable: true,
            name: "Item Name",
            type: "Item Type"
          });
        return item;
      }
      if(itemType === 11)
      {
        var item = new Gas(
          {
            scene: sc,
            x: x,
            y: y,
            key: "item-atlas",
            equipped: false,
            inContainer: true,
            inBag: false,
            equipable: false,
            usable: false,
            stackable: true,
            name: "Item Name",
            type: "Item Type"
          });
        return item;
      }
      if(itemType === 12)
      {
        var item = new Seed(
          {
            scene: sc,
            x: x,
            y: y,
            key: "item-atlas",
            equipped: false,
            inContainer: true,
            inBag: false,
            equipable: false,
            usable: false,
            stackable: true,
            name: "Item Name",
            type: "Item Type"
          });
        return item;
      }
    }
  }

  // Metodo que utilizamos para generar un item de combustible.
  static generateGasItem (config)
  {
    var item = new Gas(config);
    return item;
  }

  // Metodo que utilizamos para generar un item de material.
  static generateMaterialItem (config)
  {
    var item = new Material(config);
    return item;
  }

  // Metodo que utilizamos para generar un item de comida.
  static generateFoodItem (config)
  {
    var item = new Food(config);
    return item;
  }

  // Metodo que utilizamos para generar un item de semilla.
  static generateSeedItem (config)
  {
    var item = new Seed(config);
    return item;
  }

  // Metodo que utilizamos para generar un item de curacion.
  static generateHealthItem (config)
  {
    var item = new Health(config);
    return item;
  }

  // Metodo que utilizamos para generar un item de municion.
  static generateAmmoItem (config)
  {
    var item = new Ammo(config);
    return item;
  }

  // Metodo que utilizamos para generar un item de pistola.
  static generateGunItem (config)
  {
    var item = new Gun(config);
    return item;
  }

  // Metodo que utilizamos para generar un item de ametralladora.
  static generateMachineGunItem (config)
  {
    var item = new MachineGun(config);
    return item;
  }

  // Metodo que utilizamos para generar un item de escopeta.
  static generateShotGunItem (config)
  {
    var item = new ShotGun(config);
    return item;
  }

  // Metodo que utilizamos para generar un item de mele.
  static generateMeleeItem (config)
  {
    var item = new Melee(config);
    return item;
  }
}
