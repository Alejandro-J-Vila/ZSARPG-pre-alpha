import Button from "../button.js";
import Quest from "./quest.js";


// Clase que representa un mapa donde el jugador puede seleccionar misiones para realizar.
export default class QuestMap
{
  constructor (config)
  {
    // ATRIBUTOS

    this.scene; // La escena donde se ubicara la interfaz para seleccionar misiones
    this.x; // La posicion del panel en x.
    this.y; // La posicion del panel en y.
    this.visible; // Si es visible o no al momento de la creacion.
    this.background; // Imagen de fondo del panel.
    this.bgOrigin; // Origen del panel para luego alinear el resto de las cosas que contiene.
    this.title; // Titulo del panel.
    this.closeButton; // Boton para cerrar el panel cuando este se encuentra abierto.

    this.questLocations; // Lista donde guardamos las posiciones de las misiones del mapa.
    this.quests; // Lista de misiones.
    this.weaponsQuest; // Mision de armas.
    this.healthQuest; // Mision de salud.
    this.foodQuest; // Mision de comida.
    this.materialsQuest; // Mision de materiales.
    this.gasQuest; // Mision de combustible

    // INICIALIZACION

    this.scene = config.scene;
    this.x = config.x / 2;
    this.y = config.y / 2;

    this.visible = config.visible;

    this.background = config.scene.add.image(this.x, this.y - 32, config.background);
    //this.background.setDisplaySize(780, 523);

    this.bgOrigin = this.background.getTopLeft();

    this.title = config.scene.add.text(this.x, this.y, "Quest Map", { font: '30px Arial', fill: '#FFFFFF' });
    Phaser.Display.Align.In.TopCenter(this.title, this.background, 0, -10);

    this.quests = config.scene.add.group();

    this.questLocations = [];

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

    // CONFIGURACION

    this.background.setVisible(config.visible);
    this.title.setVisible(config.visible);

    this.quests.getChildren().forEach((quest) =>
    {
      quest.adjustLabel();
    });

    // Oyente para el boton de cerrar el panel.
    this.closeButton.on('pointerdown', (pointer) =>
    {
      this.showQuestMap();
    });

    this.addQuests();

  }

  // Metodo que utilizamos para mostrar / ocultar el panel.
  showQuestMap ()
  {
    if(this.visible)
    {
      this.setVisible(false);
      this.scene.questMapInteraction = false;
    }
    else
    {
      this.scene.closeOverlapPanels("quest-ui");
      this.setVisible(true);
      this.scene.questMapInteraction = true;
    }
  }

  // Metodo que utilizamos para cambiar la visibilidad del panel.
  setVisible (value)
  {
    this.visible = value;
    this.background.setVisible(value);
    this.title.setVisible(value);
    this.closeButton.setVisible(value);
    if(this.scene.dayTimeManager.hourCount != 0)
    {
      this.quests.toggleVisible();
    }

  }

  // Metodo que utilizamos para setear una posicion random para la mision.
  setRandomPosition (quest)
  {
    var selected = false;
    while(!selected)
    {
      var posX = Phaser.Math.RND.integerInRange(0, 23);
      var posY = Phaser.Math.RND.integerInRange(0, 13);
      if(!this.positionUsed(posX, posY))
      {
        selected = true;
        this.questLocations[quest.locationIndex] = {x: posX, y: posY};
      }
    }
    var x = (this.bgOrigin.x + 23) + (posX * 32);
    var y = (this.bgOrigin.y + 75) + (posY * 32);
    quest.setPos(x, y);
  }

  positionUsed (x, y)
  {
    for(var i = 0; i < this.questLocations.length; i++)
    {
      if((this.questLocations[i].x === x) & (this.questLocations[i].y === y))
      {
        return true;
      }
    }
    return false;
  }

  // Metodo que utilizamos cuando completamos una quest para desocupar el lugar en la grilla.
  questCompleted (index)
  {
    this.questLocations[index] = {x: -1, y: -1};
  }

  // Metodo que utilizamos para agregar todas los tipos de misiones al mapa.
  addQuests ()
  {
    if(this.quests.getLength() > 0)
    {
      return;
    }
    this.addWeaponsQuest();
    this.addHealthQuest();
    this.addFoodQuest();
    this.addMaterialsQuest();
    this.addGasQuest();
  }

  // Metodo que utilizamos cuando termina el dia, para crear nuevas quests.
  resetQuests ()
  {
    if(!this.weaponsQuest.questCompleted)
    {
      this.weaponsQuest.completeQuest();
    }
    if(!this.healthQuest.questCompleted)
    {
      this.healthQuest.completeQuest();
    }
    if(!this.foodQuest.questCompleted)
    {
      this.foodQuest.completeQuest();
    }
    if(!this.materialsQuest.questCompleted)
    {
      this.materialsQuest.completeQuest();
    }
    if(!this.gasQuest.questCompleted)
    {
      this.gasQuest.completeQuest();
    }
    this.addWeaponsQuest();
    this.addHealthQuest();
    this.addFoodQuest();
    this.addMaterialsQuest();
    this.addGasQuest();
  }

  // Metodo que utilizamos para agregar una mision de armas al mapa.
  addWeaponsQuest ()
  {
    var d = Phaser.Math.RND.integerInRange(1, 5);
    var t = Phaser.Math.RND.integerInRange(1, 4);
    var c = d * t;
    this.weaponsQuest = new Quest(
      {
        scene: this.scene,
        x: 0,
        y: 0,
        backgroundKey: "button-atlas",
        backgroundFrame: "weapons-ammo.png",
        visible: this.visible,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Weapons and ammo",
        locationIndex: 0,
        name: "Weapons and ammo",
        info: "Search the place for weapons and\nammo.\nGo to the vehicle to return.",
        rewards: "weapons-ammo",
        difficuty: d,
        time: t,
        cost: c
      });
    this.setRandomPosition(this.weaponsQuest);
    this.quests.add(this.weaponsQuest);
  }

  // Metodo que utilizamos para agregar una mision de salud al mapa.
  addHealthQuest ()
  {
    var d = Phaser.Math.RND.integerInRange(1, 5);
    var t = Phaser.Math.RND.integerInRange(1, 4);
    var c = d * t;
    this.healthQuest = new Quest(
      {
        scene: this.scene,
        x: 0,
        y: 0,
        backgroundKey: "button-atlas",
        backgroundFrame: "health.png",
        visible: this.visible,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Health",
        locationIndex: 1,
        name: "Health",
        info: "Search the place for first aid items.\nGo to the vehicle to return.",
        rewards: "health",
        difficuty: d,
        time: t,
        cost: c
      });
    this.setRandomPosition(this.healthQuest);
    this.quests.add(this.healthQuest);
  }

  // Metodo que utilizamos para agregar una mision de comida al mapa.
  addFoodQuest ()
  {
    var d = Phaser.Math.RND.integerInRange(1, 5);
    var t = Phaser.Math.RND.integerInRange(1, 4);
    var c = d * t;
    this.foodQuest = new Quest(
      {
        scene: this.scene,
        x: 0,
        y: 0,
        backgroundKey: "button-atlas",
        backgroundFrame: "food.png",
        visible: this.visible,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Food",
        locationIndex: 2,
        name: "Food",
        info: "Search the place for food.\nGo to the vehicle to return.",
        rewards: "food",
        difficuty: d,
        time: t,
        cost: c
      });
    this.setRandomPosition(this.foodQuest);
    this.quests.add(this.foodQuest);
  }

  // Metodo que utilizamos para agregar una mision de materiales al mapa.
  addMaterialsQuest ()
  {
    var d = Phaser.Math.RND.integerInRange(1, 5);
    var t = Phaser.Math.RND.integerInRange(1, 4);
    var c = d * t;
    this.materialsQuest = new Quest(
      {
        scene: this.scene,
        x: 0,
        y: 0,
        backgroundKey: "button-atlas",
        backgroundFrame: "materials.png",
        visible: this.visible,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Materials",
        locationIndex: 3,
        name: "Materials",
        info: "Search the place for materials.\nGo to the vehicle to return.",
        rewards: "materials",
        difficuty: d,
        time: t,
        cost: c
      });
    this.setRandomPosition(this.materialsQuest);
    this.quests.add(this.materialsQuest);
  }

  // Metodo que utilizamos para agregar una mision de combustible al mapa.
  addGasQuest ()
  {
    var d = Phaser.Math.RND.integerInRange(1, 5);
    var t = Phaser.Math.RND.integerInRange(1, 4);
    var c = d * t;
    this.gasQuest = new Quest(
      {
        scene: this.scene,
        x: 0,
        y: 0,
        backgroundKey: "button-atlas",
        backgroundFrame: "gas.png",
        visible: this.visible,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Gas",
        locationIndex: 4,
        name: "Gas",
        info: "Search the place for gas.\nGo to the vehicle to return.",
        rewards: "gas",
        difficuty: d,
        time: t,
        cost: c
      });
    this.setRandomPosition(this.gasQuest);
    this.quests.add(this.gasQuest);
  }

}
