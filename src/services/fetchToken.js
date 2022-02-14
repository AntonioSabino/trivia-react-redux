const URL = 'https://opentdb.com/api_token.php?command=request';

async function fetchToken() {
  const request = await fetch(URL);
  const resolve = await request.json();
  return resolve;
}

export default fetchToken;
