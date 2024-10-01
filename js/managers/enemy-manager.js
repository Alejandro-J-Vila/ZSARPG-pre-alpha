import Zombie from "../characters/zombie.js";

// Clase que se encarga del manejo de los enemigos y su creacion.
export default class EnemyManager
{
  constructor (config)
  {
    // ATRIBUTOS

    this.scene; // Escena donde se crearan los enemigos.
    this.enemySpawn; // Punto de partida para los enemigos que agregamos en el mapa.
    this.enemies; // Grupo de enemigos de la escena.

    // INICIALIZACION

    this.scene = config.scene;
    this.enemySpawn = config.scene.map.getObjectLayer('enemies').objects;
    this.enemies = config.scene.add.group({ runChildUpdate: true });

    // CONFIGURACION

  }

  // Metodo que utilizamos para agregar los enemigos a la escena de comienzo.
  addStartEnemies ()
  {
    var enemyNumber = Phaser.Math.RND.integerInRange(5, 10);
    var enemy;
    var enemyMarker;
    for (var i = 0; i < enemyNumber; i++)
    {
      enemyMarker = Phaser.Math.RND.pick(this.enemySpawn);
      enemy = new Zombie(
        {
          scene: this.scene,
          x: enemyMarker.x,
          y: enemyMarker.y,
          spriteKey: "enemy",
        });
      this.enemies.add(enemy);
    }
  }

  addBuildingEnemies (buildingEnemies, buildingMarker)
  {
    var enemyNumber = Phaser.Math.RND.integerInRange(0, 1);
    if(enemyNumber === 0)
    {
      return;
    }
    var enemy;
    var enemyMarker;
    for (var i = 0; i < enemyNumber; i++)
    {
      enemyMarker = Phaser.Math.RND.pick(buildingEnemies);
      enemy = new Zombie(
        {
          scene: this.scene,
          x: buildingMarker.x + enemyMarker.x,
          y: buildingMarker.y + enemyMarker.y,
          spriteKey: "enemy",
        });
      this.enemies.add(enemy);
    }
  }

  // Metodo que utilizamos para agregar los enemigos a la escena de ciudad.
  addCityEnemies ()
  {
    // Dependiendo de la dificultad de la mision, la cantidad de enemigos es mayor o menor.
    var quantity = 10 * this.scene.quest.questDifficulty;
    for(var i = 0; i < quantity; i++)
    {
      var rz = Phaser.Math.RND.pick(this.enemySpawn);
      var enemy = new Zombie(
        {
          scene: this.scene,
          x: rz.x,
          y: rz.y,
          spriteKey: "enemy",
        });
      this.enemies.add(enemy);
    }
  }

  // Metodo que utilizamos para agregar los enemigos iniciales en la base.
  addStartBaseEnemies ()
  {
    var startEnemySpawn = this.scene.map.getObjectLayer('start-enemies').objects;
    startEnemySpawn.forEach((enemyMarker) =>
    {
      var enemy = new Zombie(
        {
          scene: this.scene,
          x: enemyMarker.x,
          y: enemyMarker.y,
          spriteKey: "enemy",
        });
      this.enemies.add(enemy);
    });
  }

  // Metodo que utilizamos para mandar una holeada de atacantes a la base.
  spawnHordeWave ()
  {
    this.enemySpawn.forEach((enemyMarker) =>
    {
      var enemy = new Zombie(
        {
          scene: this.scene,
          x: enemyMarker.x,
          y: enemyMarker.y,
          spriteKey: "enemy",
        });
      this.enemies.add(enemy);
    });
  }
}
