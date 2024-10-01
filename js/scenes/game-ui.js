import InventoryManager from "../managers/inventory-manager.js";
import BarManager from "../managers/bar-manager.js";
import LabelManager from "../managers/label-manager.js";
import CharacterSheet from "../ui/character/character-sheet.js";
import BuildUI from "../ui/buildings/build-ui.js";
import BuildingUI from "../ui/buildings/building-ui.js";
import QuestMap from "../ui/quests/quest-map.js";
import QuestUI from "../ui/quests/quest-ui.js";
import LoadingScreen from "../ui/loading-screen.js";
import DeathScreen from "../ui/death-screen.js";
import OptionsScreen from "../ui/options-screen.js";
import HelpScreen from "../ui/help-screen.js";
import NotificationManager from "../managers/notification-manager.js";
import DayTimeManager from "../managers/daytime-manager.js";
import ProductionUI from "../ui/buildings/production-ui.js";
import SaveManager from "../managers/save-manager.js";

// Escena encargada de mostrar la interfaz de usuario.
export default class GameUI extends Phaser.Scene
{
  constructor ()
  {
    super("ui");
  }

  preload ()
  {

  }

  create (save)
  {
    this.gameScene; // La escena del juego actual.
    this.width = this.cameras.main.width; // El ancho de la camara.
    this.height = this.cameras.main.height; // El alto de la camara.

    this.bagInteraction = false; // Flag de interaccion con la mochila.
    this.containerInteraction = false; // Flag de interaccion con un container.
    this.chestInteraction = false; // Flag de interaccion con un cofre.
    this.buildingInteraction = false; // Flag de interaccion con un edificio.
    this.buildInteraction = false; // Flag de interaccion para el modo construccion.
    this.characterSheetInteraction = false; // Flag de interaccion con la hoja de personaje.
    this.itemInteraction = false; // Flag de interaccion con un item.
    this.questMapInteraction = false;
    this.confirmDialogInteraction = false;
    this.productionInteraction = false;

    this.playerDeath = false;

    // Creamos las teclas de movimiento.
    this.moveKeys = this.input.keyboard.addKeys(
      {
        'up': Phaser.Input.Keyboard.KeyCodes.W,
        'down': Phaser.Input.Keyboard.KeyCodes.S,
        'left': Phaser.Input.Keyboard.KeyCodes.A,
        'right': Phaser.Input.Keyboard.KeyCodes.D
      }
    );

    // Creamos las teclas de seleccion de armas.
    this.weaponKeys = this.input.keyboard.addKeys(
      {
        'melee': Phaser.Input.Keyboard.KeyCodes.ONE,
        'gun': Phaser.Input.Keyboard.KeyCodes.TWO,
        'machine_gun': Phaser.Input.Keyboard.KeyCodes.THREE,
        'shot_gun': Phaser.Input.Keyboard.KeyCodes.FOUR
      }
    );

    // Creamos la tecla de curacion.
    this.healKey = this.input.keyboard.addKeys(
      {
        'heal': Phaser.Input.Keyboard.KeyCodes.Q
      }
    );

    // Creamos la tecla de inventario.
    this.inventoryKey = this.input.keyboard.addKeys(
      {
        'inventory': Phaser.Input.Keyboard.KeyCodes.I
      }
    );

    // Creamos la tecla de hoja de personaje.
    this.characterSheetKey = this.input.keyboard.addKeys(
      {
        'character': Phaser.Input.Keyboard.KeyCodes.C
      }
    );

    // Creamos la tecla de construccion.
    this.buildKey = this.input.keyboard.addKeys(
      {
        'build': Phaser.Input.Keyboard.KeyCodes.B
      }
    );

    // Creamos la tecla de opciones.
    this.optionsKey = this.input.keyboard.addKeys(
      {
        'options': Phaser.Input.Keyboard.KeyCodes.ESC
      }
    );

    // Creamos el manejador de guardado.
    this.saveManager = new SaveManager(
      {
        scene: this
      });

    // Creamos el manejador de tiempo.
    this.dayTimeManager = new DayTimeManager(
      {
        scene: this,
        x: this.width,
        y: this.height
      });

    // Si hay una partida guardada, cargamos los valores para el manejador de tiempo.
    if(save.day)
    {
      this.dayTimeManager.startTimeAt(save.day.day, save.day.hour, save.day.minute, save.day.horde);
    }

    // Creamos el manejador de las barras de la interfaz.
    this.barManager = new BarManager(
      {
        scene: this,
        x: this.width,
        y: this.height
      });

    // Creamos el manejador de inventario.
    this.inventoryManager = new InventoryManager(
      {
        scene: this,
        x: this.width,
        y: this.height
      });

    // Si hay una partida guardada, cargamos los valores para el manejador de inventario.
    if(save.equipment)
    {
      this.inventoryManager.loadEquipment(save.equipment);
    }
    if(save.belt)
    {
      this.inventoryManager.loadBelt(save.belt);
    }
    if(save.bag)
    {
      this.inventoryManager.loadBag(save.bag);
    }

    // Creamos el manejador de los paneles de acciones.
    this.labelManager = new LabelManager(
      {
        scene: this,
        x: this.width,
        y: this.height
      });

    // Creamos la hoja de personaje.
    this.characterSheet = new CharacterSheet(
      {
        scene: this,
        x: this.width,
        y: this.height,
        visible: false,
        background: "window"
      });

    // Si hay una partida guardada, cargamos los valores para la hoja de personaje.
    if(save.player)
    {
      this.characterSheet.startCharacter(save.player);
    }

    // Creamos la interfaz de construccion.
    this.buildUI = new BuildUI(
      {
        scene: this,
        x: this.width,
        y: this.height,
        visible: false,
        background: "large-window"
      });

    // Creamos la interfaz de acciones para los edificios.
    this.buildingUI = new BuildingUI(
      {
        scene: this,
        x: this.width,
        y: this.height,
        visible: false,
        background: "window",
      });

    // Creamos la interfaz de produccion.
    this.productionUI = new ProductionUI(
      {
        scene: this,
        x: this.width,
        y: this.height,
        visible: false,
        background: "window",
      });

    // Creamos el mapa de misiones.
    this.questMap = new QuestMap(
      {
        scene: this,
        x: this.width,
        y: this.height,
        visible: false,
        background: "large-window"
      });

    // Creamos la interfaz de mision.
    this.questUI = new QuestUI(
      {
        scene: this,
        x: this.width,
        y: this.height,
        visible: false,
        background: "window",
      });

    // Creamos el manejador de notificaciones.
    this.notificationManager = new NotificationManager(
      {
        scene: this,
        x: this.width,
        y: this.height
      });

    // Creamos las pantalla de carga.
    this.loadingScreen = new LoadingScreen(
      {
        scene: this,
        width: this.width,
        height: this.height,
        background: "loading-screen",
        visible: false
      });

    // Creamos las pantalla de muerte.
    this.deathScreen = new DeathScreen(
      {
        scene: this,
        width: this.width,
        height: this.height,
        background: "loading-screen",
        deathMessage: "you-died",
        visible: false
      });

    // Creamos las pantalla de opciones.
    this.optionsScreen = new OptionsScreen(
      {
        scene: this,
        width: this.width,
        height: this.height,
        background: "loading-screen",
        visible: false
      });

    // Creamos las pantalla de ayuda.
    this.helpScreen = new HelpScreen(
      {
        scene: this,
        width: this.width,
        height: this.height,
        background: "help-screen",
        visible: false
      });

    // Oyente para seleccion de armas.
    this.weaponKeys.melee.on('down', (event) =>
    {
      if(this.playerDeath)
      {
        return;
      }
      this.inventoryManager.selectWeapon("melee");
    }, this);

    // Oyente para seleccion de armas.
    this.weaponKeys.gun.on('down', (event) =>
    {
      if(this.playerDeath)
      {
        return;
      }
      this.inventoryManager.selectWeapon("gun");
    }, this);

    // Oyente para seleccion de armas.
    this.weaponKeys.machine_gun.on('down', (event) =>
    {
      if(this.playerDeath)
      {
        return;
      }
      this.inventoryManager.selectWeapon("machine-gun");
    }, this);

    // Oyente para seleccion de armas.
    this.weaponKeys.shot_gun.on('down', (event) =>
    {
      if(this.playerDeath)
      {
        return;
      }
      this.inventoryManager.selectWeapon("shot-gun");
    }, this);

    // Oyente para curacion.
    this.healKey.heal.on('down', (event) =>
    {
      if(this.playerDeath)
      {
        return;
      }
      this.characterSheet.gainHealth(null);
    }, this);

    // Oyente para inventario.
    this.inventoryKey.inventory.on('down', (event) =>
    {
      if(this.playerDeath)
      {
        return;
      }
      this.inventoryManager.showInventory();
    }, this);

    // Oyente para hoja de personaje.
    this.characterSheetKey.character.on('down', (event) =>
    {
      if(this.playerDeath)
      {
        return;
      }
      this.characterSheet.showCharacterSheet();
    }, this);

    // Oyente para construir.
    this.buildKey.build.on('down', (event) =>
    {
      if(this.playerDeath)
      {
        return;
      }
      this.buildUI.showBuildUI();
    }, this);

    // Oyente para opciones.
    this.optionsKey.options.on('down', (event) =>
    {
      if(this.playerDeath)
      {
        return;
      }
      this.showOptionsScreen(true);
    }, this);

  }

  update (time, delta)
  {
    //this.inventoryManager.farFromContainer(this.gameScene.player);
  }

  // Metodo que utilizamos para mostrar / ocultar las interfaces al entrar en modo construccion.
  startBuilding (value)
  {
    this.inventoryManager.hideUI(value);
    this.barManager.hideUI(value);
    this.characterSheet.hideUI(value);
    this.labelManager.hideUI();
  }

  // Metodo que utilizamos para mostrar / ocultar la interfaz de construccion cuando el jugador no esta en la base.
  outOfBase (value)
  {
    this.buildUI.hideUI(value);
  }

  // Metodo que utilizamos para mostrar / ocultar la pantalla de carga cuando pasamos de una escena a otra.
  showLoadingScreen (value)
  {
    this.inventoryManager.hideUI(value);
    this.barManager.hideUI(value);
    this.characterSheet.hideUI(value);
    this.labelManager.hideUI();
    this.buildUI.hideUI(value);
    this.loadingScreen.setVisible(value);
  }

  // Metodo que utilizamos para mostrar / ocultar la pantalla de muerte.
  showDeathScreen (value)
  {
    this.playerDeath = value;
    this.inventoryManager.hideUI(value);
    this.barManager.hideUI(value);
    this.characterSheet.hideUI(value);
    this.labelManager.hideUI();
    this.buildUI.hideUI(value);
    if((this.gameScene.scene.key === "start") | (this.gameScene.scene.key === "base"))
    {
      this.deathScreen.setVisibleQuit(value);
    }
    else
    {
      this.deathScreen.setVisibleContinue(value);
    }
  }

  // Metodo que utilizamos para mostrar / ocultar la pantalla de opciones.
  showOptionsScreen (value)
  {
    this.inventoryManager.hideUI(value);
    this.barManager.hideUI(value);
    this.characterSheet.hideUI(value);
    this.labelManager.hideUI();
    this.playerDeath = value;
    if(this.gameScene.scene.key === "base")
    {
      this.buildUI.hideUI(value);
    }
    if(this.gameScene.scene.key === "city")
    {
      this.dayTimeManager.dayTime.paused = value;
    }
    if(value)
    {
      this.gameScene.scene.pause();
    }
    else
    {
      this.gameScene.scene.resume();
    }
    this.optionsScreen.setVisible(value);
  }

  // Metodo que utilizamos durante el periodo de transicion entre escenas.
  loadingCallback (progress)
  {
    var p = Phaser.Math.RoundTo(progress, -1);
    this.loadingScreen.loadingBar.increment(p * 100);
  }

  // Metodo que utilizamos para saber si el jugador esta interactuando con algun elemento de la interfaz.
  playerInteracting ()
  {
    return (this.bagInteraction | this.containerInteraction | this.chestInteraction | this.buildingInteraction | this.buildInteraction | this.characterSheetInteraction | this.itemInteraction | this.questMapInteraction | this.confirmDialogInteraction | this.productionInteraction);
  }

  // Metodo que utilizamos para cerrar los paneles que se superponen con el que vamos a abrir.
  closeOverlapPanels (openPanel)
  {
    if(openPanel === "bag")
    {
      if(this.buildUI.visible)
      {
        this.buildUI.showBuildUI();
      }
    }
    else if(openPanel === "container")
    {
      if(this.characterSheet.visible)
      {
        this.characterSheet.showCharacterSheet();
      }
      if(this.buildUI.visible)
      {
        this.buildUI.showBuildUI();
      }
      if(this.buildingUI.visible)
      {
        this.buildingUI.showBuildingUI();
      }
    }
    else if(openPanel === "character-sheet")
    {
      if(this.inventoryManager.container.visible)
      {
        this.inventoryManager.showContainer();
      }
      if(this.buildUI.visible)
      {
        this.buildUI.showBuildUI();
      }
      if(this.buildingUI.visible)
      {
        this.buildingUI.showBuildingUI();
      }
    }
    else if(openPanel === "build-ui")
    {
      if(this.characterSheet.visible)
      {
        this.characterSheet.showCharacterSheet();
      }
      if(this.inventoryManager.bag.visible)
      {
        this.inventoryManager.showInventory();
      }
      if(this.inventoryManager.container.visible)
      {
        this.inventoryManager.showContainer();
      }
      if(this.buildingUI.visible)
      {
        this.buildingUI.showBuildingUI();
      }
    }
    else if(openPanel === "building-ui")
    {
      if(this.characterSheet.visible)
      {
        this.characterSheet.showCharacterSheet();
      }
      if(this.buildUI.visible)
      {
        this.buildUI.showBuildUI();
      }
    }
    else if(openPanel === "quest-ui")
    {
      if(this.characterSheet.visible)
      {
        this.characterSheet.showCharacterSheet();
      }
      if(this.inventoryManager.bag.visible)
      {
        this.inventoryManager.showInventory();
      }
      if(this.buildUI.visible)
      {
        this.buildUI.showBuildUI();
      }
    }
    else if(openPanel === "production-ui")
    {
      if(this.characterSheet.visible)
      {
        this.characterSheet.showCharacterSheet();
      }
      if(this.buildUI.visible)
      {
        this.buildUI.showBuildUI();
      }
    }
  }

  removeAllKeys ()
  {
    this.moveKeys.up.destroy();
    this.moveKeys.down.destroy();
    this.moveKeys.left.destroy();
    this.moveKeys.right.destroy();
    this.weaponKeys.melee.destroy();
    this.weaponKeys.gun.destroy();
    this.weaponKeys.machine_gun.destroy();
    this.weaponKeys.shot_gun.destroy();
    this.healKey.heal.destroy();
    this.inventoryKey.inventory.destroy();
    this.characterSheetKey.character.destroy();
    this.buildKey.build.destroy();
    this.optionsKey.options.destroy();
    this.input.keyboard.removeAllListeners();
  }

}
