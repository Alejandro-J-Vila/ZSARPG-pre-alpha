import Building from "./building.js";
import Bullet from "../objects/bullet.js";

// Clase que representa una torreta defensiva que dispara a los enemigos.
export default class Turret extends Building
{
  static BUILDING_NAME = "Turret";
  static BUILDING_FILE = "turret-atlas";
  static BUILDING_BLUEPRINT = "turret-blueprint.png";
  static BUILDING_EXTERIOR = "turret-finished.png";
  static BUILDING_INTERIOR = "";
  static BUILDING_PRODUCTION = "";
  static BUILDING_DAMAGED = "turret-damaged.png";
  static BUILDING_PRODUCTION_DAMAGED = "";
  static BUILDING_DESTROYED = "turret-destroyed.png";
  static BUILDING_PRODUCTION_DESTROYED = "";
  static BUILDING_COST = 10;
  static BUILDING_DESCRIPTION = "This building shoots bullets to zombies in range.";
  static BUILDING_MAX_HEALTH = 1000;
  constructor (config)
  {
    var cf;
    if(config.level)
    {
      cf =
      {
        scene: config.scene,
        x: config.x,
        y: config.y,
        fileName: Turret.BUILDING_FILE,
        buildingName: Turret.BUILDING_NAME,
        buildingBlueprint: Turret.BUILDING_BLUEPRINT,
        buildingExterior: Turret.BUILDING_EXTERIOR,
        buildingInterior: Turret.BUILDING_INTERIOR,
        buildingProduction: Turret.BUILDING_PRODUCTION,
        buildingDamaged: Turret.BUILDING_DAMAGED,
        buildingProductionDamaged: Turret.BUILDING_PRODUCTION_DAMAGED,
        buildingDestroyed: Turret.BUILDING_DESTROYED,
        buildingProductionDestroyed: Turret.BUILDING_PRODUCTION_DESTROYED,
        buildingCost: config.buildingCost,
        health: config.health,
        maxHealth: config.maxHealth,
        level: config.level
      };
    }
    else
    {
      cf =
      {
        scene: config.scene,
        x: 0,
        y: 0,
        fileName: Turret.BUILDING_FILE,
        buildingName: Turret.BUILDING_NAME,
        buildingBlueprint: Turret.BUILDING_BLUEPRINT,
        buildingExterior: Turret.BUILDING_EXTERIOR,
        buildingInterior: Turret.BUILDING_INTERIOR,
        buildingProduction: Turret.BUILDING_PRODUCTION,
        buildingDamaged: Turret.BUILDING_DAMAGED,
        buildingProductionDamaged: Turret.BUILDING_PRODUCTION_DAMAGED,
        buildingDestroyed: Turret.BUILDING_DESTROYED,
        buildingProductionDestroyed: Turret.BUILDING_PRODUCTION_DESTROYED,
        buildingCost: Turret.BUILDING_COST,
        health: Turret.BUILDING_MAX_HEALTH,
        maxHealth: Turret.BUILDING_MAX_HEALTH,
        level: 1
      };
    }

    super(cf);

    // ATRIBUTOS

    this.damage; // Daño que inflinge la torreta.
    this.radius; // Valor del radio de ataque.
    this.attackRadius; // Radio de ataque de la torreta.
    this.shootTimer;
    this.recentlyFired;

    // INICIALIZACION

    if(config.level)
    {
      this.damage = config.damage;
      this.radius = config.radius;
    }
    else
    {
      this.damage = 10;
      this.radius = 200;
    }

    var center = this.getCenter();
    this.attackRadius = config.scene.add.circle(center.x, center.y, this.radius, 0xFF0000);
    this.shootTimer = config.scene.time.addEvent(
      {
        delay: 1000,
        //repeat:,
        loop: true,
        callback: () =>
        {
          this.recentlyFired = false;
        },
        callbackScope: this
        //args:,
        //timeScale:,
        //startAt:,
        //paused:,
      });

    // CONFIGURACION

  }

  shoot (turret, target)
  {
    if(!this.recentlyFired)
    {
      this.recentlyFired = true;
      var bullet = this.scene.bullets.get().setActive(true).setVisible(true);
      // Seteamos el daño del proyectil.
      bullet.damage = this.damage;
      // Seteamos la colision del proyectil con los elementos del mapa.
      bullet.setCollision(this.scene);
      // Disparamos el proyectil.
      bullet.fire(this, target, 0, false);
    }
  }

  place (buildings, player, move)
  {
    if(move)
    {
      this.attackRadius.body.setEnable(true);
    }
    else
    {
      this.attackRadius.setAlpha(0);
      this.scene.physics.world.enableBody(this.attackRadius, 0);
      this.attackRadius.body.setCircle(200, -100, -100);
      this.scene.physics.add.overlap(this.attackRadius, this.scene.enemyManager.enemies, this.shoot, null, this);
    }
    var center = this.getCenter();
    this.attackRadius.setPosition(center.x, center.y);
    super.place(buildings, player, move);
  }

  move ()
  {
    this.attackRadius.body.setEnable(false);
    super.move();
  }

  levelUp ()
  {
    this.damage += 5;
    this.radius += 50;
    this.attackRadius.destroy();
    var center = this.getCenter();
    this.attackRadius = this.scene.add.circle(center.x, center.y, this.radius, 0xFF0000);
    this.attackRadius.setAlpha(0);
    this.scene.physics.world.enableBody(this.attackRadius, 0);
    this.attackRadius.body.setCircle(this.radius, -(this.radius / 2), -(this.radius / 2));
    this.scene.physics.add.overlap(this.attackRadius, this.scene.enemyManager.enemies, this.shoot, null, this);
    super.levelUp();
  }

  repair ()
  {
    if(this.health === 0)
    {
      this.attackRadius.body.setEnable(true);
    }
    super.repair();
  }

  destroyed ()
  {
    this.attackRadius.body.setEnable(false);
  }
}
