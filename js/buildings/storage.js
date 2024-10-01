import Building from "./building.js";

// Clase que representa un deposito donde se pueden guardar la comida y los materiales.
export default class Storage extends Building
{
  static BUILDING_NAME = "Storage";
  static BUILDING_FILE = "storage-atlas";
  static BUILDING_BLUEPRINT = "storage-blueprint.png";
  static BUILDING_EXTERIOR = "storage-exterior.png";
  static BUILDING_INTERIOR = "storage-interior.png";
  static BUILDING_PRODUCTION = "";
  static BUILDING_DAMAGED = "storage-damaged.png";
  static BUILDING_PRODUCTION_DAMAGED = "";
  static BUILDING_DESTROYED = "storage-destroyed.png";
  static BUILDING_PRODUCTION_DESTROYED = "";
  static BUILDING_COST = 10;
  static BUILDING_DESCRIPTION = "This building allows you to store resources.";
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
        fileName: Storage.BUILDING_FILE,
        buildingName: Storage.BUILDING_NAME,
        buildingBlueprint: Storage.BUILDING_BLUEPRINT,
        buildingExterior: Storage.BUILDING_EXTERIOR,
        buildingInterior: Storage.BUILDING_INTERIOR,
        buildingProduction: Storage.BUILDING_PRODUCTION,
        buildingDamaged: Storage.BUILDING_DAMAGED,
        buildingProductionDamaged: Storage.BUILDING_PRODUCTION_DAMAGED,
        buildingDestroyed: Storage.BUILDING_DESTROYED,
        buildingProductionDestroyed: Storage.BUILDING_PRODUCTION_DESTROYED,
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
        fileName: Storage.BUILDING_FILE,
        buildingName: Storage.BUILDING_NAME,
        buildingBlueprint: Storage.BUILDING_BLUEPRINT,
        buildingExterior: Storage.BUILDING_EXTERIOR,
        buildingInterior: Storage.BUILDING_INTERIOR,
        buildingProduction: Storage.BUILDING_PRODUCTION,
        buildingDamaged: Storage.BUILDING_DAMAGED,
        buildingProductionDamaged: Storage.BUILDING_PRODUCTION_DAMAGED,
        buildingDestroyed: Storage.BUILDING_DESTROYED,
        buildingProductionDestroyed: Storage.BUILDING_PRODUCTION_DESTROYED,
        buildingCost: Storage.BUILDING_COST,
        health: Storage.BUILDING_MAX_HEALTH,
        maxHealth: Storage.BUILDING_MAX_HEALTH,
        level: 1
      };
    }

    super(cf);

    // ATRIBUTOS

    // INICIALIZACION

    // CONFIGURACION
  }
}
