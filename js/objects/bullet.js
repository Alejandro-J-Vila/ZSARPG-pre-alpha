// Clase que representa los proyectiles que disparan las armas.
export default class Bullet extends Phaser.GameObjects.Image
{
  constructor (scene, x, y, key)
  {
    // Llamada al constructor de la clase base Image.
    super(scene, x, y, key);

    // ATRIBUTOS

    this.scene; // Escena del juego.
    this.bornTime; // Tiempo de vida.
    this.dieTime; // Maximo tiempo de vida.
    this.speed; // Velocidad.
    this.damage; // Daño.

    // INICIALIZACION

    this.scene = scene;
    this.bornTime = 0;
    this.dieTime = 1800;
    this.speed = 900;
    this.damage = 0;

    // CONFIGURACION

    // Seteamos el tamaño del cuerpo.
    this.setSize(9, 9);
    // Agregamos el objeto a la escena.
    scene.add.existing(this);
  }

  // Llevamos registro del tiempo que pasa desde que se crea la bala (bornTime)
  // para destruirla cuando llega al maximo (dieTime).
  update (time, delta)
  {
    this.bornTime += delta;
    if (this.bornTime > this.dieTime)
    {
      this.setActive(false);
      this.setVisible(false);
      this.destroy();
    }
  }

  // Dispara una bala desde un origen a un destino con un offset.
  fire (shooter, target, offset, pointer)
  {
    var sC = shooter.getCenter();
    this.setPosition(sC.x, sC.y);
    if(pointer)
    {
      this.scene.physics.moveTo(this, target.worldX + offset, target.worldY + offset, this.speed);
    }
    else
    {
      this.scene.physics.moveTo(this, target.x + offset, target.y + offset, this.speed);
    }
  }

  // Callback que llamamos cuando un proyectil pega en una pared.
  wallHit (bullet, wall)
  {
    bullet.setVisible(false);
    bullet.setActive(false);
    bullet.destroy();
  }

  // Callback que llamamos cuando un proyectil pega en un enemigo.
  enemyHit (bullet, enemy)
  {
    bullet.setVisible(false);
    bullet.setActive(false);
    bullet.destroy();
    enemy.getHit(bullet.damage);
  }

  // Metodo que utilizamos para setear la colision del proyectil dependiendo de la escena actual.
  setCollision ()
  {
    if((this.scene.scene.key === "start") | (this.scene.scene.key === "city"))
    {
      for(var i = 0; i < 9; i++)
      {
        this.scene.physics.add.collider(this, this.scene.frontWalls[i], this.wallHit, null, this);
        this.scene.physics.add.collider(this, this.scene.sideWalls[i], this.wallHit, null, this);
        this.scene.physics.add.collider(this, this.scene.backRoomWalls[i], this.wallHit, null, this);
        this.scene.physics.add.collider(this, this.scene.middleRoomWalls[i], this.wallHit, null, this);
      }
    }
    this.scene.physics.add.collider(this, this.scene.enemyManager.enemies, this.enemyHit, null, this);
  }
}
