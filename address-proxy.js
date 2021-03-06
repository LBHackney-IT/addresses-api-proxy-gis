const fetch = require("node-fetch");


const API_ENDPOINT =
  "https://6kb2p9kgb0.execute-api.eu-west-2.amazonaws.com/production/api/v1/addresses";




  exports.handler = async (event, context) => {
    let response;
    //let { postcode } = event.queryStringParameters;
    let request = `${API_ENDPOINT}`;
    if (event.queryStringParameters){
      if (event.queryStringParameters.format){
        request = request + `?format=${event.queryStringParameters.format}`;
      }
      else{
        request = request + `?format=simple`;
      }
      if (event.queryStringParameters.uprn){
        request = request + `&uprn=${event.queryStringParameters.uprn}`;
      }
      if (event.queryStringParameters.postcode){
        request = request + `&postcode=${event.queryStringParameters.postcode}`;
      }
      if (event.queryStringParameters.page){
        request = request + `&page=${event.queryStringParameters.page}`;
      }

    }
  
    try {
      response = await fetch(request, {
        headers: {
            Authorization: process.env.TOKEN,
        },
      });
    } catch (err) {
      return {
        statusCode: err.statusCode || 500,
        body: JSON.stringify({
          error: err.message,
        }),
      };
    }
  
    return {
      statusCode: 200,
      headers: {
        // 'Access-Control-Allow-Origin': '*',
        //'Access-Control-Allow-Origin': 'http://localhost:1234',
        'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN,
        'Access-Control-Allow-Credentials': false
      },
      body: JSON.stringify({
        data: await response.json(),
      }),
    };
  };