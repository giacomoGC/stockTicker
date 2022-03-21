export async function getStonks(url) {
  const response = await fetch(url, {
    "method": "GET",
    "headers": {'User-Agent': 'request'}
  })
  .catch(err => {
    console.error(err);
  });
  return response.json();
}