import Button from "../button.js";
import Bar from "../bar.js";
import ConfirmDialog from "../confirm-dialog.js";

// Clase que se encarga de mostrar la interfaz de produccion de los edificios.
export default class ProductionUI
{
  constructor (config)
  {
    // ATRIBUTOS

    this.scene; // La escena donde se ubicara la interfaz de produccion.
    this.x; // La posicion de la interfaz en x.
    this.y; // La posicion de la interfaz en y.
    this.visible; // Si es visible o no al momento de la creacion.
    this.background; // Imagen de fondo de la interfaz.
    this.bgOrigin; // Origen de la interfaz para luego alinear el resto de las cosas que contiene.
    this.title; // Titulo que indica el tipo de produccion.

    this.foodProduction;
    this.gasProduction;
    this.cropWasteProduction;
    this.seedsProduction;

    this.foodProductionText; // Texto que muestra la cantidad de comida a producir.
    this.gasProductionText; // Texto que muestra la cantidad de combustible a producir.
    this.cropWasteProductionText; // Texto que muestra la cantidad de desperdicio de cosecha a producir.
    this.seedsProductionText; // Texto que muestra la cantidad de semillas a producir.
    this.cropWasteCostText; // Texto que muestra el costo en desperdicio de cosecha para producir combustible.
    this.seedsCostText; // Texto que muestra el costo en semillas para producir comida.
    this.productionTimeText; // Texto que muestra el tiempo restante para completar la produccion.

    this.startProductionButton; // Boton para empezar la produccion.
    this.collectButton; // Boton para recolectar la produccion.

    this.currentBuilding; // Edificio actualmente seleccionado.

    this.closeButton; // Boton para cerrar la interfaz cuando esta se encuentre abierta.

    // INICIALIZACION

    this.scene = config.scene;
    this.x = config.x / 4;
    this.y = config.y / 2;
    this.visible = config.visible;

    this.background = config.scene.add.image(this.x, this.y - 32, config.background);
    //this.background.setDisplaySize(380, 523);

    this.bgOrigin = this.background.getTopLeft();

    this.title = config.scene.add.text(this.x, this.y, "Production", { font: '30px Arial', fill: '#FFFFFF' });
    Phaser.Display.Align.In.TopCenter(this.title, this.background, 0, -10);

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

    this.foodProduction = 0;
    this.gasProduction = 0;
    this.cropWasteProduction = 0;
    this.seedsProduction = 0;

    this.foodProductionText = config.scene.add.text(this.bgOrigin.x + 10, this.bgOrigin.y + 80, "Food Production: 0", { font: '20px Arial', fill: '#FFFFFF' });
    this.gasProductionText = config.scene.add.text(this.bgOrigin.x + 10, this.bgOrigin.y + 80, "Gas Production: 0", { font: '20px Arial', fill: '#FFFFFF' });
    this.cropWasteProductionText = config.scene.add.text(this.bgOrigin.x + 10, this.bgOrigin.y + 110, "Crop Waste Produced: 0", { font: '20px Arial', fill: '#FFFFFF' });
    this.seedsProductionText = config.scene.add.text(this.bgOrigin.x + 10, this.bgOrigin.y + 140, "Seeds Produced: 0", { font: '20px Arial', fill: '#FFFFFF' });
    this.cropWasteCostText = config.scene.add.text(this.bgOrigin.x + 10, this.bgOrigin.y + 170, "Crop Waste Cost: 0", { font: '20px Arial', fill: '#FFFFFF' });
    this.seedsCostText = config.scene.add.text(this.bgOrigin.x + 10, this.bgOrigin.y + 170, "Seed Cost: 0", { font: '20px Arial', fill: '#FFFFFF' });
    this.productionTimeText = config.scene.add.text(this.bgOrigin.x + 90, this.bgOrigin.y + 280, "Time Remaining: 0", { font: '20px Arial', fill: '#FFFFFF' });

    this.startProductionButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x + 165,
        y: this.bgOrigin.y + 410,
        backgroundKey: "button-atlas",
        backgroundFrame: "",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Start Production"
      });

    this.collectButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x + 215,
        y: this.bgOrigin.y + 410,
        backgroundKey: "button-atlas",
        backgroundFrame: "",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Collect Production"
      });

    // CONFIGURACION

    this.background.setVisible(config.visible);
    this.title.setVisible(config.visible);

    this.foodProductionText.setVisible(config.visible);
    this.gasProductionText.setVisible(config.visible);
    this.cropWasteProductionText.setVisible(config.visible);
    this.seedsProductionText.setVisible(config.visible);
    this.cropWasteCostText.setVisible(config.visible);
    this.seedsCostText.setVisible(config.visible);
    this.productionTimeText.setVisible(config.visible);

    // Oyente para el boton comenzar produccion.
    this.startProductionButton.on('pointerdown', (pointer) =>
    {
      var cost = this.currentBuilding.productionCost;
      var hasResources = false;
      if(this.currentBuilding.buildingName === "Farm")
      {
        hasResources = this.scene.inventoryManager.checkResource("seed", cost);
      }
      if(this.currentBuilding.buildingName === "Gas Station")
      {
        hasResources = this.scene.inventoryManager.checkResource("crop waste", cost);
      }
      if(hasResources)
      {
        if(this.currentBuilding.buildingName === "Farm")
        {
          this.currentBuilding.setFrame(this.currentBuilding.buildingProduction, false, false);
          this.scene.inventoryManager.useResource("seed", cost);
        }
        else
        {
          this.scene.InventoryManager.useResource("crop waste", cost);
        }
        this.currentBuilding.startProduction(this.scene.dayTimeManager.dayCount, this.scene.dayTimeManager.hourCount);
        this.showProductionUI();
        this.showProductionUI(this.currentBuilding);
      }
      else
      {
        this.scene.notificationManager.showMessage("no_production");
      }
    });

    // Oyente para el boton recolectar produccion.
    this.collectButton.on('pointerdown', (pointer) =>
    {
      if(this.currentBuilding.buildingName === "Farm")
      {
        this.currentBuilding.setFrame(this.currentBuilding.buildingExterior, false, false);
        this.scene.gameScene.food += this.currentBuilding.getFoodProduction();
        this.scene.gameScene.cropWaste += this.currentBuilding.getCropWasteProduction();
        this.scene.gameScene.seeds += this.currentBuilding.getSeedsProduction();
      }
      else if(this.currentBuilding.buildingName === "Gas Station")
      {
        this.scene.gameScene.gas += this.currentBuilding.getGasProduction();
      }
      this.currentBuilding.productionCollected = true;
      this.showProductionUI();
      this.showProductionUI(this.currentBuilding);
    });

    // Oyente para el boton cerrar la interfaz.
    this.closeButton.on('pointerdown', (pointer) =>
    {
      // Ocultamos la interfaz.
      this.showProductionUI();
    });

  }

  // Metodo que utilizamos para mostrar / ocultar la interfaz de produccion de un edificio seleccionado.
  showProductionUI (building)
  {
    // Modificamos la visibilidad de la interfaz.
    if(this.visible)
    {
      this.setVisible(false);
      this.scene.productionInteraction = false;
    }
    else
    {
      // Seteamos el edificio actual.
      this.currentBuilding = building;
      if(building.buildingName === "Farm")
      {
        this.title.setText("Food Production");
        this.startProductionButton.setFrame("start-food-production.png", false, false);
        this.collectButton.setFrame("collect-food-production.png", false, false);
      }
      else
      {
        this.title.setText("Gas Production");
        this.startProductionButton.setFrame("start-gas-production.png", false, false);
        this.collectButton.setFrame("collect-gas-production.png", false, false);
      }
      Phaser.Display.Align.In.TopCenter(this.title, this.background, 0, 200);
      // Cerramos los paneles que esten abiertos.
      this.scene.closeOverlapPanels("production-ui");
      // Seteamos la visibilidad del panel.
      this.setVisible(true);
      // Seteamos la interaccion con el panel del edificio.
      this.scene.productionInteraction = true;
    }
  }

  // Metodo que utilizamos para cambiar la visibilidad de la interfaz.
  setVisible (value)
  {
    this.visible = value;
    this.background.setVisible(value);
    this.title.setVisible(value);
    this.closeButton.setVisible(value);
    if(!value)
    {
      this.foodProductionText.setVisible(value);
      this.gasProductionText.setVisible(value);
      this.cropWasteProductionText.setVisible(value);
      this.seedsProductionText.setVisible(value);
      this.cropWasteCostText.setVisible(value);
      this.seedsCostText.setVisible(value);
      this.productionTimeText.setVisible(value);
      this.startProductionButton.setVisible(value);
      this.collectButton.setVisible(value);
    }
    else
    {
      this.setBuilding();
    }
  }

  // Metodo que utilizamos para setear la informacion y acciones que se mostraran al abrir la ventana de produccion.
  setBuilding ()
  {
    if(this.currentBuilding.inProduction)
    {
      var completed = this.currentBuilding.remainingProductionTime(this.scene.dayTimeManager.dayCount, this.scene.dayTimeManager.hourCount);
      if(completed === 0)
      {
        this.currentBuilding.inProduction = false;
        if(this.currentBuilding.buildingName === "Farm")
        {
          this.foodProduction = this.currentBuilding.getFoodProduction();
          this.cropWasteProduction = this.currentBuilding.getCropWasteProduction();
          this.seedsProduction = this.currentBuilding.getSeedsProduction();
          this.foodProductionText.setText("Food Produced: " + this.foodProduction);
          this.cropWasteProductionText.setText("Crop Waste Produced: " + this.cropWasteProduction);
          this.seedsProductionText.setText("Seeds Produced: " + this.seedsProduction);
          this.productionTimeText.setText("Production Completed");
          this.foodProductionText.setVisible(true);
          this.cropWasteProductionText.setVisible(true);
          this.seedsProductionText.setVisible(true);
        }
        else if(this.currentBuilding.buildingName === "Gas Station")
        {
          this.gasProduction = this.currentBuilding.getGasProduction();
          this.gasProductionText.setText("Gas Produced: " + this.gasProduction);
          this.productionTimeText.setText("Production Completed");
          this.gasProductionText.setVisible(true);
        }
        this.productionTimeText.setVisible(true);
        this.collectButton.setVisible(true);
      }
      else
      {
        this.productionTimeText.setText("Time Remaining: " + completed + " hs.");
        this.productionTimeText.setVisible(true);
      }
    }
    else
    {
      if(this.currentBuilding.productionCollected)
      {
        if(this.currentBuilding.buildingName === "Farm")
        {
          this.foodProductionText.setText("Aprox. Food Production: " + this.currentBuilding.foodProduction.min + "-" + this.currentBuilding.foodProduction.max);
          this.seedsCostText.setText("Seeds Cost: " + this.currentBuilding.productionCost);
          this.foodProductionText.setVisible(true);
          this.seedsCostText.setVisible(true);
        }
        else if(this.currentBuilding.buildingName === "Gas Station")
        {
          this.gasProductionText.setText("Aprox. Gas Production: " + this.currentBuilding.gasProduction.min + "-" + this.currentBuilding.gasProduction.max);
          this.cropWasteCostText.setText("Crop Waste Cost: " + this.currentBuilding.productionCost);
          this.gasProductionText.setVisible(true);
          this.cropWasteCostText.setVisible(true);
        }
        this.startProductionButton.setVisible(true);
      }
      else
      {
        if(this.currentBuilding.buildingName === "Farm")
        {
          this.foodProductionText.setText("Food Produced: " + this.foodProduction);
          this.cropWasteProductionText.setText("Crop Waste Produced: " + this.cropWasteProduction);
          this.seedsProductionText.setText("Seeds Produced: " + this.seedsProduction);
          this.productionTimeText.setText("Production Completed");
          this.foodProductionText.setVisible(true);
          this.cropWasteProductionText.setVisible(true);
          this.seedsProductionText.setVisible(true);
        }
        else if(this.currentBuilding.buildingName === "Gas Station")
        {
          this.gasProductionText.setText("Gas Produced: " + this.gasProduction);
          this.productionTimeText.setText("Production Completed");
          this.gasProductionText.setVisible(true);
        }
        this.productionTimeText.setVisible(true);
        this.collectButton.setVisible(true);
      }
    }
  }
}
