// Clase que muestra informacion de un item dentro del juego.
export default class ItemDescription extends Phaser.GameObjects.Image
{
  constructor (config)
  {
    // Llamamos al constructor de la clase Image para que inicialice la misma.
    super(config.scene, config.x, config.y, config.key);

    config.scene.add.existing(this);

    // ATRIBUTOS

    this.scene; // Escena donde se ubica el panel de descripcion.
    this.itemName; // Nombre del item.
    this.itemType; // Tipo de item.
    this.itemDamage; // Daño que causa el item.
    this.itemHealAmount; // Cantidad de salud que otorga el item.
    this.itemQuantity; // Cantidad de unidades del item.

    // INICIALIZACION

    this.scene = config.scene;
    this.itemName = config.scene.add.text(config.x, config.y, "", { font: '16px Arial', fill: '#FFFFFF' });
    this.itemType = config.scene.add.text(config.x, config.y, "Type: ", { font: '16px Arial', fill: '#FFFFFF' });
    this.itemDamage = config.scene.add.text(config.x, config.y, "Damage: ", { font: '16px Arial', fill: '#FFFFFF' });
    this.itemHealAmount = config.scene.add.text(config.x, config.y, "Heal Amount: ", { font: '16px Arial', fill: '#FFFFFF' });
    this.itemQuantity = config.scene.add.text(config.x, config.y, "Quantity: ", { font: '16px Arial', fill: '#FFFFFF' });

    // CONFIGURACION

    this.setVisible(config.visible);
    this.itemName.setVisible(config.visible);
    this.itemType.setVisible(config.visible);
    this.itemDamage.setVisible(config.visible);
    this.itemHealAmount.setVisible(config.visible);
    this.itemQuantity.setVisible(config.visible);

  }

  // Metodo que utilizamos para cambiar la visibilidad del panel de descripcion.
  setVisibility (item, value)
  {
    this.setVisible(value);
    this.itemName.setVisible(value);
    this.itemType.setVisible(value);
    if(item.damage != undefined)
    {
      this.itemDamage.setVisible(value);
    }
    if(item.healAmount != undefined)
    {
      this.itemHealAmount.setVisible(value);
    }
    if(item.quantity > 0)
    {
      this.itemQuantity.setVisible(value);
    }
  }

  // Metodo que utilizamos para setear la posicion del panel de descripcion.
  setPos (item)
  {
    var description = [];
    description.push(this.itemName);
    description.push(this.itemType);
    if(item.damage != undefined)
    {
      description.push(this.itemDamage);
    }
    if(item.healAmount != undefined)
    {
      description.push(this.itemHealAmount);
    }
    if(item.quantity > 0)
    {
      description.push(this.itemQuantity);
    }

    var w = 0;
    var h = 0;
    for(var i = 0; i < description.length; i++)
    {
      h += description[i].height;
      if(description[i].width > w)
      {
        w = description[i].width;
      }
    }
    w += 10;
    h += 10;
    this.setDisplaySize(w, h);

    this.setPosition(item.x, item.y - 50);
    Phaser.Actions.GridAlign(description,
      {
        width: 1,
        height: description.length,
        cellWidth: w,
        cellHeight: description[0].height,
        position: Phaser.Display.Align.CENTER,
        x: this.getTopLeft().x + (w / 2),
        y: this.getTopLeft().y + 13
      });
  }

  // Metodo que utilizamos para setear la profundidad en escena del panel de descripcion.
  setGroupDepth (value)
  {
    this.setDepth(value);
    this.itemName.setDepth(value + 1);
    this.itemType.setDepth(value + 1);
    this.itemDamage.setDepth(value + 1);
    this.itemHealAmount.setDepth(value + 1);
    this.itemQuantity.setDepth(value + 1);
  }

  // Metodo que utilizamos para setear los datos que muestra el panel de descripcion.
  setText (item)
  {
    this.itemName.setText(item.name);
    this.itemType.setText("Type: " + item.type);
    if(item.damage != undefined)
    {
      this.itemDamage.setText("Damage: " + item.damage);
    }
    if(item.healAmount != undefined)
    {
      this.itemHealAmount.setText("Heal Amount: " + item.healAmount);
    }
    if(item.quantity > 0)
    {
      this.itemQuantity.setText("Quantity: " + item.quantity);
    }
  }
}
