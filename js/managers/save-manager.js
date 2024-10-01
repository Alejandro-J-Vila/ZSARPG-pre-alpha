// Clase encargada de guardar y cargar las partidas.
export default class SaveManager
{
  constructor (config)
  {
    // ATRIBUTOS

    this.scene;

    // INICIALIZACION

    this.scene = config.scene;

    // CONFIGURACION
  }

  saveGame (saveName)
  {
    var save =
    {
      player:
      {
        name: this.scene.characterSheet.name,
        level: this.scene.characterSheet.level,
        xp: this.scene.characterSheet.xp,
        maxXP: this.scene.characterSheet.maxXP,
        health: this.scene.characterSheet.health,
        maxHealth: this.scene.characterSheet.maxHealth,
        strength: this.scene.characterSheet.strength,
        dexterity: this.scene.characterSheet.dexterity,
        intelligence: this.scene.characterSheet.intelligence,
        vitality: this.scene.characterSheet.vitality,
        moveSpeed: this.scene.characterSheet.moveSpeed,
        attackSpeed: this.scene.characterSheet.attackSpeed,
        pointsLeft: this.scene.characterSheet.pointsLeft
      },
      equipment: this.saveEquipment(),
      belt: this.saveBelt(),
      bag: this.saveBag(),
      buildings: this.saveBuildings(),
      resources:
      {
        food: this.scene.gameScene.food,
        materials: this.scene.gameScene.materials,
        gas: this.scene.gameScene.gas,
        cropWaste: this.scene.gameScene.cropWaste,
        seeds: this.scene.gameScene.seeds
      },
      day:
      {
        minute: this.scene.dayTimeManager.minuteCount,
        hour: this.scene.dayTimeManager.hourCount,
        day: this.scene.dayTimeManager.dayCount,
        horde: this.scene.dayTimeManager.nextHorde
      }
    };

    localStorage.setItem(saveName, JSON.stringify(save));
  }

  // Metodo que utilizamos para guardar los datos relevantes del equipo del jugador.
  saveEquipment ()
  {
    var ga = this.scene.inventoryManager.equipment.gunAmmoItem;
    var gunAmmo;
    if(ga != undefined)
    {
      gunAmmo =
      {
        key: ga.texture.key,
        inBag: ga.inBag,
        inContainer: ga.inContainer,
        equipped: ga.equipped,
        equipable: ga.equipable,
        usable: ga.usable,
        stackable: ga.stackable,
        name: ga.name,
        type: ga.type,
        quantity: ga.quantity,
        weapon: ga.weapon
      };
    }

    var mga = this.scene.inventoryManager.equipment.machineGunAmmoItem;
    var mgAmmo;
    if(mga != undefined)
    {
      mgAmmo =
      {
        key: mga.texture.key,
        inBag: mga.inBag,
        inContainer: mga.inContainer,
        equipped: mga.equipped,
        equipable: mga.equipable,
        usable: mga.usable,
        stackable: ga.stackable,
        name: mga.name,
        type: mga.type,
        quantity: mga.quantity,
        weapon: mga.weapon
      };
    }

    var sga = this.scene.inventoryManager.equipment.shotGunAmmoItem;
    var sgAmmo;
    if(sga != undefined)
    {
      sgAmmo =
      {
        key: sga.texture.key,
        inBag: sga.inBag,
        inContainer: sga.inContainer,
        equipped: sga.equipped,
        equipable: sga.equipable,
        usable: sga.usable,
        stackable: sga.stackable,
        name: sga.name,
        type: sga.type,
        quantity: sga.quantity,
        weapon: sga.weapon
      };
    }

    var eq =
    {
      gAmmo: gunAmmo,
      mgAmmo: mgAmmo,
      sgAmmo: sgAmmo
    };

    return eq;
  }

  // Metodo que utilizamos para guardar los datos relevantes del cinturon del jugador.
  saveBelt ()
  {
    var hi = this.scene.inventoryManager.belt.healthItem;
    var health;
    if(hi != undefined)
    {
      health =
      {
        key: hi.texture.key,
        inBag: hi.inBag,
        inContainer: hi.inContainer,
        equipped: hi.equipped,
        equipable: hi.equipable,
        usable: hi.usable,
        stackable: hi.stackable,
        name: hi.name,
        type: hi.type,
        quantity: hi.quantity,
        healAmount: hi.healAmount
      };
    }

    var mi = this.scene.inventoryManager.belt.meleeItem;
    var melee;
    if(mi != undefined)
    {
      melee =
      {
        key: mi.texture.key,
        inBag: mi.inBag,
        inContainer: mi.inContainer,
        equipped: mi.equipped,
        equipable: mi.equipable,
        usable: mi.usable,
        stackable: mi.stackable,
        name: mi.name,
        type: mi.type,
        quantity: mi.quantity,
        damage: mi.damage,
      };
    }

    var gi = this.scene.inventoryManager.belt.gunItem;
    var gun;
    if(gi != undefined)
    {
      gun =
      {
        key: gi.texture.key,
        inBag: gi.inBag,
        inContainer: gi.inContainer,
        equipped: gi.equipped,
        equipable: gi.equipable,
        usable: gi.usable,
        stackable: gi.stackable,
        name: gi.name,
        type: gi.type,
        quantity: gi.quantity,
        damage: gi.damage,
        clipSize: gi.clipSize,
        ammoCount: gi.ammoCount
      };
    }

    var mgi = this.scene.inventoryManager.belt.machineGunItem;
    var mgun;
    if(mgi != undefined)
    {
      mgun =
      {
        key: mgi.texture.key,
        inBag: mgi.inBag,
        inContainer: mgi.inContainer,
        equipped: mgi.equipped,
        equipable: mgi.equipable,
        usable: mgi.usable,
        stackable: mgi.stackable,
        name: mgi.name,
        type: mgi.type,
        quantity: mgi.quantity,
        damage: mgi.damage,
        clipSize: mgi.clipSize,
        ammoCount: mgi.ammoCount
      };
    }

    var sgi = this.scene.inventoryManager.belt.shotGunItem;
    var sgun;
    if(sgi != undefined)
    {
      sgun =
      {
        key: sgi.texture.key,
        inBag: sgi.inBag,
        inContainer: sgi.inContainer,
        equipped: sgi.equipped,
        equipable: sgi.equipable,
        usable: sgi.usable,
        stackable: sgi.stackable,
        name: sgi.name,
        type: sgi.type,
        quantity: sgi.quantity,
        damage: sgi.damage,
        clipSize: sgi.clipSize,
        ammoCount: sgi.ammoCount
      };
    }

    var blt =
    {
      health: health,
      melee: melee,
      gun: gun,
      mgun: mgun,
      sgun: sgun
    };

    return blt;
  }

  // Metodo que utilizamos para guardar los datos relevantes de la mochila del jugador.
  saveBag ()
  {
    var its =  this.scene.inventoryManager.bag.items.getChildren();
    var bg = [];
    for(var i = 0; i < its.length; i++)
    {
      bg[i] =
      {
        key: its[i].texture.key,
        inBag: its[i].inBag,
        inContainer: its[i].inContainer,
        equipped: its[i].equipped,
        equipable: its[i].equipable,
        usable: its[i].usable,
        stackable: its[i].stackable,
        name: its[i].name,
        type: its[i].type,
        quantity: its[i].quantity,
        weapon: its[i].weapon,
        damage: its[i].damage,
        clipSize: its[i].clipSize,
        ammoCount: its[i].ammoCount,
        healAmount: its[i].healAmount
      };
    }
    return bg;
  }

  // Metodo que utilizamos para guardar los datos relevantes de los edificios del jugador.
  saveBuildings ()
  {
    var bgr =  this.scene.gameScene.buildingManager.buildings.getChildren();
    var blds = [];
    for(var i = 0; i < bgr.length; i++)
    {
      blds[i] =
      {
        x: bgr[i].x,
        y: bgr[i].y,
        buildingName: bgr[i].buildingName,
        buildingCost: bgr[i].buildingCost,
        health: bgr[i].health,
        maxHealth: bgr[i].maxHealth,
        level: bgr[i].level,
        items: this.saveBuildingItems(bgr[i]),
        damage: bgr[i].damage,
        radius: bgr[i].radius,
        inProduction: bgr[i].inProduction,
        productionCollected: bgr[i].productionCollected,
        foodProduction: bgr[i].foodProduction,
        cropWasteProduction: bgr[i].cropWasteProduction,
        seedsProduction: bgr[i].seedsProduction,
        gasProduction: bgr[i].gasProduction,
        productionCost: bgr[i].productionCost,
        startDay: bgr[i].startDay,
        startHour: bgr[i].startHour
      };
    }
    return blds;
  }

  saveBuildingItems (building)
  {
    if(building.items)
    {
      var its =  building.items.getChildren();
      var bits = [];
      for(var i = 0; i < its.length; i++)
      {
        bits[i] =
        {
          key: its[i].texture.key,
          inBag: its[i].inBag,
          inContainer: its[i].inContainer,
          equipped: its[i].equipped,
          equipable: its[i].equipable,
          usable: its[i].usable,
          stackable: its[i].stackable,
          name: its[i].name,
          type: its[i].type,
          quantity: its[i].quantity,
          weapon: its[i].weapon,
          damage: its[i].damage,
          clipSize: its[i].clipSize,
          ammoCount: its[i].ammoCount,
          healAmount: its[i].healAmount
        };
      }
      return bits;
    }
  }
  // Metodo que utilizamos para cargar una partida.
  static loadGame (saveName)
  {
    var load = JSON.parse(localStorage.getItem(saveName));
    return load;
  }
}
