import Button from "../button.js";

// Clase encargada de mostrar la informacion de la mision seleccionada, asi como permitir iniciarla.
export default class QuestUI
{
  constructor (config)
  {
    // ATRIBUTOS

    this.scene; // Escena donde se ubica la interfaz de la mision.
    this.x; // La posicion de la interfaz en x.
    this.y; // La posicion de la interfaz en y.
    this.visible; // Si es visible o no al momento de la creacion.
    this.background; // Imagen de fondo de la interfaz.
    this.bgOrigin; // Origen de la interfaz para luego alinear el resto de las cosas que contiene.

    this.currentQuest; // Mision actualmente seleccionada.
    this.questNameText; // Texto que muestra el nombre de la mision.
    this.questInfoText; // Texto que muestra la informacion sobre la mision.
    this.questRewardsText; // Texto que muestra las recompensas de la mision.
    this.questDifficultyText; // Texto que muestra la dificultad de la mision.
    this.questTimeText; // Texto que muestra el tiempo de la mision.
    this.gasCostText; // Texto que muestra el costo en combustible.
    this.startQuestButton; // Boton para empezar la mision.
    this.closeButton; // Boton para cerra la interfaz de la mision.

    this.notEnoughGas; // Flag de falta de combustible para comenzar la mision.

    // INICIALIZACION

    this.scene = config.scene;
    this.x = config.x / 2;
    this.y = config.y / 2;
    this.visible = config.visible;

    this.background = config.scene.add.image(this.x, this.y - 32, config.background);
    //this.background.setDisplaySize(380, 523);

    this.bgOrigin = this.background.getTopLeft();

    this.questNameText = config.scene.add.text(this.x, this.y, "Quest", { font: '30px Arial', fill: '#FFFFFF' });
    Phaser.Display.Align.In.TopCenter(this.questNameText, this.background, 0, -10);

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

    this.notEnoughGas = false;

    this.questInfoText = config.scene.add.text(this.bgOrigin.x + 20, this.bgOrigin.y + 70, "Info: ", { font: '20px Arial', fill: '#FFFFFF' });
    this.questRewardsText = config.scene.add.text(this.bgOrigin.x + 20, this.bgOrigin.y + 200, "Rewards: ", { font: '20px Arial', fill: '#FFFFFF' });
    this.questDifficultyText = config.scene.add.text(this.bgOrigin.x + 20, this.bgOrigin.y + 230, "Difficulty: ", { font: '20px Arial', fill: '#FFFFFF' });
    this.questTimeText = config.scene.add.text(this.bgOrigin.x + 20, this.bgOrigin.y + 260, "Time: ", { font: '20px Arial', fill: '#FFFFFF' });
    this.gasCostText = config.scene.add.text(this.bgOrigin.x + 20, this.bgOrigin.y + 290, "Gas Cost: ", { font: '20px Arial', fill: '#FFFFFF' });

    this.startQuestButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x + 190,
        y: this.bgOrigin.y + 450,
        backgroundKey: "button-atlas",
        backgroundFrame: "start-mission.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -30,
        labelText: "Start Quest"
      });

    // CONFIGURACION

    this.background.setVisible(config.visible);
    this.questNameText.setVisible(config.visible);
    this.questInfoText.setVisible(config.visible);
    this.questRewardsText.setVisible(config.visible);
    this.questDifficultyText.setVisible(config.visible);
    this.questTimeText.setVisible(config.visible);
    this.gasCostText.setVisible(config.visible);

    // Oyente para el boton empezar mision.
    this.startQuestButton.on('pointerdown', (pointer) =>
    {
      this.showQuestUI();
      var time = 0;
      var cost = 0;
      if(this.notEnoughGas)
      {
        time = this.currentQuest.questTime * 2;
      }
      else
      {
        time = this.currentQuest.questTime;
        cost = this.currentQuest.questCost;
      }
      if((this.scene.dayTimeManager.hourCount === 0) | ((this.scene.dayTimeManager.hourCount + time) >= 24))
      {
        this.scene.notificationManager.showMessage("no_time");
        return;
      }
      this.scene.inventoryManager.useResource("gas", cost);
      this.scene.dayTimeManager.addHours(time);
      this.scene.gameScene.startMission();
    });

    // Oyente para el boton cerrar la interfaz.
    this.closeButton.on('pointerdown', (pointer) =>
    {
      this.showQuestUI();
      this.scene.questMap.showQuestMap();
    });
  }

  // Metodo que utilizamos para mostrar / ocultar la interfaz de acciones de un edificio seleccionado.
  showQuestUI (quest)
  {
    // Modificamos la visibilidad de la interfaz.
    if(this.visible)
    {
      this.setVisible(false);
      //this.scene.buildingInteraction = false;
    }
    else
    {
      // Seteamos la mision actual.
      this.currentQuest = quest;

      // Seteamos el nombre de la mision seleccionada.
      this.questNameText = this.scene.add.text(this.x, this.y, quest.questName, { font: '30px Arial', fill: '#FFFFFF' });
      Phaser.Display.Align.In.TopCenter(this.questNameText, this.background, 0, 200);

      // Seteamos la informacion de la mision seleccionada.
      this.questInfoText.setText(quest.questInfo);
      // Seteamos las recompensas de la mision seleccionada.
      this.questRewardsText.setText("Rewards: " + quest.questRewards);
      // Seteamos la dificultad de la mision seleccionada.
      this.questDifficultyText.setText("Difficulty: " + quest.questDifficulty + "/5");
      if(this.scene.inventoryManager.checkResource("gas", quest.questCost))
      {
        // Seteamos el tiempo de la mision seleccionada.
        this.questTimeText.setText("Time: " + quest.questTime + " hs.");
        // Seteamos el costo de la mision seleccionada.
        this.gasCostText.setText("Gas Cost: " + quest.questCost);
      }
      else
      {
        this.notEnoughGas = true;
        // Seteamos el tiempo de la mision seleccionada.
        this.questTimeText.setText("Time: " + quest.questTime * 2 + " hs.");
        // Seteamos el costo de la mision seleccionada.
        this.gasCostText.setText("Gas Cost: " + quest.questCost + "\nNot enough gas in reserve to travel\nby vehicle.\nMission time will be increased.");
      }

      // Cerramos los paneles que esten abiertos.
      this.scene.closeOverlapPanels("quest-ui");
      // Seteamos la visibilidad del panel.
      this.setVisible(true);
      // Seteamos la interaccion con el panel del edificio.
      //this.scene.buildingInteraction = true;
    }
  }

  // Metodo que utilizamos para cambiar la visibilidad de la interfaz.
  setVisible (value)
  {
    this.visible = value;
    this.background.setVisible(value);
    this.questNameText.setVisible(value);
    this.questInfoText.setVisible(value);
    this.questRewardsText.setVisible(value);
    this.questDifficultyText.setVisible(value);
    this.questTimeText.setVisible(value);
    this.gasCostText.setVisible(value);
    this.startQuestButton.setVisible(value);
    this.closeButton.setVisible(value);
  }
}
