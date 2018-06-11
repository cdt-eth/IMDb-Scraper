const fetch = require('node-fetch');

const url = 'https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=';

// fetch data from url
function searchMovies(searchTerm) {
  return fetch(`${url}${searchTerm}`).then(response => response.text());
}

// make request and log out html
searchMovies('star wars').then(body => {
  console.log(body);
});
