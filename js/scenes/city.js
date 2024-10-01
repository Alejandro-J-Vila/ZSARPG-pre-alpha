import Player from "../characters/player.js";
import Chest from "../objects/chest.js";
import Bullet from "../objects/bullet.js";
import MeleeAttack from "../objects/melee.js";
import EnemyManager from "../managers/enemy-manager.js";

export default class CityScene extends Phaser.Scene
{
  constructor ()
  {
    super("city");
  }

  preload ()
  {

  }

  create ()
  {
    this.hasPlayerReachedEnd = false;
    // Creamos el mapa.
    this.map = this.make.tilemap({ key: "city-map" });
    // Seteamos el tamaño del mundo para que sea igual al del mapa.
    this.physics.world.setBounds(448, 448, 2176, 2176);
    // Agregamos los tilesets al mapa mediante el nombre del archivo del tileset
    // y el nombre que le dimos al cargarlo en preload.
    var wallTileset = this.map.addTilesetImage("wall-atlas", "wall-atlas");
    var roofTileset = this.map.addTilesetImage("roof-atlas", "roof-atlas");
    var floorTileset = this.map.addTilesetImage("floor-atlas", "floor-atlas");
    var doorTileset = this.map.addTilesetImage("door-atlas", "door-atlas");
    var windowTileset = this.map.addTilesetImage("window-atlas", "window-atlas");
    // Agregamos las capas que definimos en el mapa indicando el nombre de la
    // capa, el tileset que utiliza y las coordenadas.
    this.levelFloor = this.map.createStaticLayer("floor", floorTileset, 0, 0);
    this.levelShadows = this.map.createDynamicLayer("shadows", floorTileset, 0, 0);
    this.levelShadows.setDepth(20);
    //this.levelShadows.setAlpha(0);

    this.UI = this.scene.get("ui");
    this.UI.gameScene = this;
    this.quest = this.UI.questUI.currentQuest;
    
    this.UI.dayTimeManager.dayTime.paused = false;
    this.UI.dayTimeManager.dayNightCicle();

    this.bullets = this.physics.add.group({ classType: Bullet, defaultKey: "bullet", runChildUpdate: true });
    this.melee = this.physics.add.group({ classType: MeleeAttack, defaultKey: "melee", runChildUpdate: true });

    var ps = Phaser.Math.RND.integerInRange(1, 4);
    // Obtenemos el punto de partida para el jugador que agregamos en el mapa.
    const playerSpawn = this.map.findObject("player", obj => obj.name === "playerSpawn" + ps);
    // Creamos el jugador usando la escena actual, y las cordenadas del punto de partida.
    this.player = new Player({ scene: this, x: playerSpawn.x, y: playerSpawn.y });

    // Creamos el manejador de enemigos.
    this.enemyManager = new EnemyManager(
      {
        scene: this
      });
    this.enemyManager.addCityEnemies();

    // Creamos un grupo para contener todos los cofres del mapa.
    this.chests = this.add.group();
    // Agregamos todos los cofres al mapa.
    // Dependiendo del tipo de mision, seran los cofres que habra en el mapa.
    this.addChests(this.map, this.quest.questDifficulty, this.quest.questRewards);

    // Obtenemos la capa de edificios del mapa y guardamos todos los marcadores que contiene.
    const buildingLocations = this.map.getObjectLayer("buildings").objects;
    // Arreglos para contener las capas de cada edificio que necesiten colisiones y/o overlap.
    this.frontWalls = [];
    this.sideWalls = [];
    this.backRoomWalls = [];
    this.middleRoomWalls = [];
    this.roofs = [];
    this.doors = [];
    this.markers = [];
    // Creamos todos los edificios del mapa.
    this.addBuildings(wallTileset, roofTileset, floorTileset, doorTileset, windowTileset, buildingLocations);

    // Seteamos la colision del jugador con el grupos de cofres.
    this.physics.add.collider(this.player.sprite, this.chests);

    //this.physics.add.collider(this.player.sprite, this.zombies);
    // Si hay mas edificios en el mapa hay que cambiar el 9, por la cantidad.
    // Por ahora va a ser siempre 9.
    for(var i = 0; i < 9; i++)
    {
      // Seteamos la colision y overlap del jugador con la capa correspondiente del mapa.
      this.physics.add.collider(this.player.sprite, this.frontWalls[i]);
      this.physics.add.collider(this.player.sprite, this.sideWalls[i]);
      this.physics.add.collider(this.player.sprite, this.backRoomWalls[i]);
      this.physics.add.collider(this.player.sprite, this.middleRoomWalls[i]);
      this.physics.add.overlap(this.player.sprite, this.roofs[i]);
      this.physics.add.overlap(this.player.sprite, this.doors[i]);
      this.physics.add.overlap(this.player.sprite, this.markers[i]);
      this.physics.add.collider(this.enemyManager.enemies, this.frontWalls[i]);
      this.physics.add.collider(this.enemyManager.enemies, this.sideWalls[i]);
      this.physics.add.collider(this.enemyManager.enemies, this.backRoomWalls[i]);
      this.physics.add.collider(this.enemyManager.enemies, this.middleRoomWalls[i]);
    }

    // Obtenemos el punto de salida de la escena que agregamos en el mapa.
    const levelEnd = this.map.findObject("player", obj => obj.name === "levelEnd" + ps);
    // Creamos la zona de salida tomando la posicion y tamaño del punto de salida creado.
    const sceneExit = this.add.zone(levelEnd.x + 30, levelEnd.y + 30, 128, 128);
    // Seteamos la colision con la zona de final de nivel.
    this.physics.world.enableBody(sceneExit, 0);
    this.physics.add.overlap(this.player.sprite, sceneExit, this.endLevel, null, this);

    // Creamos la camara principal.
    const camera = this.cameras.main;
    // Seteamos la camara para que siga al jugador.
    camera.startFollow(this.player.sprite);
    // Hacemos esto para evitar tile bleed
    camera.roundPixels = true;
    // Limitamos la camara a los bordes del mapa.
    //camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.events.on('transitioncomplete', () =>
      {
        this.UI.showLoadingScreen(false);
        this.UI.outOfBase(true);
      });

  }

  update (time, delta)
  {
    if((this.UI.playerDeath) | (this.hasPlayerReachedEnd))
    {
      return;
    }
    this.player.update(time, delta);
  }

  // Metodo que ejecutamos cuando el jugador colisiona con la zona de final de nivel.
  endLevel ()
  {
    this.hasPlayerReachedEnd = true;
    this.UI.showLoadingScreen(true);

    var mapZombies = this.enemyManager.enemies.getChildren();
    mapZombies.forEach((zombie) =>
    {
      zombie.die(false);
    });

    var mapChests = this.chests.getChildren();
    mapChests.forEach((chest) =>
    {
      chest.destroyChest();
    });

    this.scene.transition(
      {
        target: "base",
        onUpdate: this.UI.loadingCallback,
        onUpdateScope: this.UI
      });
  }

  // Metodo que utilizamos para procesar los mapas individuales de edificios y crear las capas necesarias
  addBuildings (wallTileset, roofTileset, floorTileset, doorTileset, windowTileset, buildingLocations)
  {
    var layerIndex = 0;
    // Por cada marcador obtenido, creamos el edificio correspondiente.
    buildingLocations.forEach((buildingMarker) =>
    {
      var buildingType = this.getBuildingType();

      var building = this.make.tilemap({ key: buildingType });

      var markerLayer = building.createStaticLayer("marker", floorTileset, buildingMarker.x, buildingMarker.y);

      var floorType = this.getFloorType();
      var floorLayer = building.createStaticLayer("floor-" + floorType, floorTileset, buildingMarker.x, buildingMarker.y);

      var backRoomType = this.getBackRoomType();
      var middleRoomType = this.getMiddleRoomType();
      var roomsWithChests = this.roomsWithChests();
      this.loadChests(roomsWithChests, building, buildingMarker, backRoomType, middleRoomType);

      var buildingEnemies = building.getObjectLayer("building-enemies").objects;
      this.enemyManager.addBuildingEnemies(buildingEnemies, buildingMarker);

      var frontWallType = this.getFrontWallType();
      var frontWallLayer = building.createStaticLayer("interior-front-wall-" + frontWallType, wallTileset, buildingMarker.x, buildingMarker.y);

      var sideWallLayer = building.createStaticLayer("interior-side-wall", wallTileset, buildingMarker.x, buildingMarker.y);

      var backRoomSubType = this.getBackRoomSubType(backRoomType);
      var backRoomLayer = building.createStaticLayer("back-room-" + backRoomType + "-" + backRoomSubType, wallTileset, buildingMarker.x, buildingMarker.y);

      var middleRoomSubType = this.getMiddleRoomSubType(middleRoomType);
      var middleRoomLayer = building.createStaticLayer("middle-room-" + middleRoomType + "-" + middleRoomSubType, wallTileset, buildingMarker.x, buildingMarker.y);

      var exteriorWallLayer = building.createDynamicLayer("exterior-wall", wallTileset, buildingMarker.x, buildingMarker.y);

      var doorType = this.getDoorType(frontWallType);
      var doorLayer = building.createDynamicLayer("door-" + frontWallType + "-" + doorType, doorTileset, buildingMarker.x, buildingMarker.y);

      var windowType = this.getWindowType(frontWallType, doorType);
      var windowLayer = building.createDynamicLayer("window-" + frontWallType + "-" + windowType, windowTileset, buildingMarker.x, buildingMarker.y);

      var roofType = this.getRoofType();
      var inferiorRoofLayer = building.createDynamicLayer("inferior-roof-" + roofType, roofTileset, buildingMarker.x, buildingMarker.y);
      var superiorRoofLayer = building.createDynamicLayer("superior-roof-" + roofType, roofTileset, buildingMarker.x, buildingMarker.y);

      // Le damos una profundidad mayor a la capa de los techos de manera que se renderice
      // por encima de las demas capas, y que aparezca por encima del jugador.
      inferiorRoofLayer.setDepth(3);
      superiorRoofLayer.setDepth(3);
      // Le damos una profundidad menor a la capa de exterior de manera que se renderice
      // por debajo de las demas capas, y que aparezca por debajo del jugador.
      exteriorWallLayer.setDepth(1);
      doorLayer.setDepth(1);
      windowLayer.setDepth(1);
      // Activamos la colision con la capa del mapa usando la propiedad "collision"
      // que definimos en el mismo.
      frontWallLayer.setCollisionByProperty({ collision: true });
      sideWallLayer.setCollisionByProperty({ collision: true });
      backRoomLayer.setCollisionByProperty({ collision: true });
      middleRoomLayer.setCollisionByProperty({ collision: true });
      // Seteamos oyente de overlap con el tile de la puerta para hacer invisible la parte superior del
      // edificio cuando el jugador entra.
      var doorIndexes = [190, 191, 192, 193, 198, 199, 200, 201, 206, 207, 208, 209, 214, 215, 216, 217, 222, 223, 224, 225, 230, 231, 232, 233];
      doorLayer.setTileIndexCallback(doorIndexes, () =>
      {
        exteriorWallLayer.setAlpha(0);
        doorLayer.setAlpha(0);
        windowLayer.setAlpha(0);
        superiorRoofLayer.setAlpha(0);
        inferiorRoofLayer.setAlpha(0);
      }, this);
      // Seteamos oyente de overlap con un tile especial para volver a hacer visible la parte superior del
      // edificio cuando el jugador sale ademas de devolver la opacidad completa al techo
      // cuando el jugador no esta debajo del mismo.
      markerLayer.setTileIndexCallback(188, () =>
      {
        exteriorWallLayer.setAlpha(1);
        doorLayer.setAlpha(1);
        windowLayer.setAlpha(1);
        superiorRoofLayer.setAlpha(1);
        inferiorRoofLayer.setAlpha(1);
      }, this);
      // Seteamos oyente de overlap con el tile del techo para hacerlo translucido cuando el jugador
      // pasa por debajo.
      var roofIndexes = [73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 113, 115, 116, 117, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144];
      superiorRoofLayer.setTileIndexCallback(roofIndexes, () =>
      {
        superiorRoofLayer.setAlpha(0.5);
      }, this);
      // Almacenamos las capas del edificio para luego setear colisiones y overlap.
      this.frontWalls[layerIndex] = frontWallLayer;
      this.sideWalls[layerIndex] = sideWallLayer;
      this.backRoomWalls[layerIndex] = backRoomLayer;
      this.middleRoomWalls[layerIndex] = middleRoomLayer;
      this.roofs[layerIndex] = superiorRoofLayer;
      this.doors[layerIndex] = doorLayer;
      this.markers[layerIndex] = markerLayer;
      // Incrementamos el indice de arreglos de capas.
      layerIndex++;
    });

  }

  // Metodo que usamos para obtener los cofres registrados en el mapa, crear las entidades
  // correspondientes y luego agregarlos a la escena.
  addChests (map, difficulty, type)
  {
    // Obtenemos la capa de objetos declarada en el mapa y guardamos todos los marcadores.
    var mapChests = map.getObjectLayer("chests").objects;
    var chest;
    // Por cada marcador obtenido, creamos un objeto cofre y lo agregamos a la escena en un grupo
    // que contiene todos los cofres.
    mapChests.forEach((chestMarker) =>
    {
      var typeRandom = Phaser.Math.RND.integerInRange(1, 10);
      var t = type;
      if(typeRandom <= 3)
      {
        t = "random";
      }
      chest = new Chest(
        {
          scene: this,
          x: chestMarker.x,
          y: chestMarker.y,
          spriteKey: "chest-atlas",
          difficulty: difficulty,
          type: t
        });
      this.chests.add(chest);
    });
  }

  roomsWithChests ()
  {
    var rwc;
    var r = Phaser.Math.RND.integerInRange(1, 10);
    if(r <= 3)
    {
      rwc = 0;
    }
    if((r === 4) | (r === 5) | (r === 6) | (r === 7))
    {
      rwc = 1;
    }
    if((r === 8) | (r === 9))
    {
      rwc = 2;
    }
    if(r === 10)
    {
      rwc = 3;
    }
    return rwc;
  }

  loadChests (roomsWithChests, building, buildingMarker, backRoomType, middleRoomType)
  {
    if(roomsWithChests === 0)
    {
      return;
    }
    var room = Phaser.Math.RND.integerInRange(1, 3);
    var backRoomChests = building.getObjectLayer("back-room-chest-" + backRoomType).objects;
    var middleRoomChests = building.getObjectLayer("middle-room-chest-" + middleRoomType).objects;
    var frontRoomChests = building.getObjectLayer("front-room-chest").objects;
    if(roomsWithChests === 1)
    {
      if(room === 1)
      {
        this.addBuildingChests(frontRoomChests, buildingMarker);
      }
      if(room === 2)
      {
        this.addBuildingChests(middleRoomChests, buildingMarker);
      }
      if(room === 3)
      {
        this.addBuildingChests(backRoomChests, buildingMarker);
      }
    }
    if(roomsWithChests === 2)
    {
      if(room === 1)
      {
        this.addBuildingChests(middleRoomChests, buildingMarker);
        this.addBuildingChests(backRoomChests, buildingMarker);
      }
      if(room === 2)
      {
        this.addBuildingChests(frontRoomChests, buildingMarker);
        this.addBuildingChests(backRoomChests, buildingMarker);
      }
      if(room === 3)
      {
        this.addBuildingChests(frontRoomChests, buildingMarker);
        this.addBuildingChests(middleRoomChests, buildingMarker);
      }
    }
    if(roomsWithChests === 3)
    {
      this.addBuildingChests(frontRoomChests, buildingMarker);
      this.addBuildingChests(middleRoomChests, buildingMarker);
      this.addBuildingChests(backRoomChests, buildingMarker);
    }
  }

  addBuildingChests (chestMarkers, buildingPosition)
  {
    var cm = Phaser.Math.RND.pick(chestMarkers);
    var typeRandom = Phaser.Math.RND.integerInRange(1, 10);
    var t = this.quest.questRewards;
    if(typeRandom <= 3)
    {
      t = "random";
    }
    var chest = new Chest(
      {
        scene: this,
        x: buildingPosition.x + cm.x,
        y: buildingPosition.y + cm.y,
        spriteKey: "chest-atlas",
        difficulty: this.quest.questDifficulty,
        type: t
      });
    this.chests.add(chest);
  }

  getBuildingType ()
  {
    var bt = "brick-building";
    return bt;
  }

  getFloorType ()
  {
    var ft = Phaser.Math.RND.integerInRange(1, 2);
    return ft;
  }

  getBackRoomType ()
  {
    var brt = Phaser.Math.RND.integerInRange(1, 3);
    return brt;
  }

  getBackRoomSubType (backRoomType)
  {
    var brst;
    if((backRoomType === 1) | (backRoomType === 3))
    {
      brst = Phaser.Math.RND.integerInRange(1, 3);
    }
    else
    {
      brst = Phaser.Math.RND.integerInRange(1, 4);
    }
    return brst;
  }

  getMiddleRoomType ()
  {
    var mrt = Phaser.Math.RND.integerInRange(1, 3);
    return mrt;
  }

  getMiddleRoomSubType (middleRoomType)
  {
    var mrst;
    if((middleRoomType === 1) | (middleRoomType === 3))
    {
      mrst = Phaser.Math.RND.integerInRange(1, 3);
    }
    else
    {
      mrst = Phaser.Math.RND.integerInRange(1, 4);
    }
    return mrst;
  }

  getFrontWallType ()
  {
    var fwt = Phaser.Math.RND.integerInRange(1, 8);
    return fwt;
  }

  getDoorType (frontWallType)
  {
    var dt;
    if(frontWallType === 8)
    {
      dt = Phaser.Math.RND.integerInRange(1, 12);
    }
    else
    {
      dt = Phaser.Math.RND.integerInRange(1, 6);
    }
    return dt;
  }

  getWindowType (frontWallType, doorType)
  {
    var wt;
    if(frontWallType === 8)
    {
      if((doorType === 1) | (doorType === 2) | (doorType === 3) | (doorType === 4))
      {
        wt = Phaser.Math.RND.integerInRange(1, 4);
      }
      if((doorType === 5) | (doorType === 6) | (doorType === 7) | (doorType === 8))
      {
        wt = Phaser.Math.RND.integerInRange(5, 8);
      }
      if((doorType === 9) | (doorType === 10))
      {
        wt = Phaser.Math.RND.integerInRange(9, 10);
      }
      if((doorType === 11) | (doorType === 12))
      {
        wt = Phaser.Math.RND.integerInRange(11, 12);
      }
    }
    else
    {
      wt = Phaser.Math.RND.integerInRange(1, 6);
    }
    return wt;
  }

  getRoofType ()
  {
    var rt = Phaser.Math.RND.integerInRange(1, 6);
    return rt;
  }

}
