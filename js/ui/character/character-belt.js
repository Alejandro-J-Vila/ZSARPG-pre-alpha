// Esta clase representa el cinturon del personaje con slots de acceso rapido.
export default class CharacterBelt
{
  constructor (config)
  {
    // ATRIBUTOS

    this.scene; // La escena donde se ubicara la barra con slots.
    this.x; // La posicion de la barra en x.
    this.y; // La posicion de la barra en y.
    this.visible;

    this.slots;
    this.healthSlot;
    this.meleeSlot;
    this.gunSlot;
    this.machineGunSlot;
    this.shotGunSlot;

    this.items;
    this.healthItem;
    this.meleeItem;
    this.gunItem;
    this.machineGunItem;
    this.shotGunItem;

    this.keys; // Grupo de texto que muestra las teclas de acceso rapido para los slots.
    this.healthKey;
    this.meleeKey;
    this.gunKey;
    this.machineGunKey;
    this.shotGunKey;

    this.meleeSelected;
    this.gunSelected;
    this.machineGunSelected;
    this.shotGunSelected;


    // INICIALIZACION

    this.scene = config.scene;
    this.x = config.x;
    this.y = config.y;
    this.visible = config.visible;

    this.healthSlot = config.scene.add.image(0, 0, "slot-atlas", "health.png");
    this.meleeSlot = config.scene.add.image(0, 0, "slot-atlas", "melee.png");
    this.gunSlot = config.scene.add.image(0, 0, "slot-atlas", "gun.png");
    this.machineGunSlot = config.scene.add.image(0, 0, "slot-atlas", "machine-gun.png");
    this.shotGunSlot = config.scene.add.image(0, 0, "slot-atlas", "shot-gun.png");

    this.slots = [this.healthSlot, this.meleeSlot, this.gunSlot, this.machineGunSlot, this.shotGunSlot];

    this.healthKey = config.scene.add.text(0, 0, "Q", { font: '14px Arial', fill: '#FFFFFF' });
    this.meleeKey = config.scene.add.text(0, 0, "1", { font: '14px Arial', fill: '#FFFFFF' });
    this.gunKey = config.scene.add.text(0, 0, "2", { font: '14px Arial', fill: '#FFFFFF' });
    this.machineGunKey = config.scene.add.text(0, 0, "3", { font: '14px Arial', fill: '#FFFFFF' });
    this.shotGunKey = config.scene.add.text(0, 0, "4", { font: '14px Arial', fill: '#FFFFFF' });

    this.keys = [this.healthKey, this.meleeKey, this.gunKey, this.machineGunKey, this.shotGunKey];

    this.meleeSelected = false;
    this.gunSelected = false;
    this.machineGunSelected = false;
    this.shotGunSelected = false;

    // CONFIGURACION

    Phaser.Actions.GridAlign(this.slots,
      {
        width: 5,
        height: 1,
        cellWidth: 65,
        cellHeight: 65,
        x: config.x - 128,
        y: config.y
      });

    Phaser.Actions.GridAlign(this.keys,
      {
        width: 5,
        height: 1,
        cellWidth: 65,
        cellHeight: 0,
        x: config.x - 100,
        y: config.y + 20
      });

    this.keys.forEach((key) =>
    {
      key.setDepth(6);
    });

    if(!config.visible)
    {
      this.setVisible(config.visible);
    }
  }

  equipHealthItem (item)
  {
    var oldItem = this.healthItem;
    this.healthItem = item;
    item.setPosition(this.healthSlot.x, this.healthSlot.y);
    return oldItem;
  }

  equipMeleeItem (item)
  {
    var oldItem = this.meleeItem;
    this.meleeItem = item;
    item.setPosition(this.meleeSlot.x, this.meleeSlot.y);
    return oldItem;
  }

  equipGunItem (item)
  {
    var oldItem = this.gunItem;
    this.gunItem = item;
    item.setPosition(this.gunSlot.x, this.gunSlot.y);
    return oldItem;
  }

  equipMachineGunItem (item)
  {
    var oldItem = this.machineGunItem;
    this.machineGunItem = item;
    item.setPosition(this.machineGunSlot.x, this.machineGunSlot.y);
    return oldItem;
  }

  equipShotGunItem (item)
  {
    var oldItem = this.shotGunItem;
    this.shotGunItem = item;
    item.setPosition(this.shotGunSlot.x, this.shotGunSlot.y);
    return oldItem;
  }

  unequipHealthItem ()
  {
    this.healthItem = undefined;
  }

  unequipMeleeItem ()
  {
    this.meleeItem = undefined;
    this.meleeSlot.clearTint();
    this.meleeSelected = false;
  }

  unequipGunItem ()
  {
    this.gunItem = undefined;
    this.gunSlot.clearTint();
    if(this.gunSelected)
    {
      this.scene.labelManager.ammoDisplay.showAmmo(false);
    }
    this.gunSelected = false;
  }

  unequipMachineGunItem ()
  {
    this.machineGunItem = undefined;
    this.machineGunSlot.clearTint();
    if(this.machineGunSelected)
    {
      this.scene.labelManager.ammoDisplay.showAmmo(false);
    }
    this.machineGunSelected = false;
  }

  unequipShotGunItem ()
  {
    this.shotGunItem = undefined;
    this.shotGunSlot.clearTint();
    if(this.shotGunSelected)
    {
      this.scene.labelManager.ammoDisplay.showAmmo(false);
    }
    this.shotGunSelected = false;
  }

  // Metodo que utilizamos para seleccionar un arma del cinturon.
  selectWeapon (type)
  {
    this.unselectWeapons();
    if(type === "melee")
    {
      if(this.meleeItem != undefined)
      {
        this.meleeSlot.setTint(0xff0000);
        this.meleeSelected = true;
        return this.meleeItem;
      }
    }
    else if(type === "gun")
    {
      if(this.gunItem != undefined)
      {
        this.gunSlot.setTint(0xff0000);
        this.gunSelected = true;
        return this.gunItem;
      }
    }
    else if(type === "machine-gun")
    {
      if(this.machineGunItem != undefined)
      {
        this.machineGunSlot.setTint(0xff0000);
        this.machineGunSelected = true;
        return this.machineGunItem;
      }
    }
    else if(type === "shot-gun")
    {
      if(this.shotGunItem != undefined)
      {
        this.shotGunSlot.setTint(0xff0000);
        this.shotGunSelected = true;
        return this.shotGunItem;
      }
    }
    return null;
  }

  // Metodo que utilizamos para usar un item de salud equipado en el cinturon.
  useHealthItem ()
  {
    // Si hay algun item de salud equipado.
    if(this.healthItem != undefined)
    {
      return this.scene.inventoryManager.useItem(this.healthItem);
    }
    else
    {
      // Sino, no hacemos nada.
      this.scene.notificationManager.showMessage("no_health");
      return 0;
    }
  }

  // Metodo que utilizamos para deseleccionar todas las armas del cinturon.
  unselectWeapons ()
  {
    this.slots.forEach((slot) =>
    {
      slot.clearTint();
    });
    this.meleeSelected = false;
    this.gunSelected = false;
    this.machineGunSelected = false;
    this.shotGunSelected = false;
    this.scene.labelManager.ammoDisplay.showAmmo(false);
  }

  setVisible (value)
  {
    this.visible = value;

    this.slots.forEach((slot) =>
    {
      slot.setVisible(value);
    });

    this.items = [this.healthItem, this.meleeItem, this.gunItem, this.machineGunItem, this.shotGunItem];

    this.items.forEach((item) =>
    {
      if(item != undefined)
      {
        item.setVisible(value);
      }
    });

    this.keys.forEach((key) =>
    {
      key.setVisible(value);
    });
  }

  shootGun ()
  {
    var shots = this.gunItem.shoot();
    if(shots > 0)
    {
      this.scene.labelManager.ammoDisplay.updateWeaponAmmoCount(this.gunItem.ammoCount);
    }
    else
    {
      this.scene.notificationManager.showMessage("no_ammo");
    }
    return shots;
  }

  shootMachineGun ()
  {
    var shots = this.machineGunItem.shoot();
    if(shots > 0)
    {
      this.scene.labelManager.ammoDisplay.updateWeaponAmmoCount(this.machineGunItem.ammoCount);
    }
    else
    {
      this.scene.notificationManager.showMessage("no_ammo");
    }
    return shots;
  }

  shootShotGun ()
  {
    var shots = this.shotGunItem.shoot();
    if(shots > 0)
    {
      this.scene.labelManager.ammoDisplay.updateWeaponAmmoCount(this.shotGunItem.ammoCount);
    }
    else
    {
      this.scene.notificationManager.showMessage("no_ammo");
    }
    return shots;
  }

}
