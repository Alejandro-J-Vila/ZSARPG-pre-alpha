import Button from "../button.js";

// Clase que representa una mision que el jugador puede seleccionar en el mapa de misiones.
export default class Quest extends Button
{
  constructor (config)
  {
    // Llamamos al constructor de la clase base Button.
    super(config);

    // ATRIBUTOS

    this.scene; // Escena donde se encuentra el mapa de misiones.
    this.questName; // Nombre de la mision.
    this.questInfo; // Informacion sobre la mision.
    this.questRewards; // Recompensas de la mision.
    this.questDifficulty; // Dificultad de la mision.
    this.questTime; // Tiempo de la mision.
    this.questCost; // Costo en combustible de la mision.
    this.locationIndex; // Indice de la lista de localizaciones del mapa.
    this.questCompleted;

    // INICIALIZACION

    this.scene = config.scene;
    this.questName = config.name;
    this.questInfo = config.info;
    this.questRewards = config.rewards;
    this.questDifficulty = config.difficuty;
    this.questTime = config.time;
    this.questCost = config.cost;
    this.locationIndex = config.locationIndex;
    this.questCompleted = false;

    // CONFIGURACION

    this.on('pointerdown', (pointer) =>
    {
      this.scene.questMap.showQuestMap();
      this.scene.questUI.showQuestUI(this);
    }, this);

  }

  // Metodo que utilizamos para completar la mision y eliminarla.
  completeQuest ()
  {
    this.scene.questMap.questCompleted(this.locationIndex);
    this.questCompleted = true;
    this.destroyButton();
  }

}
