import Armory from "../../buildings/armory.js";
import Barricade from "../../buildings/barricade.js";
import Farm from "../../buildings/farm.js";
import GasStation from "../../buildings/gas-station.js";
import Hospital from "../../buildings/hospital.js";
import Storage from "../../buildings/storage.js";
import Turret from "../../buildings/turret.js";
import Button from "../button.js";
import Blueprint from "./blueprint.js";

// Clase que se encarga de mostrar la interfaz de seleccion y construccion de edificios.
export default class BuildUI
{
  constructor (config)
  {
    // ATRIBUTOS

    this.scene; // La escena donde se ubicara la interfaz para construir edificios.
    this.x; // La posicion del panel en x.
    this.y; // La posicion del panel en y.
    this.visible; // Si es visible o no al momento de la creacion.
    this.background; // Imagen de fondo del panel.
    this.bgOrigin; // Origen del panel para luego alinear el resto de las cosas que contiene.
    this.title; // Titulo del panel.
    this.blueprints; // Lista de planos de edificios para construir.
    this.buildingPreview;
    this.buildingName;
    this.buildingDescription;
    this.buildingCost;
    this.closeButton; // Boton para cerrar el panel cuando este se encuentra abierto.
    this.buildButton; // Boton de la interfaz para abrir / cerrar el panel.
    this.cancelBuildButton;
    this.buildingMode;
    this.hidden;

    // INICIALIZACION

    this.scene = config.scene;
    this.x = config.x / 2;
    this.y = config.y / 2;

    this.visible = config.visible;

    this.background = config.scene.add.image(this.x, this.y - 32, config.background);
    //this.background.setDisplaySize(780, 523);

    this.bgOrigin = this.background.getTopLeft();

    this.title = config.scene.add.text(this.x, this.y, "Buildings", { font: '30px Arial', fill: '#FFFFFF' });
    Phaser.Display.Align.In.TopCenter(this.title, this.background, 0, -10);

    this.blueprints = config.scene.add.group();
    this.addBlueprints();

    this.buildingName = config.scene.add.text(this.x - 370, this.y + 100, "Building Name", { font: '16px Arial', fill: '#FFFFFF' });
    this.buildingName.setOrigin(0);
    this.buildingDescription = config.scene.add.text(this.x - 370, this.y + 130, "Building Description", { font: '16px Arial', fill: '#FFFFFF' });
    this.buildingDescription.setOrigin(0);
    this.buildingCost = config.scene.add.text(this.x - 50, this.y + 195, "Building Cost", { font: '16px Arial', fill: '#FFFFFF' });

    this.closeButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x + 753,
        y: this.bgOrigin.y + 25,
        backgroundKey: "button-atlas",
        backgroundFrame: "close.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -20,
        labelText: "Close"
      });

    this.buildButton = new Button(
      {
        scene: config.scene,
        x: config.x - 110,
        y: config.y - 30,
        backgroundKey: "button-atlas",
        backgroundFrame: "build.png",
        visible: true,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Build (B)"
      });

    this.cancelBuildButton = new Button(
      {
        scene: config.scene,
        x: config.x - 110,
        y: config.y - 30,
        backgroundKey: "button-atlas",
        backgroundFrame: "cancel.png",
        visible: false,
        labelOffsetX: -25,
        labelOffsetY: -31,
        labelText: "Cancel current building"
      });

    this.buildingMode = false;
    this.hidden = false;

    // CONFIGURACION

    this.background.setVisible(config.visible);
    this.title.setVisible(config.visible);
    this.buildingName.setVisible(config.visible);
    this.buildingDescription.setVisible(config.visible);
    this.buildingCost.setVisible(config.visible);

    Phaser.Actions.GridAlign(this.blueprints.getChildren(),
      {
        width: 10,
        height: 4,
        cellWidth: 65,
        cellHeight: 65,
        x: this.bgOrigin.x + 60,
        y: this.bgOrigin.y + 110
      });

    this.blueprints.getChildren().forEach((blueprint) =>
    {
      blueprint.adjustLabel();

      blueprint.on('pointerover', (pointer) =>
      {
        this.buildingPreview = this.scene.add.image(this.x, this.y - 10, blueprint.building.BUILDING_FILE, blueprint.building.BUILDING_EXTERIOR);
        this.buildingName.setText(blueprint.building.BUILDING_NAME);
        this.buildingDescription.setText(blueprint.building.BUILDING_DESCRIPTION);
        this.buildingCost.setText("Materials Cost: " + blueprint.building.BUILDING_COST);
        this.buildingPreview.setVisible(true);
        this.buildingName.setVisible(true);
        this.buildingDescription.setVisible(true);
        this.buildingCost.setVisible(true);
      });

      blueprint.on('pointerout', (pointer) =>
      {
        this.buildingPreview.destroy();
        this.buildingName.setVisible(false);
        this.buildingDescription.setVisible(false);
        this.buildingCost.setVisible(false);
      });
    });

    this.closeButton.on('pointerdown', (pointer) =>
    {
      this.showBuildUI();
    });

    this.buildButton.on('pointerdown', (pointer) =>
    {
      this.showBuildUI();
    });

    this.cancelBuildButton.on('pointerdown', (pointer) =>
    {
      this.scene.gameScene.buildingManager.cancelCurrentBuilding();
      this.setBuildingMode(false);
    });
  }

  // Metodo que utilizamos para mostrar / ocultar el panel.
  showBuildUI ()
  {
    if((this.buildingMode) | (this.hidden))
    {
      return;
    }
    if(this.visible)
    {
      this.setVisible(false);
      this.buildButton.clearTint();
      this.scene.buildInteraction = false;
    }
    else
    {
      this.scene.closeOverlapPanels("build-ui");
      this.setVisible(true);
      this.buildButton.setTint(0xff0000);
      this.scene.buildInteraction = true;
    }
  }

  // Metodo que utilizamos para mostrar / ocultar varios elementos de la interfaz cuando se esta construyendo.
  setBuildingMode (value, move)
  {
    if(value)
    {
      if(!move)
      {
        // Ocultamos la interfaz de construccion.
        this.showBuildUI();
      }
      // Mostramos el boton de cancelar edificio.
      this.showCancelButton();
      // Ocultamos el boton de interfaz de construccion.
      this.showBuildButton();
      this.scene.startBuilding(true);
      // Activamos el modo construccion.
      this.buildingMode = true;
      // Activamos el flag de interaccion para construir.
      this.scene.buildInteraction = true;
    }
    else
    {
      // Ocultamos el boton de cancelar edificio.
      this.showCancelButton();
      // Mostramos el boton de interfaz de construccion.
      this.showBuildButton();
      this.scene.startBuilding(false);
      // Desactivamos el modo construccion.
      this.buildingMode = false;
      // Desactivamos el lag de interaccion para construir.
      this.scene.buildInteraction = false;
    }
  }

  // Metodo que utilizamos para cambiar la visibilidad del panel.
  setVisible (value)
  {
    this.visible = value;
    this.background.setVisible(value);
    this.title.setVisible(value);
    this.closeButton.setVisible(value);
    this.blueprints.toggleVisible();
    if(!value)
    {
      if(this.buildingPreview != undefined)
      {
        this.buildingPreview.destroy();
      }
      this.buildingName.setVisible(value);
      this.buildingDescription.setVisible(value);
      this.buildingCost.setVisible(value);
    }
  }

  // Metodo que utilizamos para mostrar / ocultar la interfaz de construccion.
  hideUI (value)
  {
    this.hidden = value;
    this.buildButton.setVisible(!value);
  }

  // Metodo que utilizamos para mostrar / ocultar el boton de interfaz.
  showBuildButton (value)
  {
    if(this.buildButton.visible)
    {
      this.buildButton.setVisible(false);
    }
    else
    {
      this.buildButton.setVisible(true);
    }
  }

  // Metodo que utilizamos para mostrar / ocultar el boton de cancelar edificio.
  showCancelButton ()
  {
    if(this.cancelBuildButton.visible)
    {
      this.cancelBuildButton.setVisible(false);
    }
    else
    {
      this.cancelBuildButton.setVisible(true);
    }
  }

  // Metodo que utilizamos para agregar los planos al panel.
  addBlueprints ()
  {
    var blueprint1 = new Blueprint(
      {
        scene: this.scene,
        x: 0,
        y: 0,
        backgroundKey: "button-atlas",
        backgroundFrame: "armory.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Armory",
        building: Armory
      });
    this.blueprints.add(blueprint1);

    var blueprint2 = new Blueprint(
      {
        scene: this.scene,
        x: 0,
        y: 0,
        backgroundKey: "button-atlas",
        backgroundFrame: "barricade.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Barricade",
        building: Barricade
      });
    this.blueprints.add(blueprint2);

    var blueprint3 = new Blueprint(
      {
        scene: this.scene,
        x: 0,
        y: 0,
        backgroundKey: "button-atlas",
        backgroundFrame: "farm.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Farm",
        building: Farm
      });
    this.blueprints.add(blueprint3);

    var blueprint4 = new Blueprint(
      {
        scene: this.scene,
        x: 0,
        y: 0,
        backgroundKey: "button-atlas",
        backgroundFrame: "gas-station.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Gas Station",
        building: GasStation
      });
    this.blueprints.add(blueprint4);

    var blueprint5 = new Blueprint(
      {
        scene: this.scene,
        x: 0,
        y: 0,
        backgroundKey: "button-atlas",
        backgroundFrame: "hospital.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Hospital",
        building: Hospital
      });
    this.blueprints.add(blueprint5);

    var blueprint6 = new Blueprint(
      {
        scene: this.scene,
        x: 0,
        y: 0,
        backgroundKey: "button-atlas",
        backgroundFrame: "storage.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Storage",
        building: Storage
      });
    this.blueprints.add(blueprint6);

    var blueprint7 = new Blueprint(
      {
        scene: this.scene,
        x: 0,
        y: 0,
        backgroundKey: "button-atlas",
        backgroundFrame: "turret.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Turret",
        building: Turret
      });
    this.blueprints.add(blueprint7);
  }

}
