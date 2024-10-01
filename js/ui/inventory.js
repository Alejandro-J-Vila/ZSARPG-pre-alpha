import Button from "../ui/button.js";

// Esta clase representa un contenedor de objetos dentro del juego.
export default class Inventory
{
  constructor (config)
  {
    // ATRIBUTOS

    this.scene; // La escena donde se ubicara el inventario.
    this.x; // La posicion del inventario en x.
    this.y; // La posicion del inventario en y.
    this.rows; // La cantidad de filas del inventario.
    this.colums; // La cantidad de columnas del inventario.
    this.visible; // Si es visible o no al momento de la creacion.
    this.background; // Imagen de fondo del inventario.
    this.bgOrigin; // Origen del inventario para luego alinear el resto de las cosas que contiene
    this.title; // Titulo que indica el tipo de inventario.
    this.quantity; // Cantidad actual de objetos del inventario.
    this.maxQuantity; // Cantidad maxima de objetos del inventario.
    this.slots; // Espacios del inventario donde se ubicaran objetos.
    this.items; // Objetos que contiene el inventario.
    this.closeButton; // Boton para cerrar el inventario cuando este se encuentra abierto.
    this.inventoryButton; // Boton de interfaz para mostrar / ocultar el inventario.

    // INICIALIZACION

    this.scene = config.scene;
    this.x = config.x;
    this.y = config.y;
    this.rows = config.rows;
    this.colums = config.colums;
    this.visible = config.visible;

    this.background = config.scene.add.image(config.x, config.y - 32, config.background);
    //this.background.setDisplaySize(380, 523);

    this.bgOrigin = this.background.getTopLeft();

    this.title = config.scene.add.text(this.x, this.y, config.title, { font: '30px Arial', fill: '#FFFFFF' });
    Phaser.Display.Align.In.TopCenter(this.title, this.background, 0, -10);

    this.quantity = 0;
    this.maxQuantity = config.rows * config.colums;

    this.slots = config.scene.add.group();

    this.items = config.scene.add.group();

    this.closeButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x + 353,
        y: this.bgOrigin.y + 25,
        backgroundKey: "button-atlas",
        backgroundFrame: "close.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -20,
        labelWidth: 50,
        labelHeight: 30,
        labelText: "Close"
      });

    this.inventoryButton = new Button(
      {
        scene: config.scene,
        x: 0,
        y: 0,
        backgroundKey: "button-atlas",
        backgroundFrame: "bag.png",
        visible: false,
        labelOffsetX: -25,
        labelOffsetY: -31,
        labelWidth: 102,
        labelHeight: 30,
        labelText: "Open Bag (I)"
      });

    // CONFIGURACION

    this.background.setVisible(config.visible);

    this.title.setVisible(config.visible);

    // Agregamos los espacios del inventario.
    for(var i = 0; i < this.maxQuantity; i++)
    {
      var slot = config.scene.add.image(this.bgOrigin.x, this.bgOrigin.y, config.slotKey, config.slotFrame);
      this.slots.add(slot);
    }
    // Alineamos los espacios siguiendo una grilla.
    Phaser.Actions.GridAlign(this.slots.getChildren(),
      {
        width: this.colums,
        height: this.rows,
        cellWidth: 65,
        cellHeight: 65,
        x: this.bgOrigin.x + 60,
        y: this.bgOrigin.y + 90
      });
    this.slots.toggleVisible();
  }

  // Metodo que utilizamos para cambiar la visibilidad del inventario.
  setVisible (value)
  {
    this.visible = value;
    this.background.setVisible(value);
    this.title.setVisible(value);
    this.closeButton.setVisible(value);
    this.slots.toggleVisible();
    if(this.items.getLength() > 0)
    {
      this.items.toggleVisible();
    }
  }

  // Metodo que utilizamos para agregar un item al inventario.
  addItem (item)
  {
    this.items.add(item);
    this.quantity++;
    this.alignItems();
    item.setVisible(this.visible);
  }

  // Metodo que utilizamos para eliminar un objeto del inventario.
  removeItem (item)
  {
    this.items.remove(item);
    this.quantity--;
    this.alignItems();
  }

  // Metodo que utilizamos para alinear los objetos del inventario cuando hay un cambio.
  alignItems ()
  {
    var bgOrigin = this.background.getTopLeft();
    Phaser.Actions.GridAlign(this.items.getChildren(),
      {
        width: this.colums,
        height: this.rows,
        cellWidth: 65,
        cellHeight: 65,
        x: this.bgOrigin.x + 60,
        y: this.bgOrigin.y + 90
      });
  }

  // Metodo que utilizamos para mostrar un conjunto de items en el inventario con un titulo.
  showItems (containerType, items)
  {
    // Seteamos el titulo.
    this.title.setText(containerType);
    Phaser.Display.Align.In.TopCenter(this.title, this.background, 0, -10);
    this.items = items;
    this.quantity = items.getLength();
    this.alignItems();
    this.setVisible(true);
  }

  // Metodo que utilizamos para saber si el inventario esta lleno.
  isFull ()
  {
    return this.quantity === this.maxQuantity;
  }

  // Metodo que utilizamos para buscar un item en el inventario.
  findItem (itemType)
  {
    var items = this.items.getChildren();
    for(var i = 0; i < this.items.getLength(); i++)
    {
      if(items[i].type === itemType)
      {
        return items[i];
      }
    }
    return null;
  }

  // Metodo que utilizamos para setear la visibilidad y la posicion del boton de interfaz.
  setInventoryButton (x, y)
  {
    this.inventoryButton.setPos(x, y);
    this.inventoryButton.setVisible(true);
  }

  // Metodo que utilizamos para mostrar / ocultar el boton de inventario en la interfaz.
  hideInventoryButton (value)
  {
    this.inventoryButton.setVisible(value);
  }
}
