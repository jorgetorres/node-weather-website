import request from 'request';

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/' +
    '9a76fd5937b19534a5f8f1b9927a5666/' +
    `${latitude},${longitude}?` +
    'units=si&' +
    'lang=es';

  request({ url, json: true }, (error, { body })  => {
    const { error: bodyError } = body;
    const { data: bodyDailyData } = body.daily;
    const { temperature, precipProbability } = body.currently;
    let requestError = undefined;
    let data = undefined;

    if (error) {
      requestError = error;
    } else if (bodyError) {
      requestError = 'Error general';
    } else {
      data = {
        summary: bodyDailyData[0].summary,
        temperature: temperature,
        precipProbability: precipProbability
      };
    }

    callback(requestError, data);
  });
};

export { forecast };
