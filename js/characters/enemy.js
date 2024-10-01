export default class Enemy extends Phaser.GameObjects.Sprite
{
  constructor (config)
  {
    // Llamamos al constructor de la clase Sprite para que inicialice el mismo.
    super(config.scene, config.x, config.y, config.spriteKey);

    //ATRIBUTOS

    this.scene; // Escena donde se ubica el enemigo.
    this.player; // Jugador.
    this.moveSpeed; // Velocidad de movimiento.
    this.maxMoveSpeed; // Velocidad de movimiento maxima.
    this.moveDirection; // Direccion de movimiento.
    this.moveTimer; // Timer de toma de decisiones de movimiento.
    this.aggroRadius; // Zona de amenaza para detectar al jugador.
    this.attackRadius; // Zona de deteccion para atacar al jugador.
    this.isChasing; // Flag de persecusion.
    this.isAttacking; // Flag de ataque al jugador.
    this.isAttackingBuilding; // Flag de ataque a edificios.
    this.berserker;
    this.building; // Edificio actualmente atacado.
    this.attackDistance; // Distancia de ataque.
    this.stopChaseDistance; // Distancia para dejar de perseguir.
    this.maxHealth; // Salud maxima del enemigo.
    this.health; // Salud actual del enemigo.
    this.damage; // Daño que inflinge el enemigo.
    this.xp; // Experiencia que otorga al morir.

    //INICIALIZACION

    this.scene = config.scene;
    this.player = config.scene.player;
    this.moveSpeed = 20;
    this.maxMoveSpeed = 80;
    this.moveDirection = 5;
    this.moveTimer = config.scene.time.addEvent(
      {
        delay: 2000,
        callback: this.changeDirection,
        //args: [],
        callbackScope: this,
        loop: true
      });
    var center = this.getCenter();
    this.aggroRadius = config.scene.add.circle(center.x, center.y, 200, 0xFFFF00);
    this.attackRadius = config.scene.add.circle(center.x, center.y, 32, 0xFF0000);
    this.isChasing = false;
    this.isAttacking = false;
    this.isAttackingBuilding = false;
    this.berserker = false;
    this.attackDistance = 50;
    this.stopChaseDistance = 500;
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.damage = 10;
    this.xp = 500;
    this.attackSpeed = 1000;
    this.lastAttack = 1000;

    // CONFIGURACION

    // Habilitamos el cuerpo del sprite y lo agregamos a la escena.
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    // Si la imagen tiene espacios en blanco se puede ajustar el tamaño y el offset.
    //this.body.setSize(32, 32)
    //this.body.setOffset(0, 16);

    // Si estamos en la base, seteamos la colision con los edificios.
    if(config.scene.scene.key === "base")
    {
      config.scene.physics.add.collider(this, config.scene.buildingManager.buildings, this.startAttackingBuilding, null, this);
    }

    // Seteamos la colision del enemigo con los bordes del mapa.
    this.body.setCollideWorldBounds(true);

    // Seteamos la colision del enemigo con el jugador.
    //this.scene.physics.add.overlap(this, this.player.sprite, this.startAttack, null, this);

    // Seteamos la colision del enemigo con el resto de los enemigos.
    config.scene.physics.add.collider(this, this.scene.enemyManager.enemies);

    // Seteamos la zona de amenaza.
    this.aggroRadius.setAlpha(0);
    config.scene.physics.world.enableBody(this.aggroRadius, 0);
    this.aggroRadius.body.setCircle(200, -100, -100);
    config.scene.physics.add.overlap(this.player.sprite, this.aggroRadius, this.startChase, null, this);

    // Seteamos la zona de ataque.
    this.attackRadius.setAlpha(0);
    config.scene.physics.world.enableBody(this.attackRadius, 0);
    this.attackRadius.body.setCircle(32, -16, -16);
    config.scene.physics.add.overlap(this.player.sprite, this.attackRadius, this.startAttack, null, this);

    // Seteamos la propiedad de interactuable para poder aplicar efectos con el mouse.
    this.setInteractive();

    // Seteamos oyente para el evento de mouse over.
    this.on('pointerover', (pointer) =>
    {
      this.setTint(0xff0000);
      //var d = Phaser.Math.RoundTo(this.player.getDistanceTo(this.body.center));
      config.scene.UI.barManager.setTargetHealth(this.name, this.health, this.maxHealth, true);
    });

    // Seteamos oyente para el evento de mouse off.
    this.on('pointerout', (pointer) =>
    {
      this.clearTint();
      config.scene.UI.barManager.setTargetHealth("", 0, 0, false);
    });
  }

  update (time, delta)
  {
    if(!this.isAlive())
    {
      // Si la salud llego a cero, no hacemos nada.
      return;
    }
    if(this.scene.scene.key === "base")
    {
      // Si estamos en la base...
      if(!this.scene.startGame)
      {
        // y no es el comienzo del juego, activamos el modo asalto.
        this.assault();
      }
    }
    // Efectuamos la accion correspondiente segun el estado actual.
    this.attackBuilding(delta);
    this.attack(delta);
    this.nigthmare();
    this.chase();
    this.wander();
    // Actualizamos la posicion de las zonas de amenaza y ataque.
    var center = this.getCenter();
    this.aggroRadius.setPosition(center.x, center.y);
    this.attackRadius.setPosition(center.x, center.y);
  }

  // Metodo que utilizamos cuando el enemigo recibe daño.
  getHit (damage)
  {
    // Si el enemigo recibe un golpe y no esta atacando ni persiguiendo al jugador...
    if((!this.isAttacking) & (!this.isChasing) & (!this.isAttackingBuilding))
    {
      // Comienza a perseguirlo.
      this.startChase();
    }
    // Restamos el daño a la salud.
    this.health -= damage;
    // Actualizamos la barra de salud del enemigo.
    this.scene.UI.barManager.damageTargetHealth(damage);
    if(!this.isAlive())
    {
      // Si la salud llega a 0, actualizamos la barra de salud.
      this.scene.UI.barManager.setTargetHealth("", 0, 0, false);
      // Matamos el enemigo.
      this.die(true);
    }
  }

  // Metodo que usamos para eliminar al enemigo.
  die (killed)
  {
    if(killed)
    {
      // Otorgamos experiencia al jugador.
      this.player.increaseXP(this.xp);
    }
    this.health = 0;
    // Eliminamos el timer de movimiento.
    this.moveTimer.destroy();
    // Eliminamos las zonas de ataque y amenaza.
    this.aggroRadius.destroy();
    this.attackRadius.destroy();
    // Destruimos el enemigo.
    this.destroy();
  }

  // Metodo que utilizamos cuando el enemigo colisiona con un edificio de la base.
  startAttackingBuilding (enemy, building)
  {
    if(!this.isAlive())
    {
      // Si la salud llego a cero, no hacemos nada.
      return;
    }
    this.isAttackingBuilding = true;
    this.isAttacking = false;
    this.isChasing = false;
    this.body.stop();
    this.building = building;
  }

  // Metodo que utilizamos para atacar un edificio de la base.
  attackBuilding (delta)
  {
    if(!this.isAlive())
    {
      // Si la salud llego a cero, no hacemos nada.
      return;
    }
    if(this.isAttackingBuilding)
    {
      // Mientras el edificio tenga salud, lo atacamos.
      if(this.building.health > 0)
      {
        this.lastAttack += delta;
        // Sino, lo atacamos.
        if(this.lastAttack > this.attackSpeed)
        {
          this.building.getHit(this.damage);
          if(this.building.buildingName === "Barricade")
          {
            this.getHit(this.building.damage);
          }
          this.lastAttack = 0;
        }
      }
      else
      {
        this.isAttackingBuilding = false;
      }
    }
  }

  // Metodo que utilizamos para setear el modo asalto.
  assault ()
  {
    if(!this.isAlive())
    {
      // Si la salud llego a cero, no hacemos nada.
      return;
    }
    // No hay distancia para dejar de perseguir.
    this.stopChaseDistance = 500000;
    // Seteamos el flag de persecusion.
    this.isChasing = true;
  }

  // Metodo que utilizamos cuando el enemigo alcanza al jugador.
  startAttack ()
  {
    if(!this.isAlive())
    {
      // Si la salud llego a cero, no hacemos nada.
      return;
    }
    this.isAttacking = true;
    this.isAttackingBuilding = false;
    this.isChasing = false;
    this.aggroRadius.body.setEnable(false);
    this.body.stop();
  }

  // Metodo que utilizamos para atacar al jugador.
  attack (delta)
  {
    if(!this.isAlive())
    {
      // Si la salud llego a cero, no hacemos nada.
      return;
    }
    // Si estamos atacando al jugador...
    if (this.isAttacking)
    {
      // Obtenemos la distancia al jugador.
      var d = this.player.getDistanceTo(this.attackRadius.body.center);
      if(d > this.attackDistance)
      {
        // Si se aleja, dejamos de atacarlo y comenzamos a perseguirlo.
        this.startChase();
      }
      else
      {
        this.lastAttack += delta;
        // Sino, lo atacamos.
        if(this.lastAttack > this.attackSpeed)
        {
          this.player.getHit(this.damage);
          this.lastAttack = 0;
        }
      }
    }
  }

  // Metodo que utilizamos cuando el enemigo detecta al jugador.
  startChase ()
  {
    if(!this.isAlive())
    {
      // Si la salud llego a cero, no hacemos nada.
      return;
    }
    this.isAttacking = false;
    this.isChasing = true;
    this.aggroRadius.body.setEnable(true);
  }

  // Metodo que utilizamos para perseguir al jugador.
  chase ()
  {
    if(!this.isAlive())
    {
      // Si la salud llego a cero, no hacemos nada.
      return;
    }
    // Si estamos persiguiendo al jugador...
    if(this.isChasing)
    {
      // Obtenemos la distancia al jugador.
      var d = this.player.getDistanceTo(this.aggroRadius.body.center);
      if(d > this.stopChaseDistance)
      {
        // Si se aleja demasiado, dejamos de perseguirlo.
        this.isChasing = false;
      }
      else
      {
        // Sino, lo perseguimos.
        this.scene.physics.moveToObject(this, this.player.sprite, this.maxMoveSpeed);
      }
    }
  }

  // Metodo que utilizamos para que el enemigo vague por el mapa.
  wander ()
  {
    if(!this.isAlive())
    {
      // Si la salud llego a cero, no hacemos nada.
      return;
    }
    // Si no estamos persiguiendo, atacando o destruyendo, vagamos por el mapa.
    if((!this.isAttacking) & (!this.isChasing) & (!this.isAttackingBuilding))
    {
      const prevVelocity = this.body.velocity.clone();
      // Detenemos el movimiento del frame anterior.
      this.body.stop();
      // Movimiento arriba.
      if (this.moveDirection === 1)
      {
        this.body.setVelocityY(-this.moveSpeed);
        //this.anims.play("zombie-back-walk", true);
      }
      // Movimiento abajo.
      else if (this.moveDirection === 2)
      {
        this.body.setVelocityY(this.moveSpeed);
        //this.anims.play("zombie-front-walk", true);
      }
      // Movimiento izquierda.
      else if (this.moveDirection === 3)
      {
        this.body.setVelocityX(-this.moveSpeed);
        //this.anims.play("zombie-left-walk", true);
      }
      // Movimiento derecha.
      else if (this.moveDirection === 4)
      {
        this.body.setVelocityX(this.moveSpeed);
        //this.anims.play("zombie-right-walk", true);
      }
      else if (this.moveDirection === 5)
      {
        /*
        //this.anims.stop();
        // Cuando el enemigo no se mueve elegimos un frame para quedar parados.
        if (prevVelocity.x < 0)
        {
          this.setTexture("atlas2", "misa-left");
        }
        else if (prevVelocity.x > 0)
        {
          this.setTexture("atlas2", "misa-right");
        }
        else if (prevVelocity.y < 0)
        {
          this.setTexture("atlas2", "misa-back");
        }
        else if (prevVelocity.y > 0)
        {
          this.setTexture("atlas2", "misa-front");
        }
        */
      }
    }
  }

  nigthmare ()
  {
    if(this.berserker)
    {
      return;
    }
    if(this.scene.UI.dayTimeManager.hourCount >= 21)
    {
      this.berserker = true;
      this.berserkerMode();
    }
  }

  berserkerMode ()
  {
    this.moveSpeed = this.maxMoveSpeed;
    this.maxMoveSpeed = 160;
    this.stopChaseDistance = 10000;
    this.damage = 25;
    this.attackSpeed = 500;
    var center = this.getCenter();
    this.aggroRadius.destroy();
    this.aggroRadius = this.scene.add.circle(center.x, center.y, 400, 0xFFFF00);
    this.aggroRadius.setAlpha(0);
    this.scene.physics.world.enableBody(this.aggroRadius, 0);
    this.aggroRadius.body.setCircle(400, -200, -200);
    this.scene.physics.add.overlap(this.player.sprite, this.aggroRadius, this.startChase, null, this);
  }

  // Metodo que utilizamos cuando se quiere cambiar la direccion de movimiento.
  changeDirection ()
  {
    // 1 arriba, 2 abajo, 3 izquierda, 4 derecha, 5 quieto.
    this.moveDirection = Phaser.Math.RND.integerInRange(1, 5);
  }

  isAlive ()
  {
    return this.health > 0;
  }

}
