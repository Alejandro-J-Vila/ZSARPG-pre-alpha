import Armory from "../../buildings/armory.js";
import Barricade from "../../buildings/barricade.js";
import Farm from "../../buildings/farm.js";
import GasStation from "../../buildings/gas-station.js";
import Hospital from "../../buildings/hospital.js";
import Storage from "../../buildings/storage.js";
import Turret from "../../buildings/turret.js";
import Button from "../button.js";

// Clase que representa el plano de un edificio dentro del juego.
export default class Blueprint extends Button
{
  constructor (config)
  {
    // Llamamos al constructor de la clase Button para que inicialice el mismo.
    super(config);

    // ATRIBUTOS

    this.building;

    // INICIALIZACION

    this.building = config.building;

    // CONFIGURACION

    this.on('pointerdown', (pointer) =>
    {
      if(config.scene.inventoryManager.checkResource("material", this.building.BUILDING_COST))
      {
        // Ocultamos la interfaz de construccion.
        config.scene.buildUI.setBuildingMode(true, false);
        // Habilitamos el modo construccion con el plano seleccionado.
        config.scene.gameScene.buildingManager.buildingPlacement(this.building.BUILDING_NAME);
      }
      else
      {
        config.scene.notificationManager.showMessage("no_materials", this.building.BUILDING_COST);
      }
    }, this);

  }



}
