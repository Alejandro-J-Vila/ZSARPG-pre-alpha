import Item from "./item.js";

// Clase que representa una ametralladora.
export default class MachineGun extends Item
{
  constructor (config)
  {
    // Llamada al constructor de la clase base Item.
    super(config);

    // ATRIBUTOS

    this.damage; // Daño que inflinge al disparar.
    this.clipSize; // Tamaño del cargador.
    this.ammoCount; // Cantidad de municion en la recamara.

    //INICIALIZACION

    // CONFIGURACION

    if(config.damage)
    {
      this.damage = config.damage;
      this.clipSize = config.clipSize;
      this.ammoCount = config.ammoCount;
    }
    else
    {
      this.damage = 15;
      this.clipSize = 40;
      this.ammoCount = this.clipSize;
      // Seteamos el nombre del item.
      this.name = "M16";
      // Seteamos el tipo de item.
      this.type = "machine-gun";
    }
    // Seteamos la imagen del item.
    this.setFrame(this.type + ".png", false, false);

  }

  // Metodo que utilizamos al disparar para saber la cantidad de proyectiles que podemos disparar.
  shoot ()
  {
    var shotsToFire = 0;
    if(this.ammoCount >= 5)
    {
      this.ammoCount -= 5;
      shotsToFire = 5;
    }
    else
    {
      shotsToFire = this.ammoCount;
      this.ammoCount = 0;
    }
    return shotsToFire;
  }

  // Metodo que utilizamos para recargar el arma con la municion.
  reload (ammo)
  {
    var usedAmmo = 0;
    if(ammo.quantity >= this.clipSize)
    {
      usedAmmo = this.clipSize;
    }
    else
    {
      usedAmmo = ammo.quantity;
    }
    this.ammoCount = usedAmmo;
    ammo.use(usedAmmo);
  }

}
