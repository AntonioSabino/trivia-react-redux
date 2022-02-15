const token = localStorage.getItem('token');

const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;

async function fetchTrivia() {
  const request = await fetch(URL);
  const resolve = await request.json();
  return resolve;
}

export default fetchTrivia;
