import Inventory from "../ui/inventory.js";
import CharacterBelt from "../ui/character/character-belt.js";
import CharacterEquipment from "../ui/character/character-equipment.js";
import ItemGenerator from "../items/item-generator.js";

// Clase que se encarga de manejar la mochila, el cinturon y los contenedores con los que interactua el jugador.
// Tambien se encarga del movimiento de items entre estos contenedores.
export default class InventoryManager
{
  constructor (config)
  {
    // ATRIBUTOS

    this.scene; // La escena donde se ubican la mochila, el cinturon y los contenedores.
    this.bag; // Mochila del jugador.
    this.equipment; // Equipo del jugador.
    this.belt; // Cinturon del jugador.
    this.container; // Inventario donde se muestran los items de los contenedores que hay en el juego.
    this.currentContainer; // Contenedor actualmente abierto.
    this.hidden; // Flag de interfaz oculta.

    // INICIALIZACION

    this.scene = config.scene;
    this.hidden = false;

    this.belt = new CharacterBelt(
      {
        scene: config.scene,
        x: config.x / 2,
        y: 565,
        visible: true
      });

    this.bag = new Inventory(
      {
        scene: config.scene,
        title: "Bag",
        x: config.x - (config.x / 4),
        y: config.y / 2,
        rows: 4,
        colums: 5,
        visible: false,
        background: "window",
        slotKey: "slot-atlas",
        slotFrame: "inventory.png"
      });

    this.equipment = new CharacterEquipment(
      {
        scene: config.scene,
        x: config.x - 265,
        y: config.y - 115,
        visible: false
      });

    this.container = new Inventory(
      {
        scene: config.scene,
        title: "",
        x: config.x / 4,
        y: config.y / 2,
        rows: 4,
        colums: 5,
        visible: false,
        background: "window",
        slotKey: "slot-atlas",
        slotFrame: "inventory.png"
      });

    // CONFIGURACION

    // Oyente para el boton de cierre de la mochila.
    this.bag.closeButton.on('pointerdown', (pointer) =>
    {
      this.showInventory();
    });

    // Seteamos el boton de interfaz para abrir / cerrar la mochila.
    this.bag.setInventoryButton(config.x - 30, config.y - 30);

    // Oyente para el boton de interfaz de la mochila.
    this.bag.inventoryButton.on('pointerdown', (pointer) =>
    {
      this.showInventory();
    });

    // Oyente para el boton de cierre del contenedor.
    this.container.closeButton.on('pointerdown', (pointer) =>
    {
      this.showContainer();
    });

  }

  // Metodo que utilizamos para mover un item de un contenedor, a la mochila.
  takeItem (item)
  {
    // Si el item es apilable.
    if(item.stackable)
    {
      // Buscamos en la mochila si ya tenemos otro item de ese tipo.
      var existingItem = this.bag.findItem(item.type);
      // Si tenemos, agregamos la cantidad del nuevo al existente y destruimos el item nuevo.
      if(existingItem != null)
      {
        existingItem.quantity += item.quantity;
        this.destroyItem(item);
        return;
      }
    }
    // Si la mochila no esta llena.
    if(!this.bag.isFull())
    {
      // Agregamos el item a la mochila.
      this.bag.addItem(item);
      // Seteamos el estado del item en la mochila.
      item.setInBag();
      // Eliminamos el item del contenedor.
      this.container.removeItem(item);
    }
    else
    {
      // Si no hay espacio en la mochila y el item no es apilable, no hacemos nada.
      this.scene.notificationManager.showMessage("inventory_full");
    }
  }

  // Metodo que utilizamos para mover un item de la mochila a un contenedor.
  leaveItem (item)
  {
    // Si el item es apilable.
    if(item.stackable)
    {
      // Buscamos en el contenedor si ya hay otro item de ese tipo.
      var existingItem = this.container.findItem(item.type);
      // Si hay alguno, agregamos la cantidad del nuevo al existente y destruimos el item nuevo.
      if(existingItem != null)
      {
        existingItem.quantity += item.quantity;
        this.destroyItem(item);
        return;
      }
    }
    // Si el contenedor no esta lleno.
    if(!this.container.isFull())
    {
      // Agregamos el item al contenedor.
      this.container.addItem(item);
      // Seteamos el estado del item en el contenedor.
      item.setInContainer();
      // Eliminamos el item de la mochila.
      this.bag.removeItem(item);
    }
    else
    {
      // Si no hay espacio en el contenedor, no hacemos nada.
      this.scene.notificationManager.showMessage("container_full");
    }
  }

  // Metodo que utilizamos para equipar un item en el cinturon, o en el equipo.
  equipItem (item)
  {
    var oldItem;
    if(item.type === "health")
    {
      oldItem = this.belt.equipHealthItem(item);
    }
    else if(item.type === "melee")
    {
      oldItem = this.belt.equipMeleeItem(item);
    }
    else if(item.type === "gun")
    {
      oldItem = this.belt.equipGunItem(item);
    }
    else if(item.type === "machine-gun")
    {
      oldItem = this.belt.equipMachineGunItem(item);
    }
    else if(item.type === "shot-gun")
    {
      oldItem = this.belt.equipShotGunItem(item);
    }
    else if(item.type === "gun-ammo")
    {
      oldItem = this.equipment.equipGunAmmo(item);
    }
    else if(item.type === "machine-gun-ammo")
    {
      oldItem = this.equipment.equipMachineGunAmmo(item);
    }
    else if(item.type === "shot-gun-ammo")
    {
      oldItem = this.equipment.equipShotGunAmmo(item);
    }

    // Si el item es apilable y la agregamos a la pila existente, destruimos el item.
    if(oldItem === true)
    {
      this.destroyItem(item);
      return;
    }

    if(item.inBag)
    {
      // Eliminamos el item de la mochila.
      this.bag.removeItem(item);
      if((oldItem != undefined) & (oldItem != false))
      {
        this.bag.addItem(oldItem);
        oldItem.setInBag();
      }
    }
    // Si el item estaba en un contenedor
    else if(item.inContainer)
    {
      // Eliminamos el item del contenedor.
      this.container.removeItem(item);
      if((oldItem != undefined) & (oldItem != false))
      {
        this.container.addItem(oldItem);
        oldItem.setInContainer();
      }
    }
    // Seteamos la propiedad del item a equipado.
    item.setEquipped();

  }

  // Metodo que utilizamos para desequipar un item del cinturon o del equipo.
  unequipItem (item)
  {
    // Si el item es apilable.
    if(item.stackable)
    {
      // Buscamos en la mochila si ya tenemos otro item de ese tipo.
      var existingItem = this.bag.findItem(item.type);
      // Si tenemos, agregamos la cantidad del equipado al existente y destruimos el item equipado.
      if(existingItem != null)
      {
        existingItem.quantity += item.quantity;
        this.destroyItem(item);
        return;
      }
    }
    if(!this.bag.isFull())
    {
      if(item.type === "health")
      {
        this.belt.unequipHealthItem();
      }
      else if(item.type === "melee")
      {
        this.belt.unequipMeleeItem();
      }
      else if(item.type === "gun")
      {
        this.belt.unequipGunItem();
      }
      else if(item.type === "machine-gun")
      {
        this.belt.unequipMachineGunItem();
      }
      else if(item.type === "shot-gun")
      {
        this.belt.unequipShotGunItem();
      }
      else if(item.type === "gun-ammo")
      {
        this.equipment.unequipGunAmmo();
      }
      else if(item.type === "machine-gun-ammo")
      {
        this.equipment.unequipMachineGunAmmo();
      }
      else if(item.type === "shot-gun-ammo")
      {
        this.equipment.unequipShotGunAmmo();
      }
      this.bag.addItem(item);
      item.setInBag();
    }
    else
    {
      this.scene.notificationManager.showMessage("inventory_full");
    }
  }

  // Metodo que utilizamos para usar un item consumible.
  useItem (item)
  {
    if(item.type === "health")
    {
      // Obtenemos el valor de sanacion del item.
      var healAmount = item.healAmount;
      this.destroyItem(item);
      return healAmount;
    }
  }

  // Metodo que utilizamos para destruir un item.
  destroyItem (item)
  {
    if(item.inBag)
    {
      // Si esta en la mochila, lo eliminamos de la misma.
      this.bag.removeItem(item);
    }
    else if(item.inContainer)
    {
      // Si esta en un contenedor, lo eliminamos del mismo.
      this.container.removeItem(item);
    }
    else if(item.equipped)
    {
      if(item.type === "health")
      {
        this.belt.unequipHealthItem();
      }
      else if(item.type === "melee")
      {
        this.belt.unequipMeleeItem();
      }
      else if(item.type === "gun")
      {
        this.belt.unequipGunItem();
      }
      else if(item.type === "machine-gun")
      {
        this.belt.unequipMachineGunItem();
      }
      else if(item.type === "shot-gun")
      {
        this.belt.unequipShotGunItem();
      }
      else if(item.type === "gun-ammo")
      {
        this.equipment.unequipGunAmmo();
      }
      else if(item.type === "machine-gun-ammo")
      {
        this.equipment.unequipMachineGunAmmo();
      }
      else if(item.type === "shot-gun-ammo")
      {
        this.equipment.unequipShotGunAmmo();
      }
    }
    item.destroy();
  }

  // Metodo que utilizamos para seleccionar un arma del cinturon y mostrar / ocultar la municion adecuada.
  selectWeapon (type)
  {
    var weapon = this.belt.selectWeapon(type)
    var ammo;
    if(weapon != null)
    {
      if(weapon.type === "melee")
      {
        this.scene.labelManager.ammoDisplay.showAmmo(false);
      }
      else if(weapon.type === "gun")
      {
        ammo = this.equipment.gunAmmoItem;
        this.scene.labelManager.ammoDisplay.showAmmo(weapon, ammo, "gun", true);
      }
      else if(weapon.type === "machine-gun")
      {
        ammo = this.equipment.machineGunAmmoItem;
        this.scene.labelManager.ammoDisplay.showAmmo(weapon, ammo, "machine-gun", true);
      }
      else if(weapon.type === "shot-gun")
      {
        ammo = this.equipment.shotGunAmmoItem;
        this.scene.labelManager.ammoDisplay.showAmmo(weapon, ammo, "shot-gun", true);
      }
    }
    else
    {
      this.scene.notificationManager.showMessage("no_weapon");
    }
  }

  // Metodo que utilizamos para mostrar / ocultar la mochila.
  showInventory ()
  {
    // Si la interfaz esta oculta ignoramos el pedido.
    if(this.hidden)
    {
      return;
    }
    // Si la mochila esta abierta.
    if(this.bag.visible)
    {
      // La ocultamos.
      this.bag.setVisible(false);
      this.equipment.setVisible(false);
      // Ocultamos el panel de acciones de item, si estaba abierto.
      this.scene.labelManager.showItemActions(null, false);
      // Desactivamos el flag de interaccion con la mochila.
      this.scene.bagInteraction = false;
      this.bag.inventoryButton.clearTint();
    }
    else
    {
      // Si la mochila esta cerrada, cerramos los paneles que esten abiertos y que se superpongan.
      this.scene.closeOverlapPanels("bag");
      // Mostramos la mochila.
      this.bag.setVisible(true);
      this.equipment.setVisible(true);
      // Activamos el flag de interaccion con la mochila.
      this.scene.bagInteraction = true;
      this.bag.inventoryButton.setTint(0xff0000);
    }
  }

  // Metodo que utilizamos para mostrar / ocultar el contenedor.
  showContainer (container)
  {
    // Si hay un contenedor visible.
    if(this.container.visible)
    {
      // Lo ocultamos.
      this.container.setVisible(false);
      // Borramos la referencia al contenedor actual.
      this.currentContainer = undefined;
      // Ocultamos el panel de acciones de item, si estaba abierto.
      this.scene.labelManager.showItemActions(null, false);
      // Desactivamos el flag de interaccion con un contenedor.
      this.scene.containerInteraction = false;
    }
    else
    {
      // Si no hay ningun contenedor visible, cerramos los paneles que esten abiertos y que se superpongan.
      this.scene.closeOverlapPanels("container");
      // Seteamos el contenedor actual.
      this.currentContainer = container;
      // Si el contenedor actual pertenece a un edificio.
      if(this.currentContainer.buildingName)
      {
        // Mostramos el contenido del edificio.
        this.container.showItems(this.currentContainer.buildingName, this.currentContainer.items);
      }
      else
      {
        // Si el contenedor no pertenece a un edificio, mostramos el contenido.
        this.container.showItems(this.currentContainer.chestName, this.currentContainer.items);
      }
      // Activamos el flag de interaccion con un contenedor.
      this.scene.containerInteraction = true;
    }
  }

  // Metodo que utilizamos para cerrar el contenedor si el jugador se aleja mucho del mismo.
  farFromContainer (player)
  {
    if(this.container.visible)
    {
      var d = player.getDistanceTo(this.currentContainer.body.center);
      if(d > 40)
      {
        this.showContainer();
      }
    }
  }

  // Metodo que utilizamos para ocultar la interfaz de inventario y cinturon.
  hideUI (value)
  {
    this.hidden = value;
    this.bag.hideInventoryButton(!value);
    this.belt.setVisible(!value);
  }

  // Metodo que utilizamos para depositar todas los items de tipo dado, que estan en la mochila, en el contenedor del edificio dado.
  depositAllItems (itemType)
  {
    // Obtenemos los items de la mochila.
    var bagItems = this.bag.items.getChildren();
    // Creamos un arreglo auxiliar para almacenar los items a depositar.
    // Esto es necesario ya que la operacion de dejar un item, saca el item de la mochila.
    // Por lo tanto cambia la cantidad de items en cada iteracion del recorrido.
    var depositItems = [];
    // Creamos un indice para manejar el arreglo de depositos.
    var d = 0;
    // Creamos un arreglo auxiliar para almacenar los items a destruir.
    // Esto es necesario ya que la comida, los materiales y el combustible se transforman en numeros.
    // Por lo tanto luego de guardar el numero, los destruimos.
    var destroyItems = [];
    // Creamos un indice para manejar el arreglo de destruccion.
    var k = 0;
    // Por cada item de la mochila.
    for(var i = 0; i < bagItems.length; i++)
    {
      // Si el tipo de item corresponde con el tipo dado, lo ponemos en el arreglo auxiliar correspondiente.
      if(itemType === "weapons-ammo")
      {
        if(bagItems[i].isWeapon() | bagItems[i].isAmmo())
        {
          this.scene.notificationManager.showMessage("item_stored", bagItems[i].name);
          depositItems[d] = bagItems[i];
          d++;
        }
      }
      else if(itemType === "health")
      {
        if(bagItems[i].isHealth())
        {
          this.scene.notificationManager.showMessage("item_stored", bagItems[i].name);
          depositItems[d] = bagItems[i];
          d++;
        }
      }
      else if(itemType === "food")
      {
        if(bagItems[i].isFood())
        {
          this.scene.notificationManager.showMessage("item_stored", bagItems[i].quantity + " " + bagItems[i].name);
          this.scene.gameScene.food += bagItems[i].quantity;
          destroyItems[k] = bagItems[i];
          k++;
        }
      }
      else if(itemType === "gas")
      {
        if(bagItems[i].isGas())
        {
          this.scene.notificationManager.showMessage("item_stored", bagItems[i].quantity + " " + bagItems[i].name);
          this.scene.gameScene.gas += bagItems[i].quantity;
          destroyItems[k] = bagItems[i];
          k++;
        }
      }
      else if(itemType === "material")
      {
        if(bagItems[i].isMaterial())
        {
          this.scene.notificationManager.showMessage("item_stored", bagItems[i].quantity + " " + bagItems[i].name);
          this.scene.gameScene.materials += bagItems[i].quantity;
          destroyItems[k] = bagItems[i];
          k++;
        }
      }
      else if(itemType === "seed")
      {
        if(bagItems[i].isSeed())
        {
          this.scene.notificationManager.showMessage("item_stored", bagItems[i].quantity + " " + bagItems[i].name);
          this.scene.gameScene.seeds += bagItems[i].quantity;
          destroyItems[k] = bagItems[i];
          k++;
        }
      }
    }
    // Cuando tenemos todos los items a depositar.
    for(var j = 0; j < depositItems.length; j++)
    {
      // Los sacamos de la mochila y los pasamos al contenedor.
      this.leaveItem(depositItems[j]);
    }
    // Cuando tenemos todos los items a destruir.
    for(var h = 0; h < k; h++)
    {
      // Los destruimos.
      this.destroyItem(destroyItems[h]);
    }
  }

  // Metodo que utilizamos para chequear si tenemos la cantidad necesaria de un cierto recurso.
  checkResource (resourceType, quantityNeeded)
  {
    var bagQuantity = 0;
    var storeQuantity = 0;
    var totalQuantity = 0;
    // Obtenemos la cantidad almacenada en la base.
    if(resourceType === "food")
    {
      storeQuantity = this.scene.gameScene.food;
    }
    if(resourceType === "seed")
    {
      storeQuantity = this.scene.gameScene.seeds;
    }
    if(resourceType === "gas")
    {
      storeQuantity = this.scene.gameScene.gas;
    }
    if(resourceType === "material")
    {
      storeQuantity = this.scene.gameScene.materials;
    }
    if(resourceType === "crop waste")
    {
      storeQuantity = this.scene.gameScene.cropWaste;
    }
    // Obtenemos la cantidad almacenada en la mochila.
    var resource = this.bag.findItem(resourceType);
    if(resource != null)
    {
      bagQuantity = resource.quantity;
    }
    // Verificamos si la suma de ambas cantidades alcanza a cubrir la demanda.
    totalQuantity = bagQuantity + storeQuantity;
    if(totalQuantity >= quantityNeeded)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  // Metodo que utilizamos para usar una dada cantidad de recursos de un cierto tipo.
  useResource (resourceType, quantityNeeded)
  {
    var bagQuantity;
    var storeQuantity;
    var totalQuantity;
    var resQuantity;
    // Obtenemos la cantidad almacenada en la mochila.
    var resource = this.bag.findItem(resourceType);
    if(resource != null)
    {
      bagQuantity = resource.quantity;
    }
    // Si alcanza a cubrir la demanda, utilizamos los recursos de la mochila.
    if(bagQuantity >= quantityNeeded)
    {
      resource.quantity -= quantityNeeded;
      if(resource.quantity === 0)
      {
        this.destroyItem(resource);
      }
      return;
    }
    // Sino, obtenemos la cantidad almacenada en la base.
    if(resourceType === "food")
    {
      storeQuantity = this.scene.gameScene.food;
    }
    if(resourceType === "seed")
    {
      storeQuantity = this.scene.gameScene.seeds;
    }
    if(resourceType === "gas")
    {
      storeQuantity = this.scene.gameScene.gas;
    }
    if(resourceType === "material")
    {
      storeQuantity = this.scene.gameScene.materials;
    }
    if(resourceType === "crop waste")
    {
      storeQuantity = this.scene.gameScene.cropWaste;
    }
    // Si alcanza a cubrir la demanda, utilizamos los recursos de la base.
    if(storeQuantity >= quantityNeeded)
    {
      if(resourceType === "food")
      {
        this.scene.gameScene.food -= quantityNeeded;
        return;
      }
      if(resourceType === "seed")
      {
        this.scene.gameScene.seeds -= quantityNeeded;
        return;
      }
      if(resourceType === "gas")
      {
        this.scene.gameScene.gas -= quantityNeeded;
        return;
      }
      if(resourceType === "material")
      {
        this.scene.gameScene.materials -= quantityNeeded;
        return;
      }
      if(resourceType === "crop waste")
      {
        this.scene.gameScene.cropWaste -= quantityNeeded;
        return;
      }
    }
    // Sino, sumamos ambas cantidades.
    totalQuantity = bagQuantity + storeQuantity;
    // Si alcanza a cubrir la demanda...
    if(totalQuantity >= quantityNeeded)
    {
      // Utilizamos toda la cantidad de la mochila.
      resQuantity = quantityNeeded - resource.quantity;
      this.destroyItem(resource);
      // Y el resto lo consumimos de la base.
      if(resourceType === "food")
      {
        this.scene.gameScene.food -= resQuantity;
        return;
      }
      if(resourceType === "seed")
      {
        this.scene.gameScene.seeds -= resQuantity;
        return;
      }
      if(resourceType === "gas")
      {
        this.scene.gameScene.gas -= resQuantity;
        return;
      }
      if(resourceType === "material")
      {
        this.scene.gameScene.materials -= resQuantity;
        return;
      }
      if(resourceType === "crop Waste")
      {
        this.scene.gameScene.cropWaste -= resQuantity;
        return;
      }
    }
  }

  loadEquipment (save)
  {
    if(save.gAmmo)
    {
      save.gAmmo.scene = this.scene;
      save.gAmmo.x = this.equipment.gunAmmoSlot.x;
      save.gAmmo.y = this.equipment.gunAmmoSlot.y;
      this.equipment.gunAmmoItem = ItemGenerator.generateAmmoItem(save.gAmmo);
      this.equipment.gunAmmoItem.setVisible(this.equipment.visible);
    }
    if(save.mgAmmo)
    {
      save.mgAmmo.scene = this.scene;
      save.mgAmmo.x = this.equipment.machineGunAmmoSlot.x;
      save.mgAmmo.y = this.equipment.machineGunAmmoSlot.y;
      this.equipment.machineGunAmmoItem = ItemGenerator.generateAmmoItem(save.mgAmmo);
      this.equipment.machineGunAmmoItem.setVisible(this.equipment.visible);
    }
    if(save.sgAmmo)
    {
      save.sgAmmo.scene = this.scene;
      save.sgAmmo.x = this.equipment.shotGunAmmoSlot.x;
      save.sgAmmo.y = this.equipment.shotGunAmmoSlot.y;
      this.equipment.shotGunAmmoItem = ItemGenerator.generateAmmoItem(save.sgAmmo);
      this.equipment.shotGunAmmoItem.setVisible(this.equipment.visible);
    }
  }

  loadBelt (save)
  {
    if(save.health)
    {
      save.health.scene = this.scene;
      save.health.x = this.belt.healthSlot.x;
      save.health.y = this.belt.healthSlot.y;
      this.belt.healthItem = ItemGenerator.generateHealthItem(save.health);
      this.belt.healthItem.setVisible(this.belt.visible);
    }
    if(save.melee)
    {
      save.melee.scene = this.scene;
      save.melee.x = this.belt.meleeSlot.x;
      save.melee.y = this.belt.meleeSlot.y;
      this.belt.meleeItem = ItemGenerator.generateMeleeItem(save.melee);
      this.belt.meleeItem.setVisible(this.belt.visible);
    }
    if(save.gun)
    {
      save.gun.scene = this.scene;
      save.gun.x = this.belt.gunSlot.x;
      save.gun.y = this.belt.gunSlot.y;
      this.belt.gunItem = ItemGenerator.generateGunItem(save.gun);
      this.belt.gunItem.setVisible(this.belt.visible);
    }
    if(save.mgun)
    {
      save.mgun.scene = this.scene;
      save.mgun.x = this.belt.machineGunSlot.x;
      save.mgun.y = this.belt.machineGunSlot.y;
      this.belt.machineGunItem = ItemGenerator.generateMachineGunItem(save.mgun);
      this.belt.machineGunItem.setVisible(this.belt.visible);
    }
    if(save.sgun)
    {
      save.sgun.scene = this.scene;
      save.sgun.x = this.belt.shotGunSlot.x;
      save.sgun.y = this.belt.shotGunSlot.y;
      this.belt.shotGunItem = ItemGenerator.generateShotGunItem(save.sgun);
      this.belt.shotGunItem.setVisible(this.belt.visible);
    }
  }

  loadBag (save)
  {
    var itm;
    for(var i = 0; i < save.length; i++)
    {
      save[i].scene = this.scene;
      save[i].x = this.bag.bgOrigin.x;
      save[i].y = this.bag.bgOrigin.y;
      if(save[i].type === "gas")
      {
        itm = ItemGenerator.generateGasItem(save[i]);
      }
      else if(save[i].type === "material")
      {
        itm = ItemGenerator.generateMaterialItem(save[i]);
      }
      else if(save[i].type === "food")
      {
        itm = ItemGenerator.generateFoodItem(save[i]);
      }
      else if(save[i].type === "seed")
      {
        itm = ItemGenerator.generateSeedItem(save[i]);
      }
      else if(save[i].type === "health")
      {
        itm = ItemGenerator.generateHealthItem(save[i]);
      }
      else if((save[i].type === "gun-ammo") | (save[i].type === "machine-gun-ammo") | (save[i].type === "shot-gun-ammo"))
      {
        itm = ItemGenerator.generateAmmoItem(save[i]);
      }
      else if(save[i].type === "gun")
      {
        itm = ItemGenerator.generateGunItem(save[i]);
      }
      else if(save[i].type === "machine-gun")
      {
        itm = ItemGenerator.generateMachineGunItem(save[i]);
      }
      else if(save[i].type === "shot-gun")
      {
        itm = ItemGenerator.generateShotGunItem(save[i]);
      }
      else if(save[i].type === "melee")
      {
        itm = ItemGenerator.generateMeleeItem(save[i]);
      }
      this.bag.addItem(itm);
    }
  }

}
