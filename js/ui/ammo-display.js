import Button from "./button.js";

export default class AmmoDisplay
{
  constructor (config)
  {
    // ATRIBUTOS

    this.scene;
    this.gunAmmo;
    this.mGunAmmo;
    this.sGunAmmo;
    this.weaponAmmoCount;
    this.ammoCount;

    // INICIALIZACION

    this.scene = config.scene;

    this.gunAmmo = new Button(
      {
        scene: config.scene,
        x: 50,
        y: config.y - 35,
        backgroundKey: "item-atlas",
        backgroundFrame: "gun-ammo.png",
        visible: config.visible,
        labelOffsetX: 0,
        labelOffsetY: -40,
        labelText: "Gun Ammo"
      });

    this.mGunAmmo = new Button(
      {
        scene: config.scene,
        x: 50,
        y: config.y - 35,
        backgroundKey: "item-atlas",
        backgroundFrame: "machine-gun-ammo.png",
        visible: config.visible,
        labelOffsetX: 30,
        labelOffsetY: -40,
        labelText: "Machine Gun Ammo"
      });

    this.sGunAmmo = new Button(
      {
        scene: config.scene,
        x: 50,
        y: config.y - 35,
        backgroundKey: "item-atlas",
        backgroundFrame: "shot-gun-ammo.png",
        visible: config.visible,
        labelOffsetX: 20,
        labelOffsetY: -40,
        labelText: "Shot Gun Ammo"
      });

    this.weaponAmmoCount = config.scene.add.text(85, config.y - 35, "X/", { font: '30px Arial', fill: '#FFFFFF' });
    this.ammoCount = config.scene.add.text(85 + this.weaponAmmoCount.width, config.y - 30, "x", { font: '25px Arial', fill: '#FFFFFF' });

    //CONFIGURACION

    this.gunAmmo.setVisible(config.visible);
    this.mGunAmmo.setVisible(config.visible);
    this.sGunAmmo.setVisible(config.visible);
    this.weaponAmmoCount.setVisible(config.visible);
    this.ammoCount.setVisible(config.visible);
  }

  showAmmo (weapon, ammo, type, value)
  {
    if(!value)
    {
      this.gunAmmo.setVisible(value);
      this.mGunAmmo.setVisible(value);
      this.sGunAmmo.setVisible(value);
    }
    else if(type === "gun")
    {
      this.gunAmmo.setVisible(value);
      this.mGunAmmo.setVisible(!value);
      this.sGunAmmo.setVisible(!value);
    }
    else if(type === "machine-gun")
    {
      this.gunAmmo.setVisible(!value);
      this.mGunAmmo.setVisible(value);
      this.sGunAmmo.setVisible(!value);
    }
    else if(type === "shot-gun")
    {
      this.gunAmmo.setVisible(!value);
      this.mGunAmmo.setVisible(!value);
      this.sGunAmmo.setVisible(value);
    }

    if(weapon != undefined)
    {
      this.updateWeaponAmmoCount(weapon.ammoCount);
    }

    this.weaponAmmoCount.setVisible(value);

    if(ammo != undefined)
    {
      this.ammoCount.setText(ammo.quantity);
    }
    else
    {
      this.ammoCount.setText(0);
    }

    this.ammoCount.setVisible(value);
  }

  updateWeaponAmmoCount (value)
  {
    this.weaponAmmoCount.setText(value + "/");
    this.ammoCount.setPosition(85 + this.weaponAmmoCount.width, this.ammoCount.y);
  }

  updateAmmoCount (value)
  {
    this.ammoCount.setText(value);
  }
}
