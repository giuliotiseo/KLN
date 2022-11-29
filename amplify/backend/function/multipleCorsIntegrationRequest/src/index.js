exports.handler = async (event) => {
  let origin = 'https://www.keylogisticnetwork.com';
  if (event.headers !== null && event.headers !== undefined && event.headers['origin'] !== undefined) {
    console.log("Received origin header: " + event.headers.origin);
    if(event.headers.origin === 'http://localhost:3000') {
      origin = event.headers.origin;
    }
  } else {
    console.log('No origin header received');
  }
  
  const response = {
      statusCode: 200,
      headers: {
      "Access-Control-Allow-Origin" : origin,
      "Access-Control-Allow-Headers" : 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Credentials": 'true'
    }
  };
  return response;
};