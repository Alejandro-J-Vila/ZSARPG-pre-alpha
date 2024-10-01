import Bullet from "./bullet.js";

export default class Melee extends Bullet
{
  constructor (scene, x, y, key)
  {
    // Llamada al constructor de la clase base.
    super(scene, x, y, key);

    // Maximo tiempo de vida.
    this.dieTime = 100;
    // Velocidad.
    this.speed = 500;
    // Daño.
    this.damage = 0;
    // Tamaño.
    this.setSize(20, 20);

  }

}
