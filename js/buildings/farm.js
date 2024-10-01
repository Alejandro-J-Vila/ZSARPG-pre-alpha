import Building from "./building.js";

// Clase que representa una granja donde se puede generar comida.
export default class Farm extends Building
{
  static BUILDING_NAME = "Farm";
  static BUILDING_FILE = "farm-atlas";
  static BUILDING_BLUEPRINT = "farm-blueprint.png";
  static BUILDING_EXTERIOR = "farm-no-production.png";
  static BUILDING_INTERIOR = "";
  static BUILDING_PRODUCTION = "farm-production.png";
  static BUILDING_DAMAGED = "farm-no-production-damaged.png";
  static BUILDING_PRODUCTION_DAMAGED = "farm-production-damaged.png";
  static BUILDING_DESTROYED = "farm-no-production-destroyed.png";
  static BUILDING_PRODUCTION_DESTROYED = "farm-production-destroyed.png";
  static BUILDING_COST = 10;
  static BUILDING_DESCRIPTION = "This building allows you to produce food. It also produces seeds and crop waste.";
  static BUILDING_MAX_HEALTH = 1000;
  constructor (config)
  {
    var cf;
    if(config.level)
    {
      cf =
      {
        scene: config.scene,
        x: config.x,
        y: config.y,
        fileName: Farm.BUILDING_FILE,
        buildingName: Farm.BUILDING_NAME,
        buildingBlueprint: Farm.BUILDING_BLUEPRINT,
        buildingExterior: Farm.BUILDING_EXTERIOR,
        buildingInterior: Farm.BUILDING_INTERIOR,
        buildingProduction: Farm.BUILDING_PRODUCTION,
        buildingDamaged: Farm.BUILDING_DAMAGED,
        buildingProductionDamaged: Farm.BUILDING_PRODUCTION_DAMAGED,
        buildingDestroyed: Farm.BUILDING_DESTROYED,
        buildingProductionDestroyed: Farm.BUILDING_PRODUCTION_DESTROYED,
        buildingCost: config.buildingCost,
        health: config.health,
        maxHealth: config.maxHealth,
        level: config.level
      };
    }
    else
    {
      cf =
      {
        scene: config.scene,
        x: 0,
        y: 0,
        fileName: Farm.BUILDING_FILE,
        buildingName: Farm.BUILDING_NAME,
        buildingBlueprint: Farm.BUILDING_BLUEPRINT,
        buildingExterior: Farm.BUILDING_EXTERIOR,
        buildingInterior: Farm.BUILDING_INTERIOR,
        buildingProduction: Farm.BUILDING_PRODUCTION,
        buildingDamaged: Farm.BUILDING_DAMAGED,
        buildingProductionDamaged: Farm.BUILDING_PRODUCTION_DAMAGED,
        buildingDestroyed: Farm.BUILDING_DESTROYED,
        buildingProductionDestroyed: Farm.BUILDING_PRODUCTION_DESTROYED,
        buildingCost: Farm.BUILDING_COST,
        health: Farm.BUILDING_MAX_HEALTH,
        maxHealth: Farm.BUILDING_MAX_HEALTH,
        level: 1
      };
    }

    super(cf);

    // ATRIBUTOS

    this.inProduction; // Flag de produccion.
    this.productionCollected; // Flag de produccion completada.
    this.foodProduction; // Produccion de comida del edificio.
    this.cropWasteProduction; // Produccion de desperdicio de cosecha del edificio.
    this.seedsProduction; // Produccion de semillas del edificio.
    this.productionCost; // Costo de produccion en semillas.
    this.startDay; // Dia de comienzo de la produccion.
    this.startHour; // Hora de comienzo de la produccion.

    // INICIALIZACION

    if(config.level)
    {
      this.inProduction = config.inProduction;
      this.productionCollected = config.productionCollected;
      this.foodProduction = config.foodProduction
      this.cropWasteProduction = config.cropWasteProduction;
      this.seedsProduction = config.seedsProduction;
      this.productionCost = config.productionCost;
      this.startDay = config.startDay;
      this.startHour = config.startHour;
    }
    else
    {
      this.inProduction = false;
      this.productionCollected = true;
      this.foodProduction = { min: 5, max: 10 };
      this.cropWasteProduction = { min: 3, max: 5 };
      this.seedsProduction = { min: 1, max: 3};
      this.productionCost = 5;
      this.startDay = -1;
      this.startHour = -1;
    }

    // CONFIGURACION
  }

  getFoodProduction ()
  {
    return Phaser.Math.RND.integerInRange(this.foodProduction.min, this.foodProduction.max);
  }

  getCropWasteProduction ()
  {
    return Phaser.Math.RND.integerInRange(this.cropWasteProduction.min, this.cropWasteProduction.max);
  }

  getSeedsProduction ()
  {
    return Phaser.Math.RND.integerInRange(this.seedsProduction.min, this.seedsProduction.max);
  }

  levelUp ()
  {
    this.foodProduction.min += 5;
    this.foodProduction.max += 5;
    this.cropWasteProduction.min += 3;
    this.cropWasteProduction.max += 3;
    this.seedsProduction.min += 2;
    this.seedsProduction.max += 2;
    this.productionCost += 2;
  }

  startProduction (day, hour)
  {
    this.inProduction = true;
    this.productionCollected = false;
    this.startDay = day;
    this.startHour = hour;
  }

  remainingProductionTime (day, hour)
  {
    var elapsed = 0;
    // Si paso mas de 1 dia...
    if(day - this.startDay > 1)
    {
      elapsed = 24;
    }
    else
    {
      // Si la hora es mayor a la de comienzo...
      if(hour > this.startHour)
      {
        // Y el dia es mayor que el de comienzo, pasaron mas de 24 horas.
        if(day > this.startDay)
        {
          elapsed = 24;
        }
        else
        {
          // Si el dia es el mismo que el de comienzo, todavia no pasaron 24 horas.
          elapsed = hour - this.startHour;
        }
      }
      // Si la hora es menor que la de comienzo, estamos cerca de pasar las 24 horas.
      else if(hour < this.startHour)
      {
        var h = hour + 24;
        elapsed = h - this.startHour;
      }
      // Si la hora es la misma que la de comienzo...
      else if(hour === this.startHour)
      {
        // Si el dia es mayor que el de comienzo, justo estamos en las 24 horas.
        if(day > this.startDay)
        {
          elapsed = 24;
        }
        // Sino, no hacemos nada porque acabamos de empezar.
      }
    }
    return 24 - elapsed;
  }

  repaired ()
  {
    if(this.inProduction)
    {
      this.setFrame(this.buildingProduction, false, false);
    }
    else
    {
      this.setFrame(this.buildingExterior, false, false);
    }
  }

  damaged ()
  {
    if(this.inProduction)
    {
      this.setFrame(this.buildingProductionDamaged, false, false);
    }
    else
    {
      this.setFrame(this.buildingDamaged, false, false);
    }
  }

  destroyed ()
  {
    if(this.inProduction)
    {
      this.setFrame(this.buildingProductionDestroyed, false, false);
    }
    else
    {
      this.setFrame(this.buildingDestroyed, false, false);
    }
  }
}
