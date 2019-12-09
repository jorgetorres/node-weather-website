import { PrototipoHerencia as Prototipo } from './prototipos.js';

const initEventos= () => {
  document.querySelectorAll('form').forEach( forma => {
    forma.addEventListener('submit', event => {
      event.preventDefault();
    });
  });

  document.getElementById('forecastAction').addEventListener('click', () => {
    getForecast();
  });
};

const getForecast= () => {
  const proto = new Prototipo(1, 2, 3, 4);
  const address = encodeURIComponent(document.getElementById('forecastAddress').value.trim());
  proto.xhrWeather(address);
};

const init = () => {
  initEventos();

  const proto = new Prototipo(1, 2, 3, 4);
  console.log(proto.getPropiedadesBase());
  console.log(proto.metodoBase('A'));
  console.log(proto.getPropiedadesHerencia());
  console.log(proto.metodoHerencia('B'));
  console.log('proto.propBase1 | ', proto.propBase1);
  proto.propBase1 = 100;
  console.log('proto.propBase1 | ', proto.propBase1);
};

document.addEventListener('DOMContentLoaded', function() {
  // let moduloDOM = new TDA_DOM.ModuloDOM();
  // moduloDOM.init();
  // moduloDOM = null;

  init();
});
