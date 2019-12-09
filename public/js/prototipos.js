function PrototipoBase(prop1, prop2) {
  this.propBase1 = prop1;
  this.propBase2 = prop2;
};

PrototipoBase.prototype.metodoBase = function(parametro) {
  return `Prototipos | metodoBase = ${parametro} | ${Math.random()}`;
};

PrototipoBase.prototype.getPropiedadesBase = function() {
  return `Prototipos | propBase1 = ${this.propBase1} | propBase2 = ${this.propBase2}`;
};


// Constructor
function PrototipoHerencia(prop1, prop2, prop3, prop4) {
  PrototipoBase.call(this, prop1, prop2);

  this.propHerencia3 = prop3;
  this.propHerencia4 = prop4;
};

// Heredar de PrototipoBase
PrototipoHerencia.prototype = Object.create(PrototipoBase.prototype);

// Utilizar constructor de PrototipoHerencia
PrototipoHerencia.prototype.constructor = PrototipoHerencia;

PrototipoHerencia.prototype.metodoHerencia = function(parametro) {
  return `Prototipos | metodoHerencia = ${parametro} | ${Math.random()}`;
};

PrototipoHerencia.prototype.getPropiedadesHerencia = function() {
  return `Prototipos | propHerencia3 = ${this.propHerencia3} | propHerencia4 = ${this.propHerencia4}`;
};


PrototipoHerencia.prototype.requestURL = (address) => {
  const url  = `http://localhost:3000/weather?address=${address}`;

  return url;
};

PrototipoHerencia.prototype.requestOpciones = () => {
  const opciones = {
    method: 'GET',
    mode: 'cors',
    credentials: 'omit',
    // credentials: 'include', // Useful for including session ID
    cache: 'no-cache',
    headers: new Headers({
      'Authorization': `Bearer ${Math.random()}`,
      'X-JETL': Math.random()
    })
  };

  return opciones;
};

PrototipoHerencia.prototype.forecastUIReset = () => {
  document.getElementById('address').innerText = '';
  document.getElementById('latitude').innerText = '';
  document.getElementById('longitude').innerText = '';
  document.getElementById('summary').innerText = '';
  document.getElementById('temperature').innerText = '';
  document.getElementById('precipProbability').innerText = '';
  document.getElementById('error').innerText = '';
};

PrototipoHerencia.prototype.forecastProcesa = (data) => {
  document.getElementById('address').innerText = data.address;
  document.getElementById('latitude').innerText = data.latitude;
  document.getElementById('longitude').innerText = data.longitude;
  document.getElementById('summary').innerText = data.summary;
  document.getElementById('temperature').innerText = data.temperature;
  document.getElementById('precipProbability').innerText = data.precipProbability;
};

PrototipoHerencia.prototype.forecastError = (xhrError) => {
  const esResponse = (xhrError instanceof Response);
  const esTypeError = (xhrError instanceof TypeError);
  const esError = (xhrError instanceof Error);
  const esString = (typeof xhrError === 'string');
  let errorDetalle = '';

  if (esResponse) {
    errorDetalle = `${xhrError.status} | ${xhrError.statusText}`;
  } else if (esTypeError) {
    errorDetalle = `${xhrError.name} | ${xhrError.message}`;
  }  else if (esError) {
    errorDetalle = `${xhrError.name} | ${xhrError.message}`;
  } else if (esString) {
    errorDetalle = xhrError;
  } else {
    errorDetalle = '¡Error no codificado!';
  }

  document.getElementById('error').innerText = errorDetalle;
};

PrototipoHerencia.prototype.xhrWeather = function(address) {
  const requestURL = this.requestURL(address);
  const requestOpciones = this.requestOpciones();

  this.forecastUIReset();

  fetch(requestURL, requestOpciones)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
    }).then(data => {
      this.forecastProcesa(data);
    })
    .catch(error => {
      this.forecastError(error);
    });
};

export { PrototipoHerencia };
