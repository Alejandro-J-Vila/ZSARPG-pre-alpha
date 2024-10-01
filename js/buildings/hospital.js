import Building from "./building.js";

// Clase que representa un hospital donde se pueden guardar los items de curacion.
export default class Hospital extends Building
{
  static BUILDING_NAME = "Hospital";
  static BUILDING_FILE = "hospital-atlas";
  static BUILDING_BLUEPRINT = "hospital-blueprint.png";
  static BUILDING_EXTERIOR = "hospital-exterior.png";
  static BUILDING_INTERIOR = "hospital-interior.png";
  static BUILDING_PRODUCTION = "";
  static BUILDING_DAMAGED = "hospital-damaged.png";
  static BUILDING_PRODUCTION_DAMAGED = "";
  static BUILDING_DESTROYED = "hospital-destroyed.png";
  static BUILDING_PRODUCTION_DESTROYED = "";
  static BUILDING_COST = 10;
  static BUILDING_DESCRIPTION = "This building allows you to store medical supplies.";
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
        fileName: Hospital.BUILDING_FILE,
        buildingName: Hospital.BUILDING_NAME,
        buildingBlueprint: Hospital.BUILDING_BLUEPRINT,
        buildingExterior: Hospital.BUILDING_EXTERIOR,
        buildingInterior: Hospital.BUILDING_INTERIOR,
        buildingProduction: Hospital.BUILDING_PRODUCTION,
        buildingDamaged: Hospital.BUILDING_DAMAGED,
        buildingProductionDamaged: Hospital.BUILDING_PRODUCTION_DAMAGED,
        buildingDestroyed: Hospital.BUILDING_DESTROYED,
        buildingProductionDestroyed: Hospital.BUILDING_PRODUCTION_DESTROYED,
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
        fileName: Hospital.BUILDING_FILE,
        buildingName: Hospital.BUILDING_NAME,
        buildingBlueprint: Hospital.BUILDING_BLUEPRINT,
        buildingExterior: Hospital.BUILDING_EXTERIOR,
        buildingInterior: Hospital.BUILDING_INTERIOR,
        buildingProduction: Hospital.BUILDING_PRODUCTION,
        buildingDamaged: Hospital.BUILDING_DAMAGED,
        buildingProductionDamaged: Hospital.BUILDING_PRODUCTION_DAMAGED,
        buildingDestroyed: Hospital.BUILDING_DESTROYED,
        buildingProductionDestroyed: Hospital.BUILDING_PRODUCTION_DESTROYED,
        buildingCost: Hospital.BUILDING_COST,
        health: Hospital.BUILDING_MAX_HEALTH,
        maxHealth: Hospital.BUILDING_MAX_HEALTH,
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

  // Metodo que utilizamos para eliminar el hospital.
  demolish ()
  {
    // Eliminamos los items que contiene.
    this.items.destroy(true);
    super.demolish();
  }
}
