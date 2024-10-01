import Building from "./building.js";

// Clase que representa el edificio principal de la base donde se pueden elegir las misiones a realizar.
export default class MainBuilding extends Building
{
  static BUILDING_NAME = "Main Building";
  static BUILDING_FILE = "main-building-atlas";
  static BUILDING_BLUEPRINT = "";
  static BUILDING_EXTERIOR = "main-building-exterior.png";
  static BUILDING_INTERIOR = "main-building-interior.png";
  static BUILDING_PRODUCTION = "";
  static BUILDING_DAMAGED = "main-building-damaged.png";
  static BUILDING_PRODUCTION_DAMAGED = "";
  static BUILDING_DESTROYED = "main-building-destroyed.png";
  static BUILDING_PRODUCTION_DESTROYED = "";
  static BUILDING_COST = 10;
  static BUILDING_DESCRIPTION = "";
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
        fileName: MainBuilding.BUILDING_FILE,
        buildingName: MainBuilding.BUILDING_NAME,
        buildingBlueprint: MainBuilding.BUILDING_BLUEPRINT,
        buildingExterior: MainBuilding.BUILDING_EXTERIOR,
        buildingInterior: MainBuilding.BUILDING_INTERIOR,
        buildingProduction: MainBuilding.BUILDING_PRODUCTION,
        buildingDamaged: MainBuilding.BUILDING_DAMAGED,
        buildingProductionDamaged: MainBuilding.BUILDING_PRODUCTION_DAMAGED,
        buildingDestroyed: MainBuilding.BUILDING_DESTROYED,
        buildingProductionDestroyed: MainBuilding.BUILDING_PRODUCTION_DESTROYED,
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
        x: config.x,
        y: config.y,
        fileName: MainBuilding.BUILDING_FILE,
        buildingName: MainBuilding.BUILDING_NAME,
        buildingBlueprint: MainBuilding.BUILDING_BLUEPRINT,
        buildingExterior: MainBuilding.BUILDING_EXTERIOR,
        buildingInterior: MainBuilding.BUILDING_INTERIOR,
        buildingProduction: MainBuilding.BUILDING_PRODUCTION,
        buildingDamaged: MainBuilding.BUILDING_DAMAGED,
        buildingProductionDamaged: MainBuilding.BUILDING_PRODUCTION_DAMAGED,
        buildingDestroyed: MainBuilding.BUILDING_DESTROYED,
        buildingProductionDestroyed: MainBuilding.BUILDING_PRODUCTION_DESTROYED,
        buildingCost: MainBuilding.BUILDING_COST,
        health: MainBuilding.BUILDING_MAX_HEALTH,
        maxHealth: MainBuilding.BUILDING_MAX_HEALTH,
        level: 1
      };
    }

    super(cf);

    // ATRIBUTOS

    // INICIALIZACION

    // CONFIGURACION
  }
}
