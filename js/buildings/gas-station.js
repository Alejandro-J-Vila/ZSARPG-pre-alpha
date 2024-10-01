import Building from "./building.js";

// Clase que representa una estacion de servicio donde se puede generar y almacenar combustible.
export default class GasStation extends Building
{
  static BUILDING_NAME = "Gas Station";
  static BUILDING_FILE = "gas-station-atlas";
  static BUILDING_BLUEPRINT = "gas-station-blueprint.png";
  static BUILDING_EXTERIOR = "gas-station-exterior.png";
  static BUILDING_INTERIOR = "gas-station-interior.png";
  static BUILDING_PRODUCTION = "";
  static BUILDING_DAMAGED = "gas-station-damaged.png";
  static BUILDING_PRODUCTION_DAMAGED = "";
  static BUILDING_DESTROYED = "gas-station-destroyed.png";
  static BUILDING_PRODUCTION_DESTROYED = "";
  static BUILDING_COST = 10;
  static BUILDING_DESCRIPTION = "This building allows you to produce gas from crop waste.";
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
        fileName: GasStation.BUILDING_FILE,
        buildingName: GasStation.BUILDING_NAME,
        buildingBlueprint: GasStation.BUILDING_BLUEPRINT,
        buildingExterior: GasStation.BUILDING_EXTERIOR,
        buildingInterior: GasStation.BUILDING_INTERIOR,
        buildingProduction: GasStation.BUILDING_PRODUCTION,
        buildingDamaged: GasStation.BUILDING_DAMAGED,
        buildingProductionDamaged: GasStation.BUILDING_PRODUCTION_DAMAGED,
        buildingDestroyed: GasStation.BUILDING_DESTROYED,
        buildingProductionDestroyed: GasStation.BUILDING_PRODUCTION_DESTROYED,
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
        fileName: GasStation.BUILDING_FILE,
        buildingName: GasStation.BUILDING_NAME,
        buildingBlueprint: GasStation.BUILDING_BLUEPRINT,
        buildingExterior: GasStation.BUILDING_EXTERIOR,
        buildingInterior: GasStation.BUILDING_INTERIOR,
        buildingProduction: GasStation.BUILDING_PRODUCTION,
        buildingDamaged: GasStation.BUILDING_DAMAGED,
        buildingProductionDamaged: GasStation.BUILDING_PRODUCTION_DAMAGED,
        buildingDestroyed: GasStation.BUILDING_DESTROYED,
        buildingProductionDestroyed: GasStation.BUILDING_PRODUCTION_DESTROYED,
        buildingCost: GasStation.BUILDING_COST,
        health: GasStation.BUILDING_MAX_HEALTH,
        maxHealth: GasStation.BUILDING_MAX_HEALTH,
        level: 1
      };
    }

    super(cf);

    // ATRIBUTOS

    this.inProduction; // Flag de produccion.
    this.productionCollected; // Flag de produccion completada.
    this.gasProduction; // Produccion de combustible del edificio.
    this.productionCost; // Costo de produccion en desperdicio de cosecha.
    this.startDay; // Dia de comienzo de la produccion.
    this.startHour; // Hora de comienzo de la produccion.

    // INICIALIZACION

    if(config.level)
    {
      this.inProduction = config.inProduction;
      this.productionCollected = config.productionCollected;
      this.gasProduction = config.gasProduction;
      this.productionCost = config.productionCost;
      this.startDay = config.startDay;
      this.startHour = config.startHour;
    }
    else
    {
      this.inProduction = false;
      this.productionCollected = true;
      this.gasProduction = { min: 10, max: 20 };
      this.productionCost = 10;
      this.startDay = -1;
      this.startHour = -1;
    }

    // CONFIGURACION
  }

  getGasProduction ()
  {
    return Phaser.Math.RND.integerInRange(this.gasProduction.min, this.gasProduction.max);
  }

  levelUp ()
  {
    this.foodProduction.min += 5;
    this.foodProduction.max += 5;
    this.productionCost += 5;
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
}
