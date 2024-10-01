import Button from "../button.js";
import Bar from "../bar.js";
import ConfirmDialog from "../confirm-dialog.js";

// Clase que se encarga de mostrar la interfaz de acciones de los edificios construidos.
export default class BuildingUI
{
  constructor (config)
  {
    // ATRIBUTOS

    this.scene; // La escena donde se ubicara la interfaz de acciones de edificio.
    this.x; // La posicion de la interfaz en x.
    this.y; // La posicion de la interfaz en y.
    this.visible; // Si es visible o no al momento de la creacion.
    this.background; // Imagen de fondo de la interfaz.
    this.bgOrigin; // Origen de la interfaz para luego alinear el resto de las cosas que contiene.
    this.title; // Titulo que indica el nombre del edificio.

    this.health; // Barra de salud del edificio.

    this.buildingInfo; // Arreglo que contiene informacion del Edificio.
    this.level; // Nivel del edificio.
    this.food; // Cantidad de comida que tiene el edificio.
    this.materials; // Cantidad de materiales que tiene el edificio.
    this.gas; // Cantidad de combustible que tiene el edificio.
    this.cropWaste; // Cantidad de desperdicio de cosecha que tiene el edificio.
    this.seeds; // Cantidad de semillas que tiene el edificio.
    this.repairCost; // Cantidad de materiales requerida para reparar el edificio.
    this.levelUpCost; // Cantidad de materiales requerida para subir de nivel el edificio.

    this.generalActions; // Conjunto de botones que permiten realizar distintas acciones sobre el edificio.
    this.moveButton; // Boton de mover el edificio.
    this.repairButton; // Boton de reparar el edificio.
    this.demolishButton; // Boton de demoler el edificio.
    this.levelUpButton; // Boton para subir de nivel el edificio.
    this.depositButton; // Boton para dejar en el deposito los items que el edificio admite.
    this.storageButton; // Boton para abrir el deposito del edificio.

    this.specificActions; // Conjunto de botones que permiten realizar acciones especificas de ciertos edificios.
    this.questButton; // Boton de misiones.
    this.endDayButton;
    this.foodButton; // Boton de generar comida.
    this.gasButton; // Boton de generar combustible.

    this.currentBuilding; // Edificio actualmente seleccionado.

    this.confirmDialog; // Panel de confirmacion para demoler un edificio.
    this.closeButton; // Boton para cerrar la interfaz cuando esta se encuentre abierta.


    // INICIALIZACION

    this.scene = config.scene;
    this.x = config.x / 4;
    this.y = config.y / 2;
    this.visible = config.visible;

    this.background = config.scene.add.image(this.x, this.y - 32, config.background);
    //this.background.setDisplaySize(380, 523);

    this.bgOrigin = this.background.getTopLeft();

    this.title = config.scene.add.text(this.x, this.y, "Building", { font: '30px Arial', fill: '#FFFFFF' });
    Phaser.Display.Align.In.TopCenter(this.title, this.background, 0, -10);

    this.confirmDialog = new ConfirmDialog(
      {
        scene: config.scene,
        x: config.scene.width / 2,
        y: config.scene.height / 2,
        backgroundKey: "window",
        visible: false,
        title: "WARNING!",
        text: "Are you sure you want to demolish this building?"
      });

    this.closeButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x + 353,
        y: this.bgOrigin.y + 25,
        backgroundKey: "button-atlas",
        backgroundFrame: "close.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -20,
        labelText: "Close"
      });

    this.health = new Bar(
      {
        scene: config.scene,
        x: this.bgOrigin.x + 10,
        y: this.bgOrigin.y + 50,
        width: 355,
        height: 30,
        visible: false,
        value: 0,
        maxValue: 0,
        barColor: 0x1DF52B,
        barAlpha: 1,
        backgroundColor: 0x000000,
        backgroundAlpha: 1,
        borderColor: 0xFFFFFF,
        borderAlpha: 1,
        textSize: 18,
        extraText: "Health:"
      });

    this.level = config.scene.add.text(this.bgOrigin.x, this.bgOrigin.y, "Level: 0", { font: '20px Arial', fill: '#FFFFFF' });
    this.food = config.scene.add.text(this.bgOrigin.x, this.bgOrigin.y, "Food: 0", { font: '20px Arial', fill: '#FFFFFF' });
    this.materials = config.scene.add.text(this.bgOrigin.x, this.bgOrigin.y, "Materials: 0", { font: '20px Arial', fill: '#FFFFFF' });
    this.gas = config.scene.add.text(this.bgOrigin.x, this.bgOrigin.y, "Gas: 0", { font: '20px Arial', fill: '#FFFFFF' });
    this.cropWaste = config.scene.add.text(this.bgOrigin.x, this.bgOrigin.y, "Crop Waste: 0", { font: '20px Arial', fill: '#FFFFFF' });
    this.seeds = config.scene.add.text(this.bgOrigin.x, this.bgOrigin.y, "Seeds: 0", { font: '20px Arial', fill: '#FFFFFF' });
    this.repairCost = config.scene.add.text(this.bgOrigin.x + 230, this.bgOrigin.y + 450, "Repair Cost: 0", { font: '16px Arial', fill: '#FFFFFF' });
    this.levelUpCost = config.scene.add.text(this.bgOrigin.x + 10, this.bgOrigin.y + 450, "Level Up Cost: 0", { font: '16px Arial', fill: '#FFFFFF' });

    this.moveButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x,
        y: this.bgOrigin.y,
        backgroundKey: "button-atlas",
        backgroundFrame: "move.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Move building"
      });

    this.repairButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x,
        y: this.bgOrigin.y,
        backgroundKey: "button-atlas",
        backgroundFrame: "repair.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Repair building"
      });

    this.demolishButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x,
        y: this.bgOrigin.y,
        backgroundKey: "button-atlas",
        backgroundFrame: "demolish.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Demolish building"
      });

    this.levelUpButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x,
        y: this.bgOrigin.y,
        backgroundKey: "button-atlas",
        backgroundFrame: "building-level-up.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Level up building"
      });

    this.depositButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x,
        y: this.bgOrigin.y,
        backgroundKey: "button-atlas",
        backgroundFrame: "deposit.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Store Items"
      });

    this.storageButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x,
        y: this.bgOrigin.y,
        backgroundKey: "button-atlas",
        backgroundFrame: "open-storage.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Open storage"
      });

    this.questButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x + 45,
        y: this.bgOrigin.y + 300,
        backgroundKey: "button-atlas",
        backgroundFrame: "missions.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Quests"
      });

    this.foodButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x + 45,
        y: this.bgOrigin.y + 300,
        backgroundKey: "button-atlas",
        backgroundFrame: "food-production.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Food Production"
      });

    this.gasButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x + 45,
        y: this.bgOrigin.y + 300,
        backgroundKey: "button-atlas",
        backgroundFrame: "gas-production.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Gas Production"
      });

    this.endDayButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x + 75,
        y: this.bgOrigin.y + 300,
        backgroundKey: "button-atlas",
        backgroundFrame: "rest.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Rest until tomorrow"
      });

    // CONFIGURACION

    this.background.setVisible(config.visible);
    this.title.setVisible(config.visible);
    this.health.setVisible(config.visible);

    this.level.setVisible(config.visible);
    this.food.setVisible(config.visible);
    this.materials.setVisible(config.visible);
    this.gas.setVisible(config.visible);
    this.cropWaste.setVisible(config.visible);
    this.seeds.setVisible(config.visible);
    this.repairCost.setVisible(config.visible);
    this.levelUpCost.setVisible(config.visible);

    // Oyente para el boton mover edificio.
    this.moveButton.on('pointerdown', (pointer) =>
    {
      // Ocultamos la interfaz de acciones de edificio.
      this.showBuildingUI();
      // Avisamos a la interfaz de construccion que comienza la construccion.
      this.scene.buildUI.setBuildingMode(true, true);
      // Avisamos al manager de construccion que mueva el edificio seleccionado.
      this.scene.gameScene.buildingManager.moveBuilding(this.currentBuilding);
    });

    // Oyente para el boton reparar el edificio.
    this.repairButton.on('pointerdown', (pointer) =>
    {
      var repairCost = this.currentBuilding.getRepairCost();
      if(this.scene.inventoryManager.checkResource("material", repairCost))
      {
        this.scene.inventoryManager.useResource("material", repairCost);
        // Ocultamos la interfaz de acciones de edificio.
        this.showBuildingUI();
        this.currentBuilding.repair();
        this.health.increment(this.currentBuilding.maxHealth);
      }
      else
      {
        this.scene.notificationManager.showMessage("no_materials", repairCost);
      }
    });

    // Oyente para el boton demoler el edificio.
    this.demolishButton.on('pointerdown', (pointer) =>
    {
      // Ocultamos la interfaz de acciones de edificio.
      this.showBuildingUI();
      this.confirmDialog.setVisibility(true);
      this.scene.confirmDialogInteraction = true;
    });

    // Oyente para el boton subir de nivel el edificio.
    this.levelUpButton.on('pointerdown', (pointer) =>
    {
      var levelCost = this.currentBuilding.getLevelUpCost();
      if(this.scene.inventoryManager.checkResource("material", levelCost))
      {
        this.scene.inventoryManager.useResource("material", levelCost);
        // Ocultamos la interfaz de acciones de edificio.
        this.showBuildingUI();
        this.currentBuilding.levelUp();
      }
      else
      {
        this.scene.notificationManager.showMessage("no_materials", levelCost);
      }
    });

    // Oyente para el boton depositar items en el edificio.
    this.depositButton.on('pointerdown', (pointer) =>
    {
      if(this.currentBuilding.buildingName === "Armory")
      {
        // Ocultamos la interfaz de acciones de edificio.
        this.showBuildingUI();
        this.scene.inventoryManager.showContainer(this.currentBuilding);
        this.scene.inventoryManager.depositAllItems("weapons-ammo");
      }
      else if(this.currentBuilding.buildingName === "Hospital")
      {
        // Ocultamos la interfaz de acciones de edificio.
        this.showBuildingUI();
        this.scene.inventoryManager.showContainer(this.currentBuilding);
        this.scene.inventoryManager.depositAllItems("health");
      }
      else if(this.currentBuilding.buildingName === "Farm")
      {
        this.scene.inventoryManager.depositAllItems("seed");
        // Seteamos la cantidad de combustible.
        this.seeds.setText("Seeds: " + this.scene.gameScene.seeds);
      }
      else if(this.currentBuilding.buildingName === "Gas Station")
      {
        this.scene.inventoryManager.depositAllItems("gas");
        // Seteamos la cantidad de combustible.
        this.gas.setText("Gas: " + this.scene.gameScene.gas);
      }
      else if(this.currentBuilding.buildingName === "Storage")
      {
        this.scene.inventoryManager.depositAllItems("food");
        // Seteamos la cantidad de comida.
        this.food.setText("Food: " + this.scene.gameScene.food);
        this.scene.inventoryManager.depositAllItems("material");
        // Seteamos la cantidad de materiales.
        this.materials.setText("Materials: " + this.scene.gameScene.materials);
      }
    });

    // Oyente para el boton abrir depósito del edificio.
    this.storageButton.on('pointerdown', (pointer) =>
    {
      // Ocultamos la interfaz de acciones de edificio.
      this.showBuildingUI();
      this.scene.inventoryManager.showContainer(this.currentBuilding);
    });

    // Oyente para el boton confirmar.
    this.confirmDialog.yesButton.on('pointerdown', (pointer) =>
    {
      this.confirmDialog.setVisibility(false);
      this.scene.gameScene.materials += Phaser.Math.RoundTo(this.currentBuilding.buildingCost / 2);
      this.currentBuilding.demolish();
      this.scene.confirmDialogInteraction = false;
    });

    // Oyente para el boton cancelar.
    this.confirmDialog.noButton.on('pointerdown', (pointer) =>
    {
      this.confirmDialog.setVisibility(false);
      this.scene.confirmDialogInteraction = false;
    });

    // Oyente para el boton cerrar la interfaz.
    this.closeButton.on('pointerdown', (pointer) =>
    {
      // Ocultamos la interfaz de acciones de edificio.
      this.showBuildingUI();
    });

    // Oyente para el boton misiones.
    this.questButton.on('pointerdown', (pointer) =>
    {
      // Ocultamos la interfaz de acciones de edificio.
      this.showBuildingUI();
      this.scene.questMap.showQuestMap();
    });

    // Oyente para el boton generar comida.
    this.foodButton.on('pointerdown', (pointer) =>
    {
      // Ocultamos la interfaz de acciones de edificio.
      this.showBuildingUI();
      this.scene.productionUI.showProductionUI(this.currentBuilding);
    });

    // Oyente para el boton generar combustible.
    this.gasButton.on('pointerdown', (pointer) =>
    {
      // Ocultamos la interfaz de acciones de edificio.
      this.showBuildingUI();
      this.scene.productionUI.showProductionUI(this.currentBuilding);
    });

    // Oyente para el boton terminar dia.
    this.endDayButton.on('pointerdown', (pointer) =>
    {
      // Ocultamos la interfaz de acciones de edificio.
      this.showBuildingUI();
      if(this.scene.inventoryManager.checkResource("food", 2))
      {
        this.scene.inventoryManager.useResource("food", 2);
        this.scene.notificationManager.showMessage("food_consumed", 2);
      }
      else
      {
        // TODO
        this.scene.notificationManager.showMessage("no_food");
      }
      this.scene.dayTimeManager.endDay();
      this.scene.saveManager.saveGame(this.scene.characterSheet.name);
      this.scene.questMap.resetQuests();
    });

  }

  // Metodo que utilizamos para mostrar / ocultar la interfaz de acciones de un edificio seleccionado.
  showBuildingUI (building)
  {
    // Modificamos la visibilidad de la interfaz.
    if(this.visible)
    {
      this.setVisible(false);
      this.scene.buildingInteraction = false;
    }
    else
    {
      // Seteamos el edificio actual.
      this.currentBuilding = building;
      // Seteamos la salud del edificio seleccionado.
      this.health.setValue(building.health, building.maxHealth);
      // Seteamos el nivel del edificio seleccionado.
      this.level.setText("Level: " + building.level);
      // Seteamos el nombre del edificio seleccionado.
      this.title.setText(building.buildingName);
      Phaser.Display.Align.In.TopCenter(this.title, this.background, 0, 200);
      // Seteamos el costo de reparacion del edificio seleccionado.
      this.repairCost.setText("Repair Cost: " + this.currentBuilding.getRepairCost());
      // Seteamos el costo de mejora del edificio seleccionado.
      this.levelUpCost.setText("Level Up Cost: " + this.currentBuilding.getLevelUpCost());
      // Cerramos los paneles que esten abiertos.
      this.scene.closeOverlapPanels("building-ui");
      // Seteamos la visibilidad del panel.
      this.setVisible(true);
      // Seteamos la interaccion con el panel del edificio.
      this.scene.buildingInteraction = true;
    }
  }

  // Metodo que utilizamos para cambiar la visibilidad de la interfaz.
  setVisible (value)
  {
    this.visible = value;
    this.background.setVisible(value);
    this.title.setVisible(value);
    this.health.setVisible(value);
    this.repairCost.setVisible(value);
    this.levelUpCost.setVisible(value);
    this.closeButton.setVisible(value);
    if(!value)
    {
      this.level.setVisible(value);
      this.food.setVisible(value);
      this.materials.setVisible(value);
      this.gas.setVisible(value);
      this.seeds.setVisible(value);
      this.cropWaste.setVisible(value);
      this.moveButton.setVisible(value);
      this.repairButton.setVisible(value);
      this.demolishButton.setVisible(value);
      this.levelUpButton.setVisible(value);
      this.depositButton.setVisible(value);
      this.storageButton.setVisible(value);
      this.questButton.setVisible(value);
      this.foodButton.setVisible(value);
      this.gasButton.setVisible(value);
      this.endDayButton.setVisible(value);
    }
    else
    {
      this.setBuilding();
    }
  }

  // Metodo que utilizamos para setear la informacion y acciones que se mostraran al abrir la ventana de acciones.
  setBuilding ()
  {
    if(this.currentBuilding.buildingName === "Armory")
    {
      this.depositButton.label.setText("Store weapons and ammo");
      this.buildingInfo = [this.level];
      if(this.currentBuilding.health === 0)
      {
        this.generalActions = [this.demolishButton, this.repairButton];
      }
      else
      {
        this.generalActions = [this.moveButton, this.demolishButton, this.repairButton, this.levelUpButton, this.depositButton, this.storageButton];
      }
      this.specificActions = [];
    }
    else if(this.currentBuilding.buildingName === "Barricade")
    {
      this.buildingInfo = [this.level];
      if(this.currentBuilding.health === 0)
      {
        this.generalActions = [this.demolishButton, this.repairButton];
      }
      else
      {
        this.generalActions = [this.moveButton, this.demolishButton, this.repairButton, this.levelUpButton];
      }
      this.specificActions = [];
    }
    else if(this.currentBuilding.buildingName === "Farm")
    {
      this.depositButton.label.setText("Store seeds");
      this.food.setText("Food: " + this.scene.gameScene.food);
      this.seeds.setText("Seeds: " + this.scene.gameScene.seeds);
      this.buildingInfo = [this.level, this.food, this.seeds];
      if(this.currentBuilding.health === 0)
      {
        this.generalActions = [this.demolishButton, this.repairButton];
      }
      else
      {
        this.generalActions = [this.moveButton, this.demolishButton, this.repairButton, this.levelUpButton, this.depositButton];
      }
      this.specificActions = [this.foodButton];
    }
    else if(this.currentBuilding.buildingName === "Gas Station")
    {
      this.depositButton.label.setText("Store gas");
      this.gas.setText("Gas: " + this.scene.gameScene.gas);
      this.cropWaste.setText("Crop Waste: " + this.scene.gameScene.cropWaste);
      this.buildingInfo = [this.level, this.gas, this.cropWaste];
      if(this.currentBuilding.health === 0)
      {
        this.generalActions = [this.demolishButton, this.repairButton];
      }
      else
      {
        this.generalActions = [this.moveButton, this.demolishButton, this.repairButton, this.levelUpButton, this.depositButton];
      }
      this.specificActions = [this.gasButton];
    }
    else if(this.currentBuilding.buildingName === "Hospital")
    {
      this.depositButton.label.setText("Store first aid items");
      this.buildingInfo = [this.level];
      if(this.currentBuilding.health === 0)
      {
        this.generalActions = [this.demolishButton, this.repairButton];
      }
      else
      {
        this.generalActions = [this.moveButton, this.demolishButton, this.repairButton, this.levelUpButton, this.depositButton, this.storageButton];
      }
      this.specificActions = [];
    }
    else if(this.currentBuilding.buildingName === "Main Building")
    {
      this.buildingInfo = [this.level, this.food, this.materials, this.gas, this.seeds, this.cropWaste];
      this.food.setText("Food: " + this.scene.gameScene.food);
      this.materials.setText("Materials: " + this.scene.gameScene.materials);
      this.gas.setText("Gas: " + this.scene.gameScene.gas);
      this.seeds.setText("Seeds: " + this.scene.gameScene.seeds);
      this.cropWaste.setText("Crop Waste: " + this.scene.gameScene.cropWaste);
      if(this.currentBuilding.health === 0)
      {
        this.generalActions = [this.repairButton];
      }
      else
      {
        this.generalActions = [this.repairButton, this.levelUpButton];
      }
      this.specificActions = [this.questButton, this.endDayButton];
    }
    else if(this.currentBuilding.buildingName === "Storage")
    {
      this.depositButton.label.setText("Store food and materials");
      this.food.setText("Food: " + this.scene.gameScene.food);
      this.materials.setText("Materials: " + this.scene.gameScene.materials);
      this.buildingInfo = [this.level, this.food, this.materials];
      if(this.currentBuilding.health === 0)
      {
        this.generalActions = [this.demolishButton, this.repairButton];
      }
      else
      {
        this.generalActions = [this.moveButton, this.demolishButton, this.repairButton, this.levelUpButton, this.depositButton];
      }
      this.specificActions = [];
    }
    else if(this.currentBuilding.buildingName === "Turret")
    {
      this.buildingInfo = [this.level];
      if(this.currentBuilding.health === 0)
      {
        this.generalActions = [this.demolishButton, this.repairButton];
      }
      else
      {
        this.generalActions = [this.moveButton, this.demolishButton, this.repairButton, this.levelUpButton];
      }
      this.specificActions = [];
    }

    Phaser.Actions.GridAlign(this.buildingInfo,
      {
        width: 1,
        height: this.buildingInfo.length,
        cellWidth: 20,
        cellHeight: 20,
        x: this.bgOrigin.x + 45,
        y: this.bgOrigin.y + 190
      });

    for(var i = 0; i < this.buildingInfo.length; i++)
    {
      this.buildingInfo[i].setVisible(true);
    }

    Phaser.Actions.GridAlign(this.generalActions,
      {
        width: this.generalActions.length,
        height: 1,
        cellWidth: 40,
        cellHeight: 40,
        x: this.bgOrigin.x + 90,
        y: this.bgOrigin.y + 500
      });

    for(var j = 0; j < this.generalActions.length; j++)
    {
      this.generalActions[j].adjustLabel();
      this.generalActions[j].setVisible(true);
    }

    Phaser.Actions.GridAlign(this.specificActions,
      {
        width: this.specificActions.length,
        height: 1,
        cellWidth: 40,
        cellHeight: 40,
        x: this.bgOrigin.x + 45,
        y: this.bgOrigin.y + 400
      });

    for(var k = 0; k < this.specificActions.length; k++)
    {
      this.specificActions[k].adjustLabel();
      this.specificActions[k].setVisible(true);
    }
  }
}
