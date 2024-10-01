import Armory from "../buildings/armory.js";
import Barricade from "../buildings/barricade.js";
import Farm from "../buildings/farm.js";
import GasStation from "../buildings/gas-station.js";
import Hospital from "../buildings/hospital.js";
import Storage from "../buildings/storage.js";
import Turret from "../buildings/turret.js";
import MainBuilding from "../buildings/main-building.js";

// Clase que se encarga de la ubicacion y construccion de edificios en el juego.
export default class BuildingManager
{
  constructor (config)
  {
    // ATRIBUTOS

    this.scene; // La escena donde se ubicaran los edificios.
    this.buildings; // Grupo de edificios construidos.
    this.currentBuilding; // Edificio actualmente seleccionado para construir.
    this.buildMode; // Flag de modo construccion.
    this.moveMode; // Flag de modo movimiento.
    this.movedOriginalX; // Posicion original de edificio movido en x.
    this.movedOriginalY; // Posicion original de edificio movido en y.
    this.canPlace; // Flag para saber si se puede ubicar el edificio en el lugar seleccionado.

    // INICIALIZACION

    this.scene = config.scene;
    this.buildings = config.scene.add.group();
    this.buildMode = false;
    this.moveMode = false;
    this.canPlace = false;

    // CONFIGURACION

    // Oyente para construir el edificio seleccionado cuando se hace click.
    config.scene.input.on('pointerdown', (pointer) =>
    {
      this.build();
    }, this);

  }

  // Metodo que utilizamos para cancelar la seleccion de edificio al construir o mover.
  cancelCurrentBuilding ()
  {
    // Si estamos en modo construccion.
    if(this.buildMode)
    {
      // Si estamos en modo movimiento.
      if(this.moveMode)
      {
        // Seteamos la posicion original del edificio que estamos moviendo.
        this.currentBuilding.x = this.movedOriginalX;
        this.currentBuilding.y = this.movedOriginalY;
        // Colocamos el edificio en su posicion original.
        this.currentBuilding.place(this.buildings, this.scene.player.sprite, this.moveMode);
      }
      else
      {
        // Si no estamos moviendo un edificio, cancelamos la seleccion de edificio actual.
        this.currentBuilding.destroy();
      }
      // Desactivamos los modos de construccion y movimiento.
      this.buildMode = false;
      this.moveMode = false;
    }
  }

  // Metodo que utilizamos para mover un edificio previamente construido.
  moveBuilding (building)
  {
    // Activamos el modo movimiento.
    this.moveMode = true;
    // Guardamos la posicion actual del edificio antes de moverlo.
    this.movedOriginalX = building.x;
    this.movedOriginalY = building.y;
    // Seteamos el edificio a mover como edificio actual.
    this.currentBuilding = building;
    // Movemos el edificio.
    this.currentBuilding.move();
    // Comenzamos a construir el edificio.
    this.buildingPlacement("");
  }

  // Metodo que utilizamos para comenzar a construir un edificio.
  buildingPlacement (buildingName)
  {
    // Activamos el modo construccion.
    this.buildMode = true;
    // Si no estamos moviendo un edificio.
    if(!this.moveMode)
    {
      // Creamos el edificio correspondiente al plano seleccionado.
      this.currentBuilding = this.createBuilding(buildingName);
    }
    // Seteamos oyentes de overlap con el mapa para definir el lugar de construccion.
    this.scene.physics.add.overlap(this.currentBuilding, this.scene.levelFloor);
    this.scene.physics.add.overlap(this.currentBuilding, this.buildings, this.checkBuildingPlacement, null, this);
    // Ajustamos la posicion del edificio para que acompañe al mouse.
    this.adjustBuildingPosition(this.scene.input.activePointer);
  }

  // Metodo que utilizamos para habilitar / deshabilitar la construccion del edificio en el lugar seleccionado.
  checkBuildingPlacement (status)
  {
    if(status === "ok")
    {
      this.currentBuilding.setTint(0x09FF00);
      this.canPlace = true;
    }
    else
    {
      this.currentBuilding.setTint(0xFF0000);
      this.canPlace = false;
    }
  }

  // Metodo que utilizamos para que el edificio siga el mouse cuando lo movemos.
  adjustBuildingPosition (pointer)
  {
    // Si estamos en modo construccion.
    if(this.buildMode)
    {
      // Seteamos los limites de construccion segun el edificio actual.
      var mapLimitX = 52 - this.currentBuilding.positionOffsetX;
      var mapLimitY = 52 - this.currentBuilding.positionOffsetY;
      // Convertimos la posicion del mouse a posicion en el mundo dentro de la camara.
      var pointerPosition = this.scene.input.activePointer.positionToCamera(this.scene.cameras.main);
      // Convertimos la posicion del mouse para obtener la posicion del tile debajo del mismo.
      var tilePosition = this.scene.levelFloor.worldToTileXY(pointerPosition.x, pointerPosition.y);
      // Ajustamos la posicion para limitar el area de construccion.
      if(tilePosition.x < 2)
      {
        tilePosition.x = 2;
      }
      else if(tilePosition.x > mapLimitX)
      {
        tilePosition.x = mapLimitX;
      }
      if(tilePosition.y < 2)
      {
        tilePosition.y = 2;
      }
      else if(tilePosition.y > mapLimitY)
      {
        tilePosition.y = mapLimitY;
      }
      // Realizamos la ultima conversion para obtener la posicion final.
      var tileUnderPointerPosition = this.scene.levelFloor.tileToWorldXY(tilePosition.x, tilePosition.y);
      // Seteamos la posicion del edificio.
      this.currentBuilding.setPosition(tileUnderPointerPosition.x, tileUnderPointerPosition.y);
    }
  }

  // Metodo que utilizamos para construir el edificio seleccionado una vez elegido un lugar valido.
  build ()
  {
    // Si estamos en modo construccion.
    if(this.buildMode)
    {
      // Si podemos construir el edificio en el lugar seleccionado.
      if(this.canPlace)
      {
        this.scene.UI.inventoryManager.useResource("material", this.currentBuilding.buildingCost);
        // Colocamos el edificio en el lugar seleccionado.
        this.currentBuilding.place(this.buildings, this.scene.player.sprite, this.moveMode);
        // Desactivamos los modos de construccion y movimiento.
        this.buildMode = false;
        this.moveMode = false;
        // Le avisamos a la interfaz de construccion que la misma se completo.
        this.scene.UI.buildUI.setBuildingMode(false, false);
      }
      else
      {
        // Si no podemos construir en el lugar seleccionado, no hacemos nada.
        this.scene.notificationManager.showMessage("cant_build");
      }
    }
  }

  // Metodo que utilizamos para crear el edificio correspondiente segun el nombre dado.
  createBuilding (buildingName)
  {
    var building;
    if(buildingName === "Armory")
    {
      building = new Armory({ scene: this.scene });
    }
    else if(buildingName === "Barricade")
    {
      building = new Barricade({ scene: this.scene });
    }
    else if(buildingName === "Farm")
    {
      building = new Farm({ scene: this.scene });
    }
    else if(buildingName === "Gas Station")
    {
      building = new GasStation({ scene: this.scene });
    }
    else if(buildingName === "Hospital")
    {
      building = new Hospital({ scene: this.scene });
    }
    else if(buildingName === "Storage")
    {
      building = new Storage({ scene: this.scene });
    }
    else if(buildingName === "Turret")
    {
      building = new Turret({ scene: this.scene });
    }
    return building;
  }

  // Metodo que utilizamos para crear una armeria en la base.
  createArmory (save)
  {
    save.scene = this.scene;
    var b = new Armory(save);
    b.place(this.buildings, this.scene.player.sprite, false);
    b.build();
  }

  // Metodo que utilizamos para crear una barricada en la base.
  createBarricade (save)
  {
    save.scene = this.scene;
    var b = new Barricade(save);
    b.place(this.buildings, this.scene.player.sprite, false);
    b.build();
  }

  // Metodo que utilizamos para crear una granja en la base
  createFarm (save)
  {
    save.scene = this.scene;
    var b = new Farm(save);
    b.place(this.buildings, this.scene.player.sprite, false);
    b.build();
  }

  // Metodo que utilizamos para crear una estacion de servicio en la base.
  createGasStation (save)
  {
    save.scene = this.scene;
    var b = new GasStation(save);
    b.place(this.buildings, this.scene.player.sprite, false);
    b.build();
  }

  // Metodo que utilizamos para crear un hospital en la base.
  createHospital (save)
  {
    save.scene = this.scene;
    var b = new Hospital(save);
    b.place(this.buildings, this.scene.player.sprite, false);
    b.build();
  }

  // Metodo que utilizamos para crear un edificio principal en la base.
  createMainBuilding (save)
  {
    save.scene = this.scene;
    var b = new MainBuilding(save);
    b.place(this.buildings, this.scene.player.sprite, false);
    b.build();
  }

  // Metodo que utilizamos para crear un deposito en la base.
  createStorage (save)
  {
    save.scene = this.scene;
    var b = new Storage(save);
    b.place(this.buildings, this.scene.player.sprite, false);
    b.build();
  }

  // Metodo que utilizamos para crear una torreta en la base.
  createTurret (save)
  {
    save.scene = this.scene;
    var b = new Turret(save);
    b.place(this.buildings, this.scene.player.sprite, false);
    b.build();
  }
}
