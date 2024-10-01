// Clase que se encarga de manejar el transcurso del tiempo dentro del juego.
export default class DayTimeManager
{
  constructor (config)
  {
    // ATRIBUTOS

    this.scene; // La escena donde se encuentra el manejador.
    this.minuteCount; // Contador de minutos.
    this.hourCount; // Contador de horas.
    this.dayCount; // Contador de dias.
    this.nextHorde; // Contador de dias hasta la siguiente horda.

    this.dayText; // Texto que muestra el contador de dias.
    this.hourText; // Texto que muestra la hora.
    this.nextHordeText; // Texto que muestra el contador de dias hasta la siguiente horda.

    // INICIALIZACION

    this.scene = config.scene;
    this.minuteCount = 0;
    this.hourCount = 9;
    this.dayCount = 1;
    this.nextHorde = 29;

    this.hourText = config.scene.add.text(10, 50, "", { font: '18px Arial', fill: '#FFFFFF' });
    this.dayText = config.scene.add.text(10, 30, "", { font: '18px Arial', fill: '#FFFFFF' });
    this.nextHordeText = config.scene.add.text(10, 10, "", { font: '18px Arial', fill: '#FFFFFF' });

    // Creamos un evento que va incrementando el tiempo.
    this.dayTime = config.scene.time.addEvent(
      {
        delay: 10000,
        //repeat:,
        loop: true,
        callback: () =>
        {
          this.updateTime();
        },
        callbackScope: this,
        //args:,
        //timeScale:,
        //startAt:,
        paused: true
      });

    // CONFIGURACION

    this.dayText.setVisible(true);
    this.hourText.setVisible(true);
    this.nextHordeText.setVisible(true);
    this.updateText();
  }

  // Metodo que utilizamos para iniciar el manejador de tiempo en un punto especifico.
  startTimeAt (day, hour, minute, horde)
  {
    this.minuteCount = minute;
    this.hourCount = hour;
    this.dayCount = day;
    this.nextHorde = horde;
    this.updateText();
  }

  // Metodo que utilizamos para cambiar la visibilidad.
  setVisible (value)
  {
    this.dayText.setVisible(value);
    this.hourText.setVisible(value);
    this.nextHordeText.setVisible(value);
  }

  // Metodo que utilizamos para actualizar los minutos, horas y dias.
  updateTime ()
  {
    this.minuteCount += 10;
    if(this.minuteCount === 60)
    {
      this.minuteCount = 0;
      this.hourCount++;
      if(this.hourCount === 24)
      {
        this.hourCount = 0;
        this.dayTime.paused = true;
      }
    }
    this.updateText();
    this.dayNightCicle();
  }

  // Metodo que utilizamos para terminar el dia.
  endDay ()
  {
    this.minuteCount = 0;
    this.hourCount = 6;
    this.dayCount++;
    this.nextHorde--;
    if(this.nextHorde < 0)
    {
      this.nextHorde = 3;
    }
    this.updateText();
    this.dayNightCicle();

  }

  // Metodo que utilizamos para actualizar el texto a medida que cambian los valores.
  updateText ()
  {
    var h = "";
    var m = "";
    var nh = "s";
    if((this.hourCount >= 0) & (this.hourCount <= 9))
    {
      h = "0";
    }
    if(this.minuteCount === 0)
    {
      m = "0";
    }
    this.hourText.setText(h + this.hourCount + ":" + m + this.minuteCount + " hs.");
    this.dayText.setText("Day: " + this.dayCount);
    if(this.nextHorde === 1)
    {
      nh = "";
    }
    this.nextHordeText.setText("Next horde in " + this.nextHorde + " day" + nh);
  }

  // Metodo que utilizamos para agregar un valor al contador de horas.
  addHours (value)
  {
    this.hourCount += value;
    if(this.hourCount === 24)
    {
      this.hourCount = 0;
      this.dayTime.paused = true;
    }
    this.updateText();
    this.dayNightCicle();
  }

  dayNightCicle ()
  {
    if((this.hourCount > 8) & (this.hourCount < 18))
    {
      this.scene.gameScene.levelShadows.setAlpha(0);
      return;
    }
    if((this.hourCount > 22) & (this.hourCount < 6))
    {
      this.scene.gameScene.levelShadows.setAlpha(1);
      return;
    }
    // Day
    if((this.hourCount === 6) & (this.minuteCount === 0))
    {
      this.scene.gameScene.levelShadows.setAlpha(0.9);
    }
    else if((this.hourCount === 6) & (this.minuteCount === 30))
    {
      this.scene.gameScene.levelShadows.setAlpha(0.8);
    }
    else if((this.hourCount === 7) & (this.minuteCount === 0))
    {
      this.scene.gameScene.levelShadows.setAlpha(0.7);
    }
    else if((this.hourCount === 7) & (this.minuteCount === 30))
    {
      this.scene.gameScene.levelShadows.setAlpha(0.6);
    }
    else if((this.hourCount === 8) & (this.minuteCount === 0))
    {
      this.scene.gameScene.levelShadows.setAlpha(0.5);
    }
    else if((this.hourCount === 8) & (this.minuteCount === 30))
    {
      this.scene.gameScene.levelShadows.setAlpha(0.4);
    }
    // Nigth
    else if((this.hourCount === 18) & (this.minuteCount === 0))
    {
      this.scene.gameScene.levelShadows.setAlpha(0.5);
    }
    else if((this.hourCount === 19) & (this.minuteCount === 0))
    {
      this.scene.gameScene.levelShadows.setAlpha(0.6);
    }
    else if((this.hourCount === 20) & (this.minuteCount === 0))
    {
      this.scene.gameScene.levelShadows.setAlpha(0.7);
    }
    else if((this.hourCount === 21) & (this.minuteCount === 0))
    {
      this.scene.gameScene.levelShadows.setAlpha(0.8);
    }
    else if((this.hourCount === 21) & (this.minuteCount === 30))
    {
      this.scene.gameScene.levelShadows.setAlpha(0.9);
    }
    else if((this.hourCount === 22) & (this.minuteCount === 0))
    {
      this.scene.gameScene.levelShadows.setAlpha(1);
    }
  }

}
