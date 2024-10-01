import Item from "./item.js";

// Clase que representa una pistola.
export default class Gun extends Item
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
      this.damage = 25;
      this.clipSize = 8;
      this.ammoCount = this.clipSize;
      // Seteamos el nombre del item.
      this.name = "Colt";
      // Seteamos el tipo de item.
      this.type = "gun";
    }
    // Seteamos la imagen del item.
    this.setFrame(this.type + ".png", false, false);

  }

  // Metodo que utilizamos al disparar para saber la cantidad de proyectiles que podemos disparar.
  shoot ()
  {
    // Cantidad de proyectiles a disparar.
    var shotsToFire = 0;
    // Si la cantidad de balas en la recamara es mayor o igual a 1, podemos disparar.
    if(this.ammoCount >= 1)
    {
      // Actualizamos la cantidad de municion.
      this.ammoCount--;
      // Seteamos la cantidad de disparos a realizar.
      shotsToFire = 1;
    }
    // Si la cantidad de balas en la recamara es menor a 0, ya utilizamos todos los proyectiles.
    if(this.ammoCount < 0)
    {
      // Actualizamos la cantidad de municion.
      this.ammoCount = 0;
    }
    // Devolvemos la cantidad de disparos a realizar.
    return shotsToFire;
  }

  // Metodo que utilizamos para recargar el arma con la municion.
  reload (ammo)
  {
    // Cantidad de municion utilizada.
    var usedAmmo = 0;
    // Si la cantidad total de municion supera o es igual a la capacidad del cargador...
    if(ammo.quantity >= this.clipSize)
    {
      // La cantidad de municion utilizada es igual a la capacidad del cargador.
      usedAmmo = this.clipSize;
    }
    else
    {
      // Sino, la cantidad de municion utilizada es la que tenemos.
      usedAmmo = ammo.quantity;
    }
    // Agregamos la cantidad de municion calculada a la recamara.
    this.ammoCount = usedAmmo;
    // Restamos dicha cantidad a la municion que tenemos.
    ammo.use(usedAmmo);
  }

}
