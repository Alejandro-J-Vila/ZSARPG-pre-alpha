// Esta clase representa el equipo que lleva el personaje.
export default class CharacterEquipment
{
  constructor (config)
  {
    // ATRIBUTOS

    this.scene; // La escena donde se ubicara el equipo.
    this.x; // La posicion del equipo en x.
    this.y; // La posicion del equipo en y.
    this.visible; // Si es visible o no al momento de la creacion.

    this.ammoSlots; // Espacios del equipo donde se ubicaran objetos de municion.
    this.gunAmmoSlot;
    this.machineGunAmmoSlot;
    this.shotGunAmmoSlot;

    this.gunAmmoItem;
    this.machineGunAmmoItem;
    this.shotGunAmmoItem;

    // INICIALIZACION

    this.scene = config.scene;
    this.x = config.x;
    this.y = config.y;
    this.visible = config.visible;

    this.gunAmmoSlot = config.scene.add.image(0, 0, "slot-atlas", "gun-ammo.png");
    this.machineGunAmmoSlot = config.scene.add.image(0, 0, "slot-atlas", "machine-gun-ammo.png");
    this.shotGunAmmoSlot = config.scene.add.image(0, 0, "slot-atlas", "shot-gun-ammo.png");
    this.ammoSlots = [this.gunAmmoSlot, this.machineGunAmmoSlot, this.shotGunAmmoSlot];

    // CONFIGURACION

    Phaser.Actions.GridAlign(this.ammoSlots,
      {
        width: this.ammoSlots.length,
        height: 1,
        cellWidth: 65,
        cellHeight: 65,
        x: config.x,
        y: config.y
      });

      this.gunAmmoSlot.setVisible(false);
      this.machineGunAmmoSlot.setVisible(false);
      this.shotGunAmmoSlot.setVisible(false);
  }

  // Metodo que utilizamos para cambiar la visibilidad del equipo.
  setVisible (value)
  {
    this.visible = value;
    this.gunAmmoSlot.setVisible(value);
    this.machineGunAmmoSlot.setVisible(value);
    this.shotGunAmmoSlot.setVisible(value);
    if(this.gunAmmoItem != undefined)
    {
      this.gunAmmoItem.setVisible(value);
    }
    if(this.machineGunAmmoItem != undefined)
    {
      this.machineGunAmmoItem.setVisible(value);
    }
    if(this.shotGunAmmoItem != undefined)
    {
      this.shotGunAmmoItem.setVisible(value);
    }
  }

  equipGunAmmo (item)
  {
    var existingItem;
    if(this.gunAmmoItem != undefined)
    {
      this.gunAmmoItem.quantity += item.quantity;
      existingItem = true;
    }
    else
    {
      this.gunAmmoItem = item;
      item.setPosition(this.gunAmmoSlot.x, this.gunAmmoSlot.y);
      item.setVisible(this.visible);
      existingItem = false;
    }
    if(this.scene.inventoryManager.belt.gunSelected)
    {
      this.scene.labelManager.ammoDisplay.updateAmmoCount(this.gunAmmoItem.quantity);
    }
    return existingItem;
  }

  equipMachineGunAmmo (item)
  {
    var existingItem;
    if(this.machineGunAmmoItem != undefined)
    {
      this.machineGunAmmoItem.quantity += item.quantity;
      existingItem = true;
    }
    else
    {
      this.machineGunAmmoItem = item;
      item.setPosition(this.machineGunAmmoSlot.x, this.machineGunAmmoSlot.y);
      item.setVisible(this.visible);
      existingItem = false;
    }
    if(this.scene.inventoryManager.belt.machineGunSelected)
    {
      this.scene.labelManager.ammoDisplay.updateAmmoCount(this.machineGunAmmoItem.quantity);
    }
    return existingItem;
  }

  equipShotGunAmmo (item)
  {
    var existingItem;
    if(this.shotGunAmmoItem != undefined)
    {
      this.shotGunAmmoItem.quantity += item.quantity;
      existingItem = true;
    }
    else
    {
      var oldItem = this.shotGunAmmoItem;
      this.shotGunAmmoItem = item;
      item.setPosition(this.shotGunAmmoSlot.x, this.shotGunAmmoSlot.y);
      item.setVisible(this.visible);
      existingItem = false;
    }
    if(this.scene.inventoryManager.belt.shotGunSelected)
    {
      this.scene.labelManager.ammoDisplay.updateAmmoCount(this.shotGunAmmoItem.quantity);
    }
    return existingItem;
  }

  unequipGunAmmo ()
  {
    this.gunAmmoItem = undefined;
    if(this.scene.inventoryManager.belt.gunSelected)
    {
      this.scene.labelManager.ammoDisplay.updateAmmoCount(0);
    }
  }

  unequipMachineGunAmmo ()
  {
    this.machineGunAmmoItem = undefined;
    if(this.scene.inventoryManager.belt.machineGunSelected)
    {
      this.scene.labelManager.ammoDisplay.updateAmmoCount(0);
    }
  }

  unequipShotGunAmmo ()
  {
    this.shotGunAmmoItem = undefined;
    if(this.scene.inventoryManager.belt.shotGunSelected)
    {
      this.scene.labelManager.ammoDisplay.updateAmmoCount(0);
    }
  }

  reloadGun ()
  {
    if(this.gunAmmoItem != undefined)
    {
      this.scene.inventoryManager.belt.gunItem.reload(this.gunAmmoItem);
      this.scene.labelManager.ammoDisplay.updateWeaponAmmoCount(this.scene.inventoryManager.belt.gunItem.ammoCount);
      if(this.gunAmmoItem.quantity === 0)
      {
        this.gunAmmoItem.destroy();
      }
      this.scene.labelManager.ammoDisplay.updateAmmoCount(this.gunAmmoItem.quantity);

    }
    else
    {
      this.scene.notificationManager.showMessage("no_ammo");
    }
  }

  reloadMachineGun ()
  {
    if(this.machineGunAmmoItem != undefined)
    {
      this.scene.inventoryManager.belt.machineGunItem.reload(this.machineGunAmmoItem);
      this.scene.labelManager.ammoDisplay.updateWeaponAmmoCount(this.scene.inventoryManager.belt.machineGunItem.ammoCount);
      this.scene.labelManager.ammoDisplay.updateAmmoCount(this.machineGunAmmoItem.quantity);
      if(this.machineGunAmmoItem.quantity === 0)
      {
        this.machineGunAmmoItem.destroy();
      }
    }
    else
    {
      this.scene.notificationManager.showMessage("no_ammo");
    }
  }

  reloadShotGun ()
  {
    if(this.shotGunAmmoItem != undefined)
    {
      this.scene.inventoryManager.belt.shotGunItem.reload(this.shotGunAmmoItem);
      this.scene.labelManager.ammoDisplay.updateWeaponAmmoCount(this.scene.inventoryManager.belt.shotGunItem.ammoCount);
      this.scene.labelManager.ammoDisplay.updateAmmoCount(this.shotGunAmmoItem.quantity);
      if(this.shotGunAmmoItem.quantity === 0)
      {
        this.shotGunAmmoItem.destroy();
      }
    }
    else
    {
      this.scene.notificationManager.showMessage("no_ammo");
    }
  }

}
