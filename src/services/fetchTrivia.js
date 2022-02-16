async function fetchTrivia(token) {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const request = await fetch(URL);
  const resolve = await request.json();
  return resolve;
}

export default fetchTrivia;
