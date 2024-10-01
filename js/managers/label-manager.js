import ItemDescription from "../ui/item-description.js";
import ButtonGroup from "../ui/button-group.js";
import ConfirmDialog from "../ui/confirm-dialog.js";
import AmmoDisplay from "../ui/ammo-display.js";

// Clase que se encarga de manejar el panel de descripcion y acciones de items.
export default class LabelManager
{
  constructor (config)
  {
    // ATRIBUTOS

    this.scene; // La escena donde se encuentran los paneles.
    this.currentItem; // Item actualmente seleccionado.
    this.itemDescription; // Panel de descripcion de items.
    this.itemActions; // Panel de acciones de items.
    this.ammoDisplay; // Panel de municion.
    this.confirmDialog; // Panel de confirmacion.

    // INICIALIZACION

    this.scene = config.scene;

    this.itemDescription = new ItemDescription(
      {
        scene: config.scene,
        x: 0,
        y: 0,
        key: "label",
        title: "item",
        visible: false
      });

    this.itemActions = new ButtonGroup(
      {
        scene: config.scene,
        x: 0,
        y: 0,
        key: "label",
        cantButtons: 4,
        buttonNames: ["Take/Leave", "Equip/Unequip", "Use", "Destroy"],
        visible: false
      });

    this.confirmDialog = new ConfirmDialog(
      {
        scene: config.scene,
        x: config.x / 2,
        y: config.y / 2,
        backgroundKey: "label",
        visible: false,
        title: "WARNING!",
        text: "Are you sure you want to destroy this item?"
      });

    this.ammoDisplay = new AmmoDisplay(
      {
        scene: config.scene,
        x: config.x,
        y: config.y,
        visible: false
      });

    // CONFIGURACION

    this.itemDescription.setGroupDepth(2);
    this.itemActions.setGroupDepth(4);
    this.confirmDialog.setGroupDepth(4);

    // Oyente para el boton Tomar / Dejar item.
    this.itemActions.buttons[0].on('pointerdown', (pointer) =>
    {
      // Ocultamos el panel de acciones.
      this.showItemActions(false);
      // Si el boton esta seteado en Tomar.
      if(this.itemActions.buttons[0].text === "Take")
      {
        this.scene.inventoryManager.takeItem(this.currentItem);
      }
      else
      {
        // Si el boton esta seteado en Dejar.
        this.scene.inventoryManager.leaveItem(this.currentItem);
      }
    });

    // Oyente para el boton Equipar / Desequipar item.
    this.itemActions.buttons[1].on('pointerdown', (pointer) =>
    {
      // Ocultamos el panel de acciones.
      this.showItemActions(false);
      // Si el boton esta seteado en equipar.
      if(this.itemActions.buttons[1].text === "Equip")
      {
        this.scene.inventoryManager.equipItem(this.currentItem);
      }
      else
      {
        // Si el boton esta seteado en desequipar.
        this.scene.inventoryManager.unequipItem(this.currentItem);
      }
    });

    // Oyente para el boton Usar item.
    this.itemActions.buttons[2].on('pointerdown', (pointer) =>
    {
      // Ocultamos el panel de acciones.
      this.showItemActions(false);
      this.scene.characterSheet.gainHealth(this.currentItem);
    });

    // Oyente para el boton Destruir item.
    this.itemActions.buttons[3].on('pointerdown', (pointer) =>
    {
      // Ocultamos el panel de acciones.
      this.showItemActions(false);
      this.confirmDialog.setVisibility(true);
      this.scene.confirmDialogInteraction = true;
    });

    // Oyente para el boton confirmar.
    this.confirmDialog.yesButton.on('pointerdown', (pointer) =>
    {
      this.confirmDialog.setVisibility(false);
      this.scene.inventoryManager.destroyItem(this.currentItem);
      this.scene.confirmDialogInteraction = false;
    });

    // Oyente para el boton cancelar.
    this.confirmDialog.noButton.on('pointerdown', (pointer) =>
    {
      this.confirmDialog.setVisibility(false);
      this.scene.confirmDialogInteraction = false;
    });

    // Oyente para el boton de cerrar el panel de acciones.
    this.itemActions.closeButton.on('pointerdown', (pointer) =>
    {
      // Ocultamos el panel de acciones.
      this.showItemActions(false);
    });
  }

  // Metodo que utilizamos para mostrar / ocultar el panel de descripcion del item.
  showItemDescription (item, visible)
  {
    if(visible)
    {
      this.itemDescription.setText(item);
      this.itemDescription.setPos(item);
    }
    this.itemDescription.setVisibility(item, visible);
  }

  // Metodo que utilizamos para mostrar / ocultar el panel de acciones de un item.
  showItemActions (item, visible)
  {
    if(visible)
    {
      this.currentItem = item;
      this.setActiveButtons(item.inBag, item.inContainer, item.equipped, item.equipable, item.usable);
      if(item.equipped)
      {
        this.itemActions.setPos(item.x + 50, item.y - 70);
      }
      else
      {
        this.itemActions.setPos(item.x + 50, item.y + 70);
      }
    }
    this.itemActions.setVisibility(visible);
    this.scene.itemInteraction = visible;
  }

  // Metodo que utilizamos para activar / desactivar ciertos botones dentro de panel de acciones.
  setActiveButtons (inBag, inContainer, equipped, equipable, usable)
  {
    if(inContainer)
    {
      // Si el item esta en un container seteamos el boton para tomar el item y lo activamos.
      this.itemActions.buttons[0].setText("Take");
      this.itemActions.buttons[0].setInteractive();
      this.itemActions.buttons[0].setTint(0xFFFFFF);
    }
    else
    {
      // Sino lo desactivamos.
      this.itemActions.buttons[0].disableInteractive();
      this.itemActions.buttons[0].setTint(0x696969);
    }

    if(inBag)
    {
      // Si el item esta en el inventario seteamos el boton para dejar el item.
      this.itemActions.buttons[0].setText("Leave");
      if(!this.scene.inventoryManager.container.visible)
      {
        // Si no hay ningun cofre abierto, desactivamos el boton para dejar el item.
        this.itemActions.buttons[0].disableInteractive();
        this.itemActions.buttons[0].setTint(0x696969);
      }
      else
      {
        // Si hay un cofre abierto, activamos el boton para dejar el item.
        this.itemActions.buttons[0].setInteractive();
        this.itemActions.buttons[0].setTint(0xFFFFFF);
      }
    }

    if(equipped)
    {
      // Si el item esta equipado seteamos el boton para desequipar el item.
      this.itemActions.buttons[1].setText("Unequip");
    }
    else
    {
      // Si el item no esta equipado, seteamos el boton para equipar el item.
      this.itemActions.buttons[1].setText("Equip");
    }

    if(equipable)
    {
      // Si el item es equipable, activamos el boton para equipar el item.
      this.itemActions.buttons[1].setInteractive();
      this.itemActions.buttons[1].setTint(0xFFFFFF);
    }
    else
    {
      // Si el item no es equipable, desactivamos el boton para equipar el item.
      this.itemActions.buttons[1].disableInteractive();
      this.itemActions.buttons[1].setTint(0x696969);
    }

    if(usable)
    {
      // Si el item es consumible, activamos el boton para usar el item.
      this.itemActions.buttons[2].setInteractive();
      this.itemActions.buttons[2].setTint(0xFFFFFF);
    }
    else
    {
      // Si el item no es consumible, desactivamos el boton para usar el item.
      this.itemActions.buttons[2].disableInteractive();
      this.itemActions.buttons[2].setTint(0x696969);
    }
  }

  hideUI ()
  {
    this.scene.inventoryManager.belt.unselectWeapons();
  }
}
