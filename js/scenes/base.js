import Player from "../characters/player.js";
import BuildingManager from "../managers/building-manager.js";
import LoadingScreen from "../ui/loading-screen.js";
import Bullet from "../objects/bullet.js";
import MeleeAttack from "../objects/melee.js";
import EnemyManager from "../managers/enemy-manager.js";

// Escena encargada de representar el refugio del jugador.
export default class BaseScene extends Phaser.Scene
{
  constructor ()
  {
    super("base");
  }

  preload ()
  {
    // Creamos las pantalla de carga.
    this.loadingScreen = new LoadingScreen(
      {
        scene: this,
        width: this.cameras.main.width,
        height: this.cameras.main.height,
        visible: true,
        background: "loading-screen"
      });

    // Actualizamos la pantalla de carga mientras dura la carga.
    this.load.on("progress", (value) =>
      {
        this.loadingScreen.loadingBar.increment(100 * value);
      });
  }

  create (save)
  {
    this.onQuest = false;
    this.startGame = false;
    this.hordeSpawned = false;
    this.baseUnderAttack = false;
    if(!save.player)
    {
      this.startGame = true;
      this.baseUnderAttack = true;
    }
    // Creamos el mapa.
    this.map = this.make.tilemap({ key: "base-map" });
    // Seteamos el tamaño del mundo para que sea igual al del mapa.
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    // Agregamos los tilesets al mapa mediante el nombre del archivo del tileset
    // y el nombre que le dimos al cargarlo en preload.
    const tileset = this.map.addTilesetImage("placeholders", "placeholders");
    // Agregamos las capas que definimos en el mapa indicando el nombre de la
    // capa, el tileset que utiliza y las coordenadas.
    this.levelFloor = this.map.createStaticLayer("floor", tileset, 0, 0);
    this.levelShadows = this.map.createDynamicLayer("shadows", tileset, 0, 0);
    this.levelShadows.setDepth(20);
    this.levelShadows.setAlpha(0);

    // Seteamos la escena de interfaz.
    this.UI = this.scene.get("ui");
    // Linkeamos la escena de interfaz con la escena de juego.
    this.UI.gameScene = this;

    this.bullets = this.physics.add.group({ classType: Bullet, defaultKey: "bullet", runChildUpdate: true });
    this.melee = this.physics.add.group({ classType: MeleeAttack, defaultKey: "melee", runChildUpdate: true });

    // Obtenemos el punto de partida para el jugador que agregamos en el mapa.
    var playerSpawn;
    if(this.startGame)
    {
      playerSpawn = this.map.findObject("player", obj => obj.name === "playerStart");
    }
    else
    {
      playerSpawn = this.map.findObject("player", obj => obj.name === "playerSpawn");
    }

    // Creamos el jugador usando la escena actual, y las cordenadas del punto de partida.
    this.player = new Player({ scene: this, x: playerSpawn.x, y: playerSpawn.y });

    // Creamos el manejador de edificios.
    this.buildingManager = new BuildingManager(
      {
        scene: this
      });


    // Seteamos el oyente de overlap sobre los tiles de limite de mapa para la construccion.
    this.levelFloor.setTileIndexCallback(4, () =>
    {
      if(this.buildingManager.buildMode)
      {
        this.buildingManager.checkBuildingPlacement("ok");
      }
    }, this);


    // Obtenemos el punto de ubicacion para el edificio principal que agregamos en el mapa.
    const mainBuildingLocation = this.map.findObject("buildings", obj => obj.name === "mainBuilding");
    // Creamos el edificio principal.
    this.buildingManager.createMainBuilding(
      {
        scene: this,
        x: mainBuildingLocation.x,
        y: mainBuildingLocation.y
      });

    // Creamos el manejador de enemigos.
    this.enemyManager = new EnemyManager(
      {
        scene: this
      });

    if(this.startGame)
    {
      this.enemyManager.addStartBaseEnemies();
    }

    // Creamos la camara principal.
    const camera = this.cameras.main;
    // Seteamos la camara para que siga al jugador.
    camera.startFollow(this.player.sprite);
    // Hacemos esto para evitar tile bleed
    camera.roundPixels = true;

    if(save.resources)
    {
      this.food = save.resources.food;
      this.materials = save.resources.materials;
      this.gas = save.resources.gas;
      this.cropWaste = save.resources.cropWaste;
      this.seeds = save.resources.seeds;
    }
    else
    {
      this.food = 0;
      this.materials = 0;
      this.gas = 0;
      this.cropWaste = 0;
      this.seeds = 0;
    }

    this.events.on('transitioncomplete', () =>
      {
        this.UI.gameScene = this;
        if(this.onQuest)
        {
          this.onQuest = false;
          this.UI.questUI.currentQuest.completeQuest();
          this.UI.questMap.addQuests();
        }
        this.UI.dayTimeManager.dayTime.paused = true;
        this.UI.dayTimeManager.dayNightCicle();
        this.UI.showLoadingScreen(false);
        if(this.startGame)
        {
          this.UI.outOfBase(true);
        }
        else
        {
          this.UI.dayTimeManager.setVisible(true);
        }
      });

  }

  update (time, delta)
  {
    if(this.onQuest)
    {
      return;
    }
    if(this.startGame)
    {
      if(this.enemyManager.enemies.getLength() === 0)
      {
        this.startGame = false;
        this.baseUnderAttack = false;
        this.UI.dayTimeManager.setVisible(true);
        this.UI.outOfBase(false);
      }
    }
    if(this.UI.dayTimeManager.nextHorde === 0)
    {
      if(!this.hordeSpawned)
      {
        this.enemyManager.spawnHordeWave();
        this.hordeSpawned = true;
        this.baseUnderAttack = true;
        this.UI.dayTimeManager.setVisible(false);
        this.UI.outOfBase(true);
      }
      if(this.enemyManager.enemies.getLength() === 0)
      {
        this.baseUnderAttack = false;
        this.UI.dayTimeManager.setVisible(true);
        this.UI.outOfBase(false);
        this.UI.dayTimeManager.endDay();
        this.hordeSpawned = false;
        this.UI.saveManager.saveGame(this.UI.characterSheet.name);
      }
    }
    if(this.UI.playerDeath)
    {
      return;
    }
    this.player.update(time, delta);
    this.buildingManager.adjustBuildingPosition(this.input.activePointer);
  }

  startMission ()
  {
    this.onQuest = true;
    this.UI.showLoadingScreen(true);
    this.scene.transition(
      {
        target: "city",
        sleep: true,
        onUpdate: this.UI.loadingCallback,
        onUpdateScope: this.UI
      });
  }
}
