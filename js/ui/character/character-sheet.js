import Button from "../button.js";

// Clase que muestra las estadisticas y atributos del personaje.
export default class CharacterSheet
{
  constructor (config)
  {
    // ATRIBUTOS

    this.scene; // La escena donde se ubicara la hoja de personaje.
    this.x; // La posicion de la hoja de personaje en x.
    this.y; // La posicion de la hoja de personaje en y.
    this.visible; // Si es visible o no al momento de la creacion.
    this.background; // Imagen de fondo de la hoja de personaje.
    this.bgOrigin; // Origen de la hoja de personaje para luego alinear el resto de las cosas que contiene
    this.closeButton; // Boton para cerrar la hoja de personaje.
    this.characterSheetButton; // Boton de interfaz para mostrar / ocultar la hoja de personaje.
    this.levelUpButton;

    this.name; // Nombre del personaje.
    this.level; // Nivel del personaje.
    this.xp; // Experiencia del personaje.
    this.maxXP; // Maximo de experiencia.
    this.health; // Salud del personaje.
    this.maxHealth; // Maxima salud del personaje.
    this.strength; // Fuerza del personaje.
    this.dexterity; // Destreza del personaje.
    this.intelligence; // Inteligencia del personaje.
    this.vitality; // Vitalidad del personaje.
    this.moveSpeed; // Velocidad de movimiento del jugador.
    this.attackSpeed;
    this.pointsLeft;
    this.plusStrength;
    this.plusDexterity
    this.plusIntelligence;
    this.plusVitality;

    this.nameTxt; // Texto que muestra el nombre del personaje.
    this.levelTxt; // Texto que muestra el nivel del personaje.
    this.xpTxt; // Texto que muestra la experiencia actual y maxima del personaje.
    this.healthTxt; // Texto que muestra la salud actual y maxima del personaje.
    this.strengthTxt; // Texto que muestra la fuerza del personaje.
    this.dexterityTxt; // Texto que muestra la destreza del personaje.
    this.intelligenceTxt; // Texto que muestra la inteligencia del personaje.
    this.vitalityTxt; // Texto que muestra la vitalidad del personaje.
    this.moveSpeedTxt;
    this.attackSpeedTxt;
    this.pointsLeftTxt;

    this.infoText;
    this.nameValueTxt; // Texto que muestra el nombre del personaje.
    this.levelValueTxt; // Texto que muestra el nivel del personaje.
    this.xpValueTxt; // Texto que muestra la experiencia actual y maxima del personaje.
    this.healthValueTxt; // Texto que muestra la salud actual y maxima del personaje.
    this.mainStatsText;
    this.strengthValueTxt; // Texto que muestra la fuerza del personaje.
    this.dexterityValueTxt; // Texto que muestra la destreza del personaje.
    this.intelligenceValueTxt; // Texto que muestra la inteligencia del personaje.
    this.vitalityValueTxt; // Texto que muestra la vitalidad del personaje.
    this.secStatsText;
    this.moveSpeedValueTxt;
    this.attackSpeedValueTxt;
    this.pointsLeftValueTxt;

    this.statsButtons;
    this.plusStrButton;
    this.minusStrButton;
    this.plusDexButton;
    this.minusDexButton;
    this.plusIntButton;
    this.minusIntButton;
    this.plusVitButton;
    this.minusVitButton;
    this.confirmButton;
    this.cancelButton;

    this.hidden;

    // INICIALIZACION

    this.scene = config.scene;
    this.x = config.x / 4;
    this.y = config.y / 2;
    this.visible = config.visible;

    this.hidden = false;

    this.background = config.scene.add.image(this.x, this.y - 32, config.background);
    //this.background.setDisplaySize(380, 523);

    this.bgOrigin = this.background.getTopLeft();

    this.title = config.scene.add.text(this.x, this.y, "Character Sheet", { font: '30px Arial', fill: '#FFFFFF' });
    Phaser.Display.Align.In.TopCenter(this.title, this.background, 0, -10);

    this.plusStrength = 0;
    this.plusDexterity = 0;
    this.plusIntelligence = 0;
    this.plusVitality = 0;

    this.nameTxt = config.scene.add.text(this.x, this.y, "Name: ", { font: '16px Arial', fill: '#FFFFFF' });
    this.levelTxt = config.scene.add.text(this.x, this.y, "Level: ", { font: '16px Arial', fill: '#FFFFFF' });
    this.xpTxt = config.scene.add.text(this.x, this.y, "Experience: ", { font: '16px Arial', fill: '#FFFFFF' });
    this.healthTxt = config.scene.add.text(this.x, this.y, "Health: ", { font: '16px Arial', fill: '#FFFFFF' });
    this.strengthTxt = config.scene.add.text(this.x, this.y, "Strength: ", { font: '16px Arial', fill: '#FFFFFF' });
    this.dexterityTxt = config.scene.add.text(this.x, this.y, "Dexterity: ", { font: '16px Arial', fill: '#FFFFFF' });
    this.intelligenceTxt = config.scene.add.text(this.x, this.y, "Accuracy: ", { font: '16px Arial', fill: '#FFFFFF' });
    this.vitalityTxt = config.scene.add.text(this.x, this.y, "Vitality: ", { font: '16px Arial', fill: '#FFFFFF' });
    this.moveSpeedTxt = config.scene.add.text(this.x, this.y, "Movement Speed: ", { font: '16px Arial', fill: '#FFFFFF' });
    this.attackSpeedTxt = config.scene.add.text(this.x, this.y, "Attack Speed: ", { font: '16px Arial', fill: '#FFFFFF' });
    this.pointsLeftTxt = config.scene.add.text(this.x, this.y, "Points Left: ", { font: '16px Arial', fill: '#FFFFFF' });

    this.nameValueTxt = config.scene.add.text(this.x, this.y, "", { font: '16px Arial', fill: '#FFFFFF' });
    this.levelValueTxt = config.scene.add.text(this.x, this.y, "", { font: '16px Arial', fill: '#FFFFFF' });
    this.xpValueTxt = config.scene.add.text(this.x, this.y, "", { font: '16px Arial', fill: '#FFFFFF' });
    this.healthValueTxt = config.scene.add.text(this.x, this.y, "", { font: '16px Arial', fill: '#FFFFFF' });
    this.strengthValueTxt = config.scene.add.text(this.x, this.y, "", { font: '16px Arial', fill: '#FFFFFF' });
    this.dexterityValueTxt = config.scene.add.text(this.x, this.y, "", { font: '16px Arial', fill: '#FFFFFF' });
    this.intelligenceValueTxt = config.scene.add.text(this.x, this.y, "", { font: '16px Arial', fill: '#FFFFFF' });
    this.vitalityValueTxt = config.scene.add.text(this.x, this.y, "", { font: '16px Arial', fill: '#FFFFFF' });
    this.moveSpeedValueTxt = config.scene.add.text(this.x, this.y, "", { font: '16px Arial', fill: '#FFFFFF' });
    this.attackSpeedValueTxt = config.scene.add.text(this.x, this.y, "", { font: '16px Arial', fill: '#FFFFFF' });
    this.pointsLeftValueTxt = config.scene.add.text(this.x, this.y, "", { font: '16px Arial', fill: '#FFFFFF' });

    this.infoText = [this.nameValueTxt, this.levelValueTxt, this.xpValueTxt];
    this.mainStatsText = [this.strengthValueTxt, this.dexterityValueTxt, this.intelligenceValueTxt, this.vitalityValueTxt, this.pointsLeftValueTxt];
    this.secStatsText = [this.healthValueTxt, this.moveSpeedValueTxt, this.attackSpeedValueTxt];

    this.plusStrButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x,
        y: this.bgOrigin.y,
        backgroundKey: "button-atlas",
        backgroundFrame: "add-point.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -20,
        labelWidth: 50,
        labelHeight: 30,
        labelText: "Add point to stat"
      });

    this.minusStrButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x,
        y: this.bgOrigin.y,
        backgroundKey: "button-atlas",
        backgroundFrame: "remove-point.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -20,
        labelWidth: 50,
        labelHeight: 30,
        labelText: "Remove point from stat"
      });

    this.plusDexButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x,
        y: this.bgOrigin.y,
        backgroundKey: "button-atlas",
        backgroundFrame: "add-point.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -20,
        labelWidth: 50,
        labelHeight: 30,
        labelText: "Add point to stat"
      });

    this.minusDexButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x,
        y: this.bgOrigin.y,
        backgroundKey: "button-atlas",
        backgroundFrame: "remove-point.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -20,
        labelWidth: 50,
        labelHeight: 30,
        labelText: "Remove point from stat"
      });

    this.plusIntButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x,
        y: this.bgOrigin.y,
        backgroundKey: "button-atlas",
        backgroundFrame: "add-point.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -20,
        labelWidth: 50,
        labelHeight: 30,
        labelText: "Add point to stat"
      });

    this.minusIntButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x,
        y: this.bgOrigin.y,
        backgroundKey: "button-atlas",
        backgroundFrame: "remove-point.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -20,
        labelWidth: 50,
        labelHeight: 30,
        labelText: "Remove point from stat"
      });

    this.plusVitButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x,
        y: this.bgOrigin.y,
        backgroundKey: "button-atlas",
        backgroundFrame: "add-point.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -20,
        labelWidth: 50,
        labelHeight: 30,
        labelText: "Add point to stat"
      });

    this.minusVitButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x,
        y: this.bgOrigin.y,
        backgroundKey: "button-atlas",
        backgroundFrame: "remove-point.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -20,
        labelWidth: 50,
        labelHeight: 30,
        labelText: "Remove point from stat"
      });

    this.confirmButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x,
        y: this.bgOrigin.y,
        backgroundKey: "button-atlas",
        backgroundFrame: "accept.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -20,
        labelWidth: 50,
        labelHeight: 30,
        labelText: "Confirm spent points"
      });

    this.cancelButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x,
        y: this.bgOrigin.y,
        backgroundKey: "button-atlas",
        backgroundFrame: "cancel.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -20,
        labelWidth: 50,
        labelHeight: 30,
        labelText: "Cancel spent points"
      });

    this.statButtons = [this.plusStrButton, this.minusStrButton, this.plusDexButton, this.minusDexButton, this.plusIntButton, this.minusIntButton, this.plusVitButton, this.minusVitButton, this.confirmButton, this.cancelButton];

    this.closeButton = new Button(
      {
        scene: config.scene,
        x: this.bgOrigin.x + 353,
        y: this.bgOrigin.y + 25,
        backgroundKey: "button-atlas",
        backgroundFrame: "close.png",
        visible: false,
        labelOffsetX: 0,
        labelOffsetY: -20,
        labelWidth: 50,
        labelHeight: 30,
        labelText: "Close"
      });

    this.characterSheetButton = new Button(
      {
        scene: config.scene,
        x: config.x - 70,
        y: config.y - 30,
        backgroundKey: "button-atlas",
        backgroundFrame: "character-sheet.png",
        visible: true,
        labelOffsetX: -35,
        labelOffsetY: -31,
        labelWidth: 197,
        labelHeight: 30,
        labelText: "Open Character Sheet (C)"
      });

    this.levelUpButton = new Button(
      {
        scene: config.scene,
        x: config.x / 2,
        y: config.y - 200,
        backgroundKey: "button-atlas",
        backgroundFrame: "player-level-up.png",
        visible: false,
        labelOffsetX: -35,
        labelOffsetY: -31,
        labelWidth: 197,
        labelHeight: 30,
        labelText: "Level UP"
      });

    // CONFIGURACION

    this.background.setVisible(config.visible);

    this.title.setVisible(config.visible);

    this.nameTxt.setVisible(config.visible);
    this.levelTxt.setVisible(config.visible);
    this.xpTxt.setVisible(config.visible);
    this.healthTxt.setVisible(config.visible);
    this.strengthTxt.setVisible(config.visible);
    this.dexterityTxt.setVisible(config.visible);
    this.intelligenceTxt.setVisible(config.visible);
    this.vitalityTxt.setVisible(config.visible);
    this.moveSpeedTxt.setVisible(config.visible);
    this.attackSpeedTxt.setVisible(config.visible);
    this.pointsLeftTxt.setVisible(false);

    this.nameValueTxt.setVisible(config.visible);
    this.levelValueTxt.setVisible(config.visible);
    this.xpValueTxt.setVisible(config.visible);
    this.healthValueTxt.setVisible(config.visible);
    this.strengthValueTxt.setVisible(config.visible);
    this.dexterityValueTxt.setVisible(config.visible);
    this.intelligenceValueTxt.setVisible(config.visible);
    this.vitalityValueTxt.setVisible(config.visible);
    this.moveSpeedValueTxt.setVisible(config.visible);
    this.attackSpeedValueTxt.setVisible(config.visible);
    this.pointsLeftValueTxt.setVisible(false);

    var info = [this.nameTxt, this.levelTxt, this.xpTxt];
    var main = [this.strengthTxt, this.dexterityTxt, this.intelligenceTxt, this.vitalityTxt, this.pointsLeftTxt];
    var sec = [this.healthTxt, this.moveSpeedTxt, this.attackSpeedTxt];

    Phaser.Actions.GridAlign(info,
      {
        width: 1,
        height: info.length,
        cellWidth: 30,
        cellHeight: 30,
        x: this.bgOrigin.x + 50,
        y: this.bgOrigin.y + 70
      });

    Phaser.Actions.GridAlign(main,
      {
        width: 1,
        height: main.length,
        cellWidth: 30,
        cellHeight: 35,
        x: this.bgOrigin.x + 50,
        y: this.bgOrigin.y + 200
      });

    Phaser.Actions.GridAlign(sec,
      {
        width: 1,
        height: sec.length,
        cellWidth: 30,
        cellHeight: 30,
        x: this.bgOrigin.x + 50,
        y: this.bgOrigin.y + 400
      });

    this.plusStrButton.on('pointerdown', (pointer) =>
    {
      if(this.pointsLeft > 0)
      {
        this.plusStrength++;
        this.strength++;
        this.pointsLeft--;
        this.updateStrength();
        this.updatePointsLeft();
      }
    });

    this.minusStrButton.on('pointerdown', (pointer) =>
    {
      if(this.plusStrength > 0)
      {
        this.plusStrength--;
        this.strength--;
        this.pointsLeft++;
        this.updateStrength();
        this.updatePointsLeft();
      }
    });

    this.plusDexButton.on('pointerdown', (pointer) =>
    {
      if(this.pointsLeft > 0)
      {
        this.plusDexterity++;
        this.dexterity++;
        this.pointsLeft--;
        this.updateDexterity();
        this.updatePointsLeft();
      }
    });

    this.minusDexButton.on('pointerdown', (pointer) =>
    {
      if(this.plusDexterity > 0)
      {
        this.plusDexterity--;
        this.dexterity--;
        this.pointsLeft++;
        this.updateDexterity();
        this.updatePointsLeft();
      }
    });

    this.plusIntButton.on('pointerdown', (pointer) =>
    {
      if(this.pointsLeft > 0)
      {
        this.plusIntelligence++;
        this.intelligence++;
        this.pointsLeft--;
        this.updateIntelligence();
        this.updatePointsLeft();
      }
    });

    this.minusIntButton.on('pointerdown', (pointer) =>
    {
      if(this.plusIntelligence > 0)
      {
        this.plusIntelligence--;
        this.intelligence--;
        this.pointsLeft++;
        this.updateIntelligence();
        this.updatePointsLeft();
      }
    });

    this.plusVitButton.on('pointerdown', (pointer) =>
    {
      if(this.pointsLeft > 0)
      {
        this.plusVitality++;
        this.vitality++;
        this.pointsLeft--;
        this.updateVitality();
        this.updatePointsLeft();
      }
    });

    this.minusVitButton.on('pointerdown', (pointer) =>
    {
      if(this.plusVitality > 0)
      {
        this.plusVitality--;
        this.vitality--;
        this.pointsLeft++;
        this.updateVitality();
        this.updatePointsLeft();
      }
    });

    this.confirmButton.on('pointerdown', (pointer) =>
    {
      this.plusStrength = 0;
      this.plusDexterity = 0;
      this.plusIntelligence = 0;
      this.plusVitality = 0;
      if(this.pointsLeft === 0)
      {
        this.showLevelUpUI(false);
      }
    });

    this.cancelButton.on('pointerdown', (pointer) =>
    {
      this.strength -= this.plusStrength;
      this.dexterity -= this.plusDexterity;
      this.intelligence -= this.plusIntelligence;
      this.vitality -= this.plusVitality;
      this.pointsLeft += this.plusStrength + this.plusDexterity + this.plusIntelligence + this.plusVitality;
      this.updateStrength();
      this.updateDexterity();
      this.updateIntelligence();
      this.updateVitality();
      this.updatePointsLeft();
      this.plusStrength = 0;
      this.plusDexterity = 0;
      this.plusIntelligence = 0;
      this.plusVitality = 0;
    });

    Phaser.Actions.GridAlign(this.statButtons,
      {
        width: 2,
        height: this.statButtons.length,
        cellWidth: 33,
        cellHeight: 35,
        x: this.bgOrigin.x + 200,
        y: this.bgOrigin.y + 195
      });

    for(var i = 0; i < this.statButtons.length; i++)
    {
      this.statButtons[i].adjustLabel();
    }

    this.closeButton.on('pointerdown', (pointer) =>
    {
      this.showCharacterSheet();
    });

    this.characterSheetButton.on('pointerdown', (pointer) =>
    {
      this.showCharacterSheet();
    });

    this.levelUpButton.on('pointerdown', (pointer) =>
    {
      this.showCharacterSheet();
    });

  }

  // Metodo que utilizamos para mostrar / ocultar la hoja de personaje.
  showCharacterSheet ()
  {
    if(this.hidden)
    {
      return;
    }
    if(this.visible)
    {
      this.setVisible(false);
      this.characterSheetButton.clearTint();
      this.scene.characterSheetInteraction = false;
    }
    else
    {
      this.scene.closeOverlapPanels("character-sheet");
      this.setVisible(true);
      this.characterSheetButton.setTint(0xff0000);
      this.scene.characterSheetInteraction = true;
    }
  }

  // Metodo que utilizamos para cambiar la visibilidad de la hoja de personaje.
  setVisible (value)
  {
    this.visible = value;
    this.background.setVisible(value);
    this.title.setVisible(value);
    this.closeButton.setVisible(value);

    this.nameTxt.setVisible(value);
    this.levelTxt.setVisible(value);
    this.xpTxt.setVisible(value);
    this.healthTxt.setVisible(value);
    this.strengthTxt.setVisible(value);
    this.dexterityTxt.setVisible(value);
    this.intelligenceTxt.setVisible(value);
    this.vitalityTxt.setVisible(value);
    this.moveSpeedTxt.setVisible(value);
    this.attackSpeedTxt.setVisible(value);

    this.nameValueTxt.setVisible(value);
    this.levelValueTxt.setVisible(value);
    this.xpValueTxt.setVisible(value);
    this.healthValueTxt.setVisible(value);
    this.strengthValueTxt.setVisible(value);
    this.dexterityValueTxt.setVisible(value);
    this.intelligenceValueTxt.setVisible(value);
    this.vitalityValueTxt.setVisible(value);
    this.moveSpeedValueTxt.setVisible(value);
    this.attackSpeedValueTxt.setVisible(value);

    if(this.pointsLeft > 0)
    {
      this.showLevelUpUI(value);
      this.levelUpButton.setVisible(!value);
    }

    if(this.pointsLeft === 0)
    {
      this.levelUpButton.setVisible(false);
    }
  }

  showLevelUpUI (value)
  {
    for(var i = 0; i < this.statButtons.length; i++)
    {
      this.statButtons[i].setVisible(value);
    }
    this.pointsLeftTxt.setVisible(value);
    this.pointsLeftValueTxt.setVisible(value);
  }

  // Metodo que utilizamos para alinear el texto de la hoja de personaje.
  alignText ()
  {
    Phaser.Actions.GridAlign(this.infoText,
      {
        width: 1,
        height: this.infoText.length,
        cellWidth: 30,
        cellHeight: 30,
        x: this.bgOrigin.x + 150,
        y: this.bgOrigin.y + 70
      });

    Phaser.Actions.GridAlign(this.mainStatsText,
      {
        width: 1,
        height: this.mainStatsText.length,
        cellWidth: 30,
        cellHeight: 35,
        x: this.bgOrigin.x + 150,
        y: this.bgOrigin.y + 200
      });

    Phaser.Actions.GridAlign(this.secStatsText,
      {
        width: 1,
        height: this.secStatsText.length,
        cellWidth: 30,
        cellHeight: 30,
        x: this.bgOrigin.x + 200,
        y: this.bgOrigin.y + 400
      });
  }

  startCharacter (config)
  {
    this.name = config.name;
    this.level = config.level;
    this.xp = config.xp;
    this.maxXP = config.maxXP;
    this.health = config.health;
    this.maxHealth = config.maxHealth;
    this.strength = config.strength;
    this.dexterity = config.dexterity;
    this.intelligence = config.intelligence;
    this.vitality = config.vitality;
    this.moveSpeed = config.moveSpeed;
    this.attackSpeed = config.attackSpeed;
    this.pointsLeft = config.pointsLeft;

    this.nameValueTxt.setText(this.name);
    this.levelValueTxt.setText(this.level);
    this.xpValueTxt.setText(this.xp + "/" + this.maxXP);
    this.healthValueTxt.setText(this.health + "/" + this.maxHealth);
    this.strengthValueTxt.setText(this.strength);
    this.dexterityValueTxt.setText(this.dexterity);
    this.intelligenceValueTxt.setText(this.intelligence);
    this.vitalityValueTxt.setText(this.vitality);
    this.moveSpeedValueTxt.setText(this.moveSpeed);
    this.attackSpeedValueTxt.setText(this.attackSpeed);
    this.pointsLeftValueTxt.setText(this.pointsLeft);
    this.alignText();

    this.scene.barManager.setPlayerHealth(this.health, this.maxHealth);
    this.scene.barManager.setPlayerXP(this.xp, this.maxXP);
  }

  gainExperience (value)
  {
    this.xp += value;
    if(this.xp >= this.maxXP)
    {
      this.xp -= this.maxXP;
      this.maxXP *= 2;
      this.level++;
      this.pointsLeft += 5;
      this.updateXP();
      this.updateMaxXP();
      this.updateLevel();
      this.updatePointsLeft();
      this.levelUpButton.setVisible(true);
      this.scene.barManager.setPlayerXP(this.xp, this.maxXP);
    }
    else
    {
      this.updateXP();
      this.scene.barManager.increaseXP(value);
    }
  }

  gainHealth (item)
  {
    var healAmount = 0;
    // Si el jugador esta al maximo de salud, no lo curamos.
    if(this.health === this.maxHealth)
    {
      this.scene.notificationManager.showMessage("full_health");
      return;
    }
    // Obtenemos la cantidad a curar.
    if(item === null)
    {
      healAmount = this.scene.inventoryManager.belt.useHealthItem();
    }
    else
    {
      healAmount = this.scene.inventoryManager.useItem(item);
    }
    // Aplicamos la curacion.
    this.health += healAmount;
    // Si la curacion sobrepasa el maximo, ajustamos el valor.
    if(this.health > this.maxHealth)
    {
      this.health = this.maxHealth;
    }
    this.updateHealth();
    this.scene.barManager.healPlayerHealth(healAmount);
  }

  fullHeal ()
  {
    this.health = this.maxHealth;
    this.updateHealth();
    this.scene.barManager.healPlayerHealth(this.health);
  }

  takeDamage (value)
  {
    if(this.scene.gameScene.player.dead)
    {
      return;
    }
    this.health -= value;
    if(this.health <= 0)
    {
      this.health = 0;
      this.scene.gameScene.player.die();
      this.scene.showDeathScreen(true);
    }
    this.updateHealth();
    this.scene.barManager.damagePlayerHealth(value);
  }

  updateLevel ()
  {
    this.levelValueTxt.setText(this.level);
    this.alignText();
  }

  updateXP ()
  {
    this.xpValueTxt.setText(this.xp + "/" + this.maxXP);
    this.alignText();
  }

  updateMaxXP ()
  {
    this.xpValueTxt.setText(this.xp + "/" + this.maxXP);
    this.alignText();
  }

  updateHealth ()
  {
    this.healthValueTxt.setText(this.health + "/" + this.maxHealth);
    this.alignText();
  }

  updateMaxHealth ()
  {
    this.healthValueTxt.setText(this.health + "/" + this.maxHealth);
    this.alignText();
  }

  updateStrength ()
  {
    this.strengthValueTxt.setText(this.strength);
    this.alignText();
  }

  updateDexterity ()
  {
    this.dexterityValueTxt.setText(this.dexterity);
    this.alignText();
  }

  updateIntelligence ()
  {
    this.intelligenceValueTxt.setText(this.intelligence);
    this.alignText();
  }

  updateVitality ()
  {
    this.vitalityValueTxt.setText(this.vitality);
    this.alignText();
  }

  updateMoveSpeed ()
  {
    this.moveSpeedValueTxt.setText(this.moveSpeed);
    this.alignText();
  }

  updateAttackSpeed ()
  {
    this.attackSpeedValueTxt.setText(this.attackSpeed);
    this.alignText();
  }

  updatePointsLeft ()
  {
    this.pointsLeftValueTxt.setText(this.pointsLeft);
    this.alignText();
  }

  // Metodo que utilizamos para mostrar / ocultar el boton de hoja de personaje en la interfaz.
  hideUI (value)
  {
    this.hidden = value;
    this.characterSheetButton.setVisible(!value);
    if(this.pointsLeft > 0)
    {
      this.levelUpButton.setVisible(!value);
    }
  }
}
