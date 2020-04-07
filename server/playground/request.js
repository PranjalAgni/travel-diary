const axios = require('axios').default;

const axiosInstance = axios.create({
  baseURL: 'https://travel-log-api.now.sh/',
  headers: {
    'X-API-TOKEN': 'bla_bla_bla'
  }
});

axiosInstance.interceptors.request.use(request => {
  const someToken = 'REPLACE_RANDOM_TOKEN';
  request.params = {
    token: someToken
  };

  // console.log(JSON.stringify(request));
  return request;
});

async function fireRequest() {
  const response = await axiosInstance.get('api/logs');
  return response.data;
}

fireRequest()
  .then(res => console.log(res))
  .catch(e => console.error(e.stack));
