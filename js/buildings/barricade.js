import Building from "./building.js";

// Clase que representa una barricada utilizada para frenar el avance de los enemigos.
export default class Barricade extends Building
{
  static BUILDING_NAME = "Barricade";
  static BUILDING_FILE = "barricade-atlas";
  static BUILDING_BLUEPRINT = "barricade-blueprint.png";
  static BUILDING_EXTERIOR = "barricade-finished.png";
  static BUILDING_INTERIOR = "";
  static BUILDING_PRODUCTION = "";
  static BUILDING_DAMAGED = "barricade-damaged.png";
  static BUILDING_PRODUCTION_DAMAGED = "";
  static BUILDING_DESTROYED = "barricade-destroyed.png";
  static BUILDING_PRODUCTION_DESTROYED = "";
  static BUILDING_COST = 10;
  static BUILDING_DESCRIPTION = "This building blocks zombies path and damages attackers.";
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
        fileName: Barricade.BUILDING_FILE,
        buildingName: Barricade.BUILDING_NAME,
        buildingBlueprint: Barricade.BUILDING_BLUEPRINT,
        buildingExterior: Barricade.BUILDING_EXTERIOR,
        buildingInterior: Barricade.BUILDING_INTERIOR,
        buildingProduction: Barricade.BUILDING_PRODUCTION,
        buildingDamaged: Barricade.BUILDING_DAMAGED,
        buildingProductionDamaged: Barricade.BUILDING_PRODUCTION_DAMAGED,
        buildingDestroyed: Barricade.BUILDING_DESTROYED,
        buildingProductionDestroyed: Barricade.BUILDING_PRODUCTION_DESTROYED,
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
        fileName: Barricade.BUILDING_FILE,
        buildingName: Barricade.BUILDING_NAME,
        buildingBlueprint: Barricade.BUILDING_BLUEPRINT,
        buildingExterior: Barricade.BUILDING_EXTERIOR,
        buildingInterior: Barricade.BUILDING_INTERIOR,
        buildingProduction: Barricade.BUILDING_PRODUCTION,
        buildingDamaged: Barricade.BUILDING_DAMAGED,
        buildingProductionDamaged: Barricade.BUILDING_PRODUCTION_DAMAGED,
        buildingDestroyed: Barricade.BUILDING_DESTROYED,
        buildingProductionDestroyed: Barricade.BUILDING_PRODUCTION_DESTROYED,
        buildingCost: Barricade.BUILDING_COST,
        health: Barricade.BUILDING_MAX_HEALTH,
        maxHealth: Barricade.BUILDING_MAX_HEALTH,
        level: 1
      };
    }

    super(cf);

    // ATRIBUTOS

    this.damage; // Daño que inflinge la barricada cuando es atacada.

    // INICIALIZACION

    if(config.level)
    {
      this.damage = config.damage;
    }
    else
    {
      this.damage = 10;
    }

    // CONFIGURACION
  }

  levelUp ()
  {
    this.damage += 5;
    super.levelUp();
  }
}
