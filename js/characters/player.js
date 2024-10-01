
export default class Player
{
  constructor (config)
  {
    // ATRIBUTOS

    this.scene; // Escena donde se ubica el jugador.
    this.sprite; // Sprite que usara el jugador.
    this.dead;
    this.lastAttack; // Tiempo trascurrido desde el ultimo ataque.

    // INICIALIZACION

    this.scene = config.scene;
    this.sprite = config.scene.physics.add.sprite(config.x, config.y, "player");
    var center = this.sprite.body.center;
    this.innerLightRadius = new Phaser.Geom.Circle(center.x, center.y, 100);
    this.outerLigthRadius = new Phaser.Geom.Circle(center.x, center.y, 120);
    this.lightTheWay();
    this.dead = false;
    this.lastAttack = 1000;

    // CONFIGURACION

    // Ajustamos el tamaño y el offset para que el sprite del jugador pueda acercarse a las paredes y objetos.
    this.sprite.setSize(16, 32)
    this.sprite.setOffset(8, 32);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setDepth(2);


    // Oyente para disparo de armas.
    config.scene.input.on('pointerdown', (pointer) =>
    {
      if(this.dead)
      {
        return;
      }
      if(this.lastAttack > this.scene.UI.characterSheet.attackSpeed)
      {
        this.lastAttack = 0;
        this.shoot(pointer);
      }
    }, this);

  }

  update (time, delta)
  {
    if(this.dead)
    {
      return;
    }
    // Si el tiempo trascurrido desde el ultimo ataque no llego al valor de velocidad de ataque...
    if(this.lastAttack <= this.scene.UI.characterSheet.attackSpeed)
    {
      // Aumentamos el tiempo.
      this.lastAttack += delta;
    }
    const moveKeys = this.scene.UI.moveKeys;
    const sprite = this.sprite;
    const speed = this.scene.UI.characterSheet.moveSpeed;
    const prevVelocity = sprite.body.velocity.clone();
    // Detenemos el movimiento del frame anterior.
    sprite.body.setVelocity(0);
    // Movimiento horizontal.
    if (moveKeys.left.isDown)
    {
      sprite.body.setVelocityX(-speed);
    }
    else if (moveKeys.right.isDown)
    {
      sprite.body.setVelocityX(speed);
    }
    // Movimiento vertical.
    if (moveKeys.up.isDown)
    {
      sprite.body.setVelocityY(-speed);
    }
    else if (moveKeys.down.isDown)
    {
      sprite.body.setVelocityY(speed);
    }
    // Normalizamos y escalamos la velocidad para que el jugador no se mueva mas rapido en las diagonales.
    sprite.body.velocity.normalize().scale(speed);
    /*
    // Por ultimo actualizamos las animaciones dando precedencia a las de movimiento horizontal sobre las
    // de movimiento vertical.
    if (moveKeys.left.isDown)
    {
      sprite.anims.play("misa-left-walk", true);
    }
    else if (moveKeys.right.isDown)
    {
      sprite.anims.play("misa-right-walk", true);
    }
    else if (moveKeys.up.isDown)
    {
      sprite.anims.play("misa-back-walk", true);
    }
    else if (moveKeys.down.isDown)
    {
      sprite.anims.play("misa-front-walk", true);
    }
    else
    {
      sprite.anims.stop();
      // Cuando el jugador no se mueve elegimos una animacion para quedar parados.
      if (prevVelocity.x < 0)
      {
        sprite.setTexture("atlas", "misa-left");
      }
      else if (prevVelocity.x > 0)
      {
        sprite.setTexture("atlas", "misa-right");
      }
      else if (prevVelocity.y < 0)
      {
        sprite.setTexture("atlas", "misa-back");
      }
      else if (prevVelocity.y > 0)
      {
        sprite.setTexture("atlas", "misa-front");
      }
    }
    */
    if((this.sprite.body.velocity.x != 0) | (this.sprite.body.velocity.y != 0))
    {
      this.lightTheWay();
    }

  }

  lightTheWay ()
  {
    var center = this.sprite.body.center;
    this.innerLightRadius.setPosition(center.x, center.y);
    this.outerLigthRadius.setPosition(center.x, center.y);
    var ligthArea = this.scene.levelShadows.getTilesWithinShape(this.innerLightRadius);
    var darkArea = this.scene.levelShadows.getTilesWithinShape(this.outerLigthRadius);
    darkArea.forEach((t) =>
    {
      t.clearAlpha();
    });
    ligthArea.forEach((t) =>
    {
      t.setAlpha(0);
    });
  }

  // Metodo que utilizamos cuando el jugador sufre daño.
  getHit (damage)
  {
    this.scene.UI.characterSheet.takeDamage(damage);
  }

  // Metodo que utilizamos para obtener la distancia del jugador a un objeto.
  getDistanceTo (object)
  {
    if(this.dead)
    {
      return;
    }
    var playerCenter = this.sprite.body.center;
    var d = Phaser.Math.Distance.Between(object.x, object.y, playerCenter.x, playerCenter.y);
    return d;
  }

  // Metodo que utilizamos cuando el jugador recibe experiencia.
  increaseXP (amount)
  {
    this.scene.UI.characterSheet.gainExperience(amount);
  }

  // Metodo que utilizamos para disparar el arma seleccionada.
  shoot (pointer)
  {
    // Si el jugador esta interactuando, no hacemos nada.
    if(this.scene.UI.playerInteracting())
    {
      return;
    }
    // Disparamos el arma que tenemos seleccionada.
    this.useMelee(pointer);
    this.shootGun(pointer);
    this.shootMachineGun(pointer);
    this.shootShotGun(pointer);
  }

  // Metodo que utilizamos para usar el arma de mele si esta seleccionada.
  useMelee (target)
  {
    // Si tenemos el arma de mele seleccionada.
    if(this.scene.UI.inventoryManager.belt.meleeSelected)
    {
      // La obtenemos.
      var weapon = this.scene.UI.inventoryManager.belt.meleeItem;
      // Creamos el proyectil adecuado.
      var bullet = this.scene.melee.get().setActive(true).setVisible(true);
      // Utilizamos el arma.
      this.fireWeapon(weapon, bullet, target, 0);
    }
  }

  // Metodo que utilizamos para disparar la pistola si esta seleccionada.
  shootGun (target)
  {
    // Si tenemos la pistola seleccionada.
    if(this.scene.UI.inventoryManager.belt.gunSelected)
    {
      // Obtenemos la cantidad de proyectiles que podemos disparar.
      var shots = this.scene.UI.inventoryManager.belt.shootGun();
      // Si la cantidad de proyectiles es mayor a 0...
      if(shots > 0)
      {
        // Obtenemos el arma.
        var weapon = this.scene.UI.inventoryManager.belt.gunItem;
        // Creamos el proyectil adecuado.
        var bullet = this.scene.bullets.get().setActive(true).setVisible(true);
        // Disparamos el arma.
        this.fireWeapon(weapon, bullet, target, 0);
      }
      else
      {
        // Si la cantidad de proyectiles es 0 recargamos el arma.
        this.scene.UI.inventoryManager.equipment.reloadGun();
      }
    }
  }

  // Metodo que utilizamos para disparar la ametralladora si esta seleccionada.
  shootMachineGun (target)
  {
    // Si tenemos la ametralladora seleccionada.
    if(this.scene.UI.inventoryManager.belt.machineGunSelected)
    {
      // Obtenemos la cantidad de proyectiles que podemos disparar.
      var shots = this.scene.UI.inventoryManager.belt.shootMachineGun();
      // Si la cantidad de proyectiles es mayor a 0...
      if(shots > 0)
      {
        // Variable auxiliar para cantidad de disparos (restamos 1 porque el evento siempre comienza en 1).
        var rep = shots - 1;
        // Creamos un evento de tiempo para disparar en rafaga.
        this.scene.time.addEvent(
          {
            delay: 100,
            callback: () =>
            {
              // Obtenemos el arma.
              var weapon = this.scene.UI.inventoryManager.belt.machineGunItem;
              // Creamos el proyectil adecuado.
              var bullet = this.scene.bullets.get().setActive(true).setVisible(true);
              // Disparamos el arma.
              this.fireWeapon(weapon, bullet, target, 0);
            },
            callbackScope: this,
            repeat: rep
          });
      }
      else
      {
        // Si la cantidad de proyectiles es 0 recargamos el arma.
        this.scene.UI.inventoryManager.equipment.reloadMachineGun();
      }
    }
  }

  // Metodo que utilizamos para disparar la escopeta si esta seleccionada.
  shootShotGun (target)
  {
    // Si tenemos la escopeta seleccionada.
    if(this.scene.UI.inventoryManager.belt.shotGunSelected)
    {
      // Obtenemos la cantidad de proyectiles que podemos disparar.
      var shots = this.scene.UI.inventoryManager.belt.shootShotGun();
      // Si la cantidad de proyectiles es mayor a 0...
      if(shots > 0)
      {
        // Offset de proyectiles para disparar en abanico.
        var offset = 0;
        // Obtenemos el arma.
        var weapon = this.scene.UI.inventoryManager.belt.shotGunItem;
        for(var j = 0; j < shots; j++)
        {
          // Creamos el proyectil adecuado.
          var bullet = this.scene.bullets.get().setActive(true).setVisible(true);
          // Disparamos el arma.
          this.fireWeapon(weapon, bullet, target, offset);
          // Aumentamos el offset de disparo.
          offset += 10;
        }
      }
      else
      {
        // Si la cantidad de proyectiles es 0 recargamos el arma.
        this.scene.UI.inventoryManager.equipment.reloadShotGun();
      }
    }
  }

  // Metodo que utilizamos para disparar el proyectil de un arma hacia un objetivo con un offset.
  fireWeapon (weapon, bullet, target, offset)
  {
    // Seteamos el daño del proyectil.
    bullet.damage = weapon.damage;
    // Seteamos la colision del proyectil con los elementos del mapa.
    bullet.setCollision();
    // Disparamos el proyectil.
    bullet.fire(this.sprite, target, offset, true);
  }

  die ()
  {
    this.dead = true;
    this.sprite.destroy();
  }

}
