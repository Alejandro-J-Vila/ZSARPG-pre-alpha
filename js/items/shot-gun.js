import Item from "./item.js";

// Clase que representa una escopeta.
export default class ShotGun extends Item
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
      this.damage = 30;
      this.clipSize = 25;
      this.ammoCount = this.clipSize;
      // Seteamos el nombre del item.
      this.name = "Remington";
      // Seteamos el tipo de item.
      this.type = "shot-gun";
    }
    // Seteamos la imagen del item.
    this.setFrame(this.type + ".png", false, false);

  }

  // Metodo que utilizamos al disparar para saber la cantidad de proyectiles que podemos disparar.
  shoot ()
  {
    // Cantidad de proyectiles a disparar.
    var shotsToFire = 0;
    // Si la cantidad de balas en la recamara es mayor o igual a 5, podemos disparar.
    if(this.ammoCount >= 5)
    {
      // Actualizamos la cantidad de municion.
      this.ammoCount -= 5;
      // Seteamos la cantidad de disparos a realizar.
      shotsToFire = 5;
    }
    else
    {
      // Sino, utilizamos los proyectiles que quedan.
      shotsToFire = this.ammoCount;
      // Y actualizamos la cantidad de municion.
      this.ammoCount = 0;
    }
    // Devolvemos la cantidad de disparos a realizar.
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
