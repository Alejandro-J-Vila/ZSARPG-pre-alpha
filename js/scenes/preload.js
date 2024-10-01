import LoadingScreen from "../ui/loading-screen.js";

// Usamos esta escena para cargar todas las cosas que se usaran durante el juego.
export default class PreloadScene extends Phaser.Scene
{
  constructor ()
  {
    super("preload");
  }

  preload ()
  {
    // Creamos las pantalla de carga.
    this.loadingScreen = new LoadingScreen(
      {
        scene: this,
        width: this.cameras.main.width,
        height: this.cameras.main.height,
        visible: true,
        background: "loading-screen"
      });

    // Actualizamos la pantalla de carga mientras dura la carga.
    this.load.on("progress", (value) =>
      {
        this.loadingScreen.loadingBar.increment(100 * value);
      });

    // Cargamos los tilesets que usamos para formar el mapa.
    this.load.image("placeholders", "./assets/tilesets/placeholders.png");
    this.load.image("floor-atlas", "./assets/tilesets/floor-atlas.png");
    this.load.image("wall-atlas", "./assets/tilesets/wall-atlas.png");
    this.load.image("roof-atlas", "./assets/tilesets/roof-atlas.png");
    this.load.image("door-atlas", "./assets/tilesets/door-atlas.png");
    this.load.image("window-atlas", "./assets/tilesets/window-atlas.png");

    // Cargamos la configuracion del mapa.
    this.load.tilemapTiledJSON("start-map", "./assets/tilemaps/maps/start.json");
    this.load.tilemapTiledJSON("base-map", "./assets/tilemaps/maps/base.json");
    this.load.tilemapTiledJSON("city-map", "./assets/tilemaps/maps/city.json");
    this.load.tilemapTiledJSON("brick-building", "./assets/tilemaps/buildings/brick-building.json");

    // Cargamos el atlas del jugador.
    //this.load.atlas("atlas", "./assets/atlas/atlas.png", "./assets/atlas/atlas.json");
    //this.load.atlas("atlas2", "./assets/atlas/atlas2.png", "./assets/atlas/atlas2.json");

    // Cargamos el atlas de los edificios.
    this.load.atlas("armory-atlas", "./assets/sprites/buildings/armory-atlas.png", "./assets/sprites/buildings/armory-atlas.json");
    this.load.atlas("barricade-atlas", "./assets/sprites/buildings/barricade-atlas.png", "./assets/sprites/buildings/barricade-atlas.json");
    this.load.atlas("farm-atlas", "./assets/sprites/buildings/farm-atlas.png", "./assets/sprites/buildings/farm-atlas.json");
    this.load.atlas("gas-station-atlas", "./assets/sprites/buildings/gas-station-atlas.png", "./assets/sprites/buildings/gas-station-atlas.json");
    this.load.atlas("hospital-atlas", "./assets/sprites/buildings/hospital-atlas.png", "./assets/sprites/buildings/hospital-atlas.json");
    this.load.atlas("main-building-atlas", "./assets/sprites/buildings/main-building-atlas.png", "./assets/sprites/buildings/main-building-atlas.json");
    this.load.atlas("storage-atlas", "./assets/sprites/buildings/storage-atlas.png", "./assets/sprites/buildings/storage-atlas.json");
    this.load.atlas("turret-atlas", "./assets/sprites/buildings/turret-atlas.png", "./assets/sprites/buildings/turret-atlas.json");

    // Cargamos el atlas de objetos.
    //this.load.image("chest", "./assets/sprites/chest.png");
    this.load.atlas("chest-atlas", "./assets/sprites/objects/chest-atlas.png", "./assets/sprites/objects/chest-atlas.json");
    //this.load.image("item", "./assets/sprites/item.png");
    this.load.atlas("item-atlas", "./assets/sprites/items/item-atlas.png", "./assets/sprites/items/item-atlas.json");
    //this.load.image("inventory-slot", "./assets/sprites/inventory-slot.png");
    this.load.atlas("slot-atlas", "./assets/sprites/slots/slot-atlas.png", "./assets/sprites/slots/slot-atlas.json");
    //this.load.image("close-button", "./assets/sprites/close-button.png");
    this.load.atlas("button-atlas", "./assets/sprites/buttons/button-atlas.png", "./assets/sprites/buttons/button-atlas.json");
    this.load.atlas("menu-button-atlas", "./assets/sprites/buttons/menu-button-atlas.png", "./assets/sprites/buttons/menu-button-atlas.json");

    // Cargamos las imagenes.
    this.load.image("window", "./assets/sprites/backgrounds/window.png");
    this.load.image("help-screen", "./assets/sprites/backgrounds/help-screen.png");
    this.load.image("large-window", "./assets/sprites/backgrounds/large-window.png");
    this.load.image("label", "./assets/sprites/backgrounds/label.png");
    this.load.image("you-died", "./assets/sprites/backgrounds/you-died.png");
    this.load.image("bullet", "./assets/sprites/bullet.png");
    this.load.image("melee", "./assets/sprites/melee.png");
    this.load.image("enemy", "./assets/sprites/enemy.png");
    this.load.image("player", "./assets/sprites/player.png");


  }

  create ()
  {
    /*
    // Creamos las animaciones del jugador desde el atlas de texturas.
    this.anims.create(
      {
        key: "misa-left-walk",
        frames: this.anims.generateFrameNames("atlas", { prefix: "misa-left-walk.", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1
      }
    );
    this.anims.create(
      {
        key: "misa-right-walk",
        frames: this.anims.generateFrameNames("atlas", { prefix: "misa-right-walk.", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1
      }
    );
    this.anims.create(
      {
        key: "misa-front-walk",
        frames: this.anims.generateFrameNames("atlas", { prefix: "misa-front-walk.", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1
      }
    );
    this.anims.create(
      {
        key: "misa-back-walk",
        frames: this.anims.generateFrameNames("atlas", { prefix: "misa-back-walk.", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1
      }
    );
    // Creamos las animaciones del jugador desde el atlas de texturas.
    this.anims.create(
      {
        key: "zombie-left-walk",
        frames: this.anims.generateFrameNames("atlas2", { prefix: "misa-left-walk.", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1
      }
    );
    this.anims.create(
      {
        key: "zombie-right-walk",
        frames: this.anims.generateFrameNames("atlas2", { prefix: "misa-right-walk.", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1
      }
    );
    this.anims.create(
      {
        key: "zombie-front-walk",
        frames: this.anims.generateFrameNames("atlas2", { prefix: "misa-front-walk.", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1
      }
    );
    this.anims.create(
      {
        key: "zombie-back-walk",
        frames: this.anims.generateFrameNames("atlas2", { prefix: "misa-back-walk.", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1
      }
    );
    */
    this.scene.start("main-menu");
  }
}
