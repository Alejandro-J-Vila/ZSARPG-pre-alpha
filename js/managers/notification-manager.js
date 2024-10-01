// Clase que se encarga de administrar los mensaje informativos que se generan en el juego.
export default class NotificationManager
{
  constructor (config)
  {
    // ATRIBUTOS

    this.scene; // Escena donde se muestran los mensajes.
    this.text; // Campo de texto donde se muestran los mensajes.
    this.lastMessageKey; // Clave del ultimo mensaje enviado.
    this.messageDict; // Diccionario de mensajes.

    // INICIALIZACION

    this.scene = config.scene;
    this.text = config.scene.add.text(config.x / 2, config.y / 4, "", { font: '14px Arial', fill: '#FFFFFF' });
    this.lastMessageKey = "";
    this.messageDict = {};

    // CONFIGURACION

    this.text.setOrigin(0.5);
    this.text.setVisible(false);
    this.messageDict["full_health"] = "You are at full health";
    this.messageDict["food_consumed"] = "Food rations consumed ";
    this.messageDict["no_food"] = "Not enough food rations for the day. Health penalty received";
    this.messageDict["no_materials"] = "Not enough materials. You need ";
    this.messageDict["no_production"] = "Not enough resources to start production";
    this.messageDict["no_time"] = "Not enough time to complete this mission";
    this.messageDict["inventory_full"] = "Your bag is full";
    this.messageDict["container_full"] = "This container is full";
    this.messageDict["no_weapon"] = "You don't have any weapon equipped in that slot";
    this.messageDict["no_health"] = "You don't have any first-aid item equipped";
    this.messageDict["no_ammo"] = "You don't have ammo for that weapon";
    this.messageDict["item_stored"] = "You stored";
    this.messageDict["cant_build"] = "You can't build in this place";

  }

  // Metodo que utilizamos para mostrar un mensaje.
  showMessage (msj_key, value="")
  {
    // Si el texto esta visible y el mensaje es el mismo, no hacemos nada.
    if((this.text.visible) & (msj_key === this.lastMessageKey))
    {
      return;
    }
    // Sino, mostramos el mensaje.
    this.lastMessageKey = msj_key;
    var msj = "" + this.messageDict[msj_key] + value + ".";
    this.text.setText(msj);
    this.text.setVisible(true);
    // Luego de un delay, lo ocultamos.
    this.scene.time.addEvent(
      {
        delay: 3000,
        callback: () => { this.text.setVisible(false); }
      });
  }
}
