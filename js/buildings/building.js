// Clase que representa un edificio dentro del juego.
export default class Building extends Phaser.GameObjects.Sprite
{
  constructor (config)
  {
    // Llamamos al constructor de la clase Sprite para que inicialice el mismo.
    super(config.scene, config.x, config.y, config.fileName, config.buildingBlueprint);

    // ATRIBUTOS

    this.scene; // Escena donde se ubica la construccion.
    this.fileName; // Nombre del archivo de imagen para el edificio.
    this.buildingName; // Nombre del edificio.
    this.buildingBlueprint; // Nombre del frame de la imagen que representa el plano del edificio.
    this.buildingExterior; // Nombre del frame de la imagen que representa el exterior del edificio.
    this.buildingInterior; // Nombre del frame de la imagen que representa el interior del edificio.
    this.buildingProduction; // Nombre del frame de la imagen que representa el edificio en produccion.
    this.buildingDamaged; // Nombre del frame de la imagen que representa el edificio dañado.
    this.buildingProductionDamaged; // Nombre del frame de la imagen que representa el edificio en produccion dañado.
    this.buildingDestroyed; // Nombre del frame de la imagen que representa el edificio destruido.
    this.buildingProductionDestroyed; // Nombre del frame de la imagen que representa el edificio en produccion destruido.
    this.buildingCost; // Costo de construcion del edificio.
    this.positionOffsetX; // Limite del mapa en X para construir el edificio.
    this.positionOffsetY; // Limite del mapa en Y para construir el edificio.

    this.health; // Salud del edificio.
    this.maxHealth; // Maxima salud deñ edificio.
    this.level; // Nivel del edificio.

    // INICIALIZACION

    this.scene = config.scene;
    this.fileName = config.fileName;
    this.buildingName = config.buildingName;
    this.buildingBlueprint = config.buildingBlueprint;
    this.buildingExterior = config.buildingExterior;
    this.buildingInterior = config.buildingInterior;
    this.buildingProduction = config.buildingProduction;
    this.buildingDamaged = config.buildingDamaged;
    this.buildingProductionDamaged = config.buildingProductionDamaged;
    this.buildingDestroyed = config.buildingDestroyed;
    this.buildingProductionDestroyed = config.buildingProductionDestroyed;
    this.positionOffsetX = this.width / 32;
    this.positionOffsetY = this.height / 32;

    this.buildingCost = config.buildingCost;
    this.health = config.health;
    this.maxHealth = config.maxHealth;
    this.level = config.level;

    // CONFIGURACION

    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.body.setImmovable(true);
    this.setOrigin(0);

    // Oyente para mostrar informacion del edificio al pasar el mouse por encima.
    this.on('pointerover', (pointer) =>
    {
      if(!this.scene.UI.playerInteracting())
      {
        if(this.buildingInterior != "")
        {
          if(this.health == this.maxHealth)
          {
            this.setFrame(this.buildingInterior, false, false);
          }
        }
      }
    });

    // Oyente para ocultar la informacion del edificio al sacar el mouse de encima.
    this.on('pointerout', (pointer) =>
    {
      if(this.buildingInterior != "")
      {
        if(this.health == this.maxHealth)
        {
          this.setFrame(this.buildingExterior, false, false);
        }
      }
    });

    // Oyente para mostrar la interfaz de acciones del edificio al hacer click sobre el mismo.
    this.on('pointerdown', (pointer) =>
    {
      if(this.scene.baseUnderAttack)
      {
        return;
      }
      if(!this.scene.UI.playerInteracting())
      {
        if(this.inProduction != undefined)
        {
          if((this.inProduction) | (!this.productionCollected))
          {
            // Mostramos la interfaz de produccion del edificio.
            this.scene.UI.productionUI.showProductionUI(this);
          }
          else
          {
            // Mostramos la interfaz de acciones del edificio.
            this.scene.UI.buildingUI.showBuildingUI(this);
          }
        }
        else
        {
          // Mostramos la interfaz de acciones del edificio.
          this.scene.UI.buildingUI.showBuildingUI(this);
        }
      }
    });
  }

  // Metodo que utilizamos para comenzar a construir el edificio.
  place (buildings, player, move)
  {
    // Si no estamos moviendo el edificio
    if(!move)
    {
      // Lo agregamos a la lista de edificios.
      buildings.add(this);
      // Seteamos la colision con el jugador.
      this.scene.physics.add.collider(player, this);
      // Seteamos el frame del edificio terminado.
      this.setFrame(this.buildingExterior, false, false);
    }
    this.clearTint();
    this.setInteractive();
  }

  // Metodo que utilizamos para terminar de construir el edificio.
  build ()
  {
    this.setFrame(this.buildingExterior, false, false);
  }

  // Metodo que utilizamos para dañar el edificio.
  getHit (value)
  {
    this.health -= value;
    this.damaged();
    if(this.health < 0)
    {
      this.health = 0;
    }
    if(this.health === 0)
    {
      this.scene.physics.world.disable(this);
      this.destroyed();
    }
  }

  // Metodo que utilizamos para obtener el costo de reparacion del edificio
  getRepairCost ()
  {
    var healthPercent = Phaser.Math.RoundTo(this.health / this.maxHealth, -1);
    var repairPercent = 1 - healthPercent;
    if(repairPercent > 0.6)
    {
      repairPercent = 0.6;
    }
    var repairCost = Phaser.Math.RoundTo(this.buildingCost * repairPercent);
    return repairCost;
  }

  // Metodo que utilizamos para reparar el edificio.
  repair ()
  {
    if(this.health === 0)
    {
      this.scene.physics.world.enable(this);
    }
    this.health = this.maxHealth;
    this.repaired();
    this.scene.UI.buildingUI.showBuildingUI(this);
  }

  // Metodo que utilizamos cuando movemos el edificio.
  move ()
  {
    this.disableInteractive();
  }

  // Metodo que utilizamos para obtener el costo de mejora del edificio.
  getLevelUpCost ()
  {
    return this.buildingCost * 2;
  }

  // Metodo que utilizamos para incrementar el nivel del edificio.
  levelUp ()
  {
    this.level++;
    this.buildingCost *= 2;
    this.maxHealth *= 2;
    this.health = this.maxHealth;
  }

  // Metodo que utiizamos para eliminar el edificio.
  demolish ()
  {
    this.destroy();
  }

  // Metodo que utilizamos cuando el edificio es reparado.
  repaired ()
  {
    this.setFrame(this.buildingExterior, false, false);
  }

  // Metodo que utilizamos cuando el edificio sufre daño.
  damaged ()
  {
    this.setFrame(this.buildingDamaged, false, false);
  }

  // Metodo que utilizamos cuando la salud del edificio llega a cero.
  destroyed ()
  {
    this.setFrame(this.buildingDestroyed, false, false);
  }
}
