import path from 'path';
import express from 'express';
import hbs from 'hbs';

import { geoCode } from './utils/geocode.js';
import { forecast } from './utils/forecast.js';

// Info de aplicacion
//
const appName = 'Weather App';
const appDescription = 'Weather App description';
const appVersion = '1.0.0';
const appAuthor = 'jorge@torres-lozano.com';

const port = process.env.PORT || 3000;

// Rutas para configuracion de Express
//
// package.json -> "type": "module"
// (node:11396) ExperimentalWarning: The ESM module loader is experimental.
//
// https://stackoverflow.com/questions/8817423/node-dirname-not-defined
// node __dirname not defined
// __dirname and __filename are also not available when node is called with the --experimental-modules flag.
// console.log(__dirname);
//
// F:\capacitacion\nodejs\TCNDC\web-server
const pathAppRoot = path.resolve(path.dirname(''));
const pathAppPublic = path.join(pathAppRoot, 'public');
const pathViews = path.join(pathAppRoot, 'templates/views');
const pathPartials = path.join(pathAppRoot, 'templates/partials');

// process.exit(99);

// Express
//
const app = express();

// Handlebars
//
app.set('view engine', 'hbs');
app.set('views', pathViews);
hbs.registerPartials(pathPartials);
app.use(express.static(pathAppPublic));


// Rutas
//
const localsCommon = {
  appName,
  appDescription,
  appVersion,
  appAuthor
};

app.get('', (req, res) => {
  // res.send('Hello express !');
  const locals = {
    ...localsCommon,
    aleatorio: Math.random()
  };

  res.render('index', locals);
});

app.get('/help', (req, res) => {
  res.render('help', localsCommon);
});

app.get('/about', (req, res) => {
  res.render('about', localsCommon);
});

app.get('/weather', (req, res) => {
  const addressFound = req.query.hasOwnProperty('address');
  const address = req.query.address;

  if (! addressFound) {
    return res.send({ error: '¡ No address found !' });
  }

  geoCode(address, (error, {place_name: placeName, latitude, longitude} = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, {summary, temperature, precipProbability} = {}) => {
      if (error) {
        return res.send({ error });
      } else {
        return res.send({
          address,
          latitude,
          longitude,
          summary,
          temperature,
          precipProbability,
          random: Math.random()
        });
      }
    });
  });
});

// app.get('favicon.ico', (req, res) => {
//   res.send('Hello express !');
// });

app.get('/help/*', (req, res) => {
  res.render('help-not-found', localsCommon);
});

app.get('*', (req, res) => {
  res.render('404', localsCommon);
});


// Iniciar aplicacion
//
app.listen(port, () => {
  console.log(`Web server Up & Running on port ${port}`);
});

