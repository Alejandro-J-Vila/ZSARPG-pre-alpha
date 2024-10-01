import Enemy from "./enemy.js";

export default class Zombie extends Enemy
{
  constructor (config)
  {
    // Llamamos al constructor de la clase Enemy para que inicialice el mismo.
    super(config);

    // ATRIBUTOS

    this.name = "Regular Zombie";

    //INICIALIZACION

    // CONFIGURACION

  }

}
