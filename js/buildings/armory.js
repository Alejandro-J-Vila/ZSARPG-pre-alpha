import Building from "./building.js";

// Clase que representa una armeria, donde se puden guardar las armas y la municion.
export default class Armory extends Building
{
  static BUILDING_NAME = "Armory";
  static BUILDING_FILE = "armory-atlas";
  static BUILDING_BLUEPRINT = "armory-blueprint.png";
  static BUILDING_EXTERIOR = "armory-exterior.png";
  static BUILDING_INTERIOR = "armory-interior.png";
  static BUILDING_PRODUCTION = "";
  static BUILDING_DAMAGED = "armory-damaged.png";
  static BUILDING_PRODUCTION_DAMAGED = "";
  static BUILDING_DESTROYED = "armory-destroyed.png";
  static BUILDING_PRODUCTION_DESTROYED = "";
  static BUILDING_COST = 10;
  static BUILDING_DESCRIPTION = "This building allows you to store weapons and ammo.";
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
        fileName: Armory.BUILDING_FILE,
        buildingName: Armory.BUILDING_NAME,
        buildingBlueprint: Armory.BUILDING_BLUEPRINT,
        buildingExterior: Armory.BUILDING_EXTERIOR,
        buildingInterior: Armory.BUILDING_INTERIOR,
        buildingProduction: Armory.BUILDING_PRODUCTION,
        buildingDamaged: Armory.BUILDING_DAMAGED,
        buildingProductionDamaged: Armory.BUILDING_PRODUCTION_DAMAGED,
        buildingDestroyed: Armory.BUILDING_DESTROYED,
        buildingProductionDestroyed: Armory.BUILDING_PRODUCTION_DESTROYED,
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
        fileName: Armory.BUILDING_FILE,
        buildingName: Armory.BUILDING_NAME,
        buildingBlueprint: Armory.BUILDING_BLUEPRINT,
        buildingExterior: Armory.BUILDING_EXTERIOR,
        buildingInterior: Armory.BUILDING_INTERIOR,
        buildingProduction: Armory.BUILDING_PRODUCTION,
        buildingDamaged: Armory.BUILDING_DAMAGED,
        buildingProductionDamaged: Armory.BUILDING_PRODUCTION_DAMAGED,
        buildingDestroyed: Armory.BUILDING_DESTROYED,
        buildingProductionDestroyed: Armory.BUILDING_PRODUCTION_DESTROYED,
        buildingCost: Armory.BUILDING_COST,
        health: Armory.BUILDING_MAX_HEALTH,
        maxHealth: Armory.BUILDING_MAX_HEALTH,
        level: 1
      };
    }

    super(cf);

    // ATRIBUTOS

    this.items; // Items guardados en este edificio.

    // INICIALIZACION

    this.items = this.scene.UI.add.group();

    // CONFIGURACION

  }

  // Metodo que utilizamos para eliminar la armeria.
  demolish ()
  {
    // Eliminamos los items que contiene.
    this.items.destroy(true);
    super.demolish();
  }
}
