// Clase que representa una barra grafica que se actualiza dependiendo del valor indicado.
export default class Bar
{
  constructor (config)
  {
    // ATRIBUTOS

    this.x; // Coordenada X de la barra.
    this.y; // Coordenada Y de la barra.
    this.width; // Ancho de la barra.
    this.height; // Altura de la barra.
    this.visible; // Estado de visibilidad de la barra.
    this.value; // Valor de la barra.
    this.maxValue; // Valor maximo de la barra.
    this.border; // Borde de la barra.
    this.bdColor; // Color del borde de la barra.
    this.bdAlpha; // Transparencia del borde de la barra.
    this.background; // Fondo de la barra
    this.bgColor; // Color del fondo de la barra.
    this.bgAlpha; // Transparencia del fondo de la barra.
    this.bar; // Barra.
    this.brColor; // Color de la barra.
    this.brAlpha; // Transparencia de la barra.
    this.valueText; // Texto que muestra el valor actual y maximo de la barra.
    this.textSize; // Tamaño de fuente del texto de la barra.
    this.extraText; // Texto que muestra informacion extra en la barra.

    // INICIALIZACION

    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;
    this.visible = config.visible;

    this.value = config.value;
    this.maxValue = config.maxValue;

    this.border = config.scene.add.graphics();
    this.bdColor = config.borderColor;
    this.bdAlpha = config.borderAlpha;

    this.background = config.scene.add.graphics();
    this.bgColor = config.backgroundColor;
    this.bgAlpha = config.backgroundAlpha;

    this.bar = config.scene.add.graphics();
    this.brColor = config.barColor;
    this.brAlpha = config.barAlpha;

    this.textSize = config.textSize;
    this.extraText = config.extraText;
    this.valueText = config.scene.make.text(
      {
        x: config.x + ((config.width + 4) / 2),
        y: config.y + ((config.height + 4) / 2),
        text: config.extraText + " " + config.value + "/" + config.maxValue,
        style: { font: this.textSize + "px Arial", fill: "#ffffff" }
      }
    );
    this.valueText.setOrigin(0.5, 0.5);
    this.valueText.setVisible(config.visible);

    // CONFIGURACION

    this.border.fillStyle(this.bdColor, this.bdAlpha);
    this.border.fillRect(config.x, config.y, config.width + 4, config.height + 4);
    this.border.setVisible(config.visible);

    this.background.fillStyle(this.bgColor, this.bgAlpha);
    this.background.fillRect(config.x + 2, config.y + 2, config.width, config.height);
    this.background.setVisible(config.visible);

    this.bar.fillStyle(this.brColor, this.brAlpha);
    this.bar.fillRect(config.x + 2, config.y + 2, this.value, config.height);
    this.bar.setVisible(config.visible);

  }

  // Metodo que utilizamos para setear el valor y el maximo de la barra.
  setValue (val, maxVal)
  {
    this.value = val;
    this.maxValue = maxVal;
    this.draw();
  }

  // Metodo que utilizamos para cambiar la visibilidad de la barra.
  setVisible (value)
  {
    this.visible = value;
    this.border.setVisible(value);
    this.background.setVisible(value);
    this.bar.setVisible(value);
    this.valueText.setVisible(value);
    if(value)
    {
      this.draw();
    }
  }

  // Metodo que utilizamos para incrementar el valor de la barra.
  increment (val)
  {
    this.value += val;
    if(this.value > this.maxValue)
    {
      this.value = this.maxValue;
    }
    // Si la barra no esta visible no dibujamos los cambios.
    if(this.visible)
    {
      this.draw();
    }
  }

  // Metodo que utilizamos para decrementar el valor de la barra.
  decrement (val)
  {
    this.value -= val;
    if (this.value < 0)
    {
        this.value = 0;
    }
    // Si la barra no esta visible no dibujamos los cambios.
    if(this.visible)
    {
      this.draw();
    }
  }

  // Metodo que utilizamos para dibujar la barra cuando se producen cambios en el valor.
  draw ()
  {
    this.bar.clear();
    this.bar.fillStyle(this.brColor, this.brAlpha);
    // Obtenemos el porcentaje que representa el valor sobre el maximo valor.
    var pct = (this.value * 100) / this.maxValue;
    // Obtenemos el valor que representa el porcentaje sobre el ancho de la barra.
    var val = (pct * this.width) / 100;
    this.bar.fillRect(this.x + 2, this.y + 2, val, this.height);
    this.valueText.setText(this.extraText + " " + this.value + "/" + this.maxValue,);
  }
}
