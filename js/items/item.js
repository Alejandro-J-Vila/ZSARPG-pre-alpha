import Label from "../ui/label.js";
import ButtonGroup from "../ui/button-group.js";

// Clase que representa un item dentro del juego.
export default class Item extends Phaser.GameObjects.Image
{
  constructor (config)
  {
    // Llamada al constructor de la clase base Image.
    super(config.scene, config.x, config.y, config.key);

    // ATRIBUTOS

    this.scene; // Escena del juego encargada de los graficos.
    this.inBag; // Flag de item en mochila.
    this.inContainer; // Flag de item en container.
    this.equipped; // Flag de item equipado.
    this.equipable; // Flag de item equipable.
    this.usable; // Flag de item consumible.
    this.stackable; // Flag de item apilable.

    this.name; // Nombre del item.
    this.type; // Tipo de item.
    this.quantity; // Cantidad.

    //INICIALIZACION

    this.scene = config.scene;
    this.equipped = config.equipped;
    this.inContainer = config.inContainer;
    this.inBag = config.inBag;
    this.equipable = config.equipable;
    this.usable = config.usable;
    this.stackable = config.stackable;

    this.name = config.name;
    this.type = config.type;
    this.quantity = config.quantity;

    // CONFIGURACION

    config.scene.add.existing(this);

    this.setInteractive();

    // Oyente para mostrar el panel de acciones de item al hacer click.
    this.on('pointerdown', (pointer) =>
    {
      if(!this.scene.confirmDialogInteraction)
      {
        this.scene.labelManager.showItemActions(this, true);
      }
    });

    // Oyente para mostrar informacion del item al pasar el mouse por encima.
    this.on('pointerover', (pointer) =>
    {
      this.scene.labelManager.showItemDescription(this, true);
    });

    // Oyente para ocultar la informacion del item al sacar el mouse de encima.
    this.on('pointerout', (pointer) =>
    {
      this.scene.labelManager.showItemDescription(this, false);
    });

  }

  // Metodo que utilizamos para setear los flags correspondientes del item para indicar que esta en la mochila.
  setInBag ()
  {
    this.inBag = true;
    this.inContainer = false;
    this.equipped = false;
  }

  // Metodo que utilizamos para setear los flags correspondientes del item para indicar que esta en un contenedor.
  setInContainer ()
  {
    this.inContainer = true;
    this.inBag = false;
    this.equipped = false;
  }

  // Metodo que utilizamos para setear los flags correspondientes del item para indicar que esta equipado.
  setEquipped ()
  {
    this.inBag = false;
    this.inContainer = false;
    this.equipped = true;
  }

  // Metodo que utilizamos para saber si el item es un arma.
  isWeapon ()
  {
    return (this.type === "melee") | (this.type === "gun") | (this.type === "machine-gun") | (this.type === "shot-gun");
  }

  // Metodo que utilizamos para saber si el item es municion.
  isAmmo ()
  {
    return (this.type === "gun-ammo") | (this.type === "machine-gun-ammo") | (this.type === "shot-gun-ammo");
  }

  // Metodo que utilizamos para saber si el item es comida.
  isFood ()
  {
    return this.type === "food";
  }

  // Metodo que utilizamos para saber si el item es una semilla.
  isSeed ()
  {
    return this.type === "seed";
  }

  // Metodo que utilizamos para saber si el item es un material.
  isMaterial ()
  {
    return this.type === "material";
  }

  // Metodo que utilizamos para saber si el item es combustible.
  isGas ()
  {
    return this.type === "gas";
  }

  // Metodo que utilizamos para saber si el item es de curacion.
  isHealth ()
  {
    return this.type === "health";
  }

}
