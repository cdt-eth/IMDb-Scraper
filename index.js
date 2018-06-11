const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = 'https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=';

// fetch data from url
function searchMovies(searchTerm) {
  return fetch(`${url}${searchTerm}`).then(response => response.text());
}

// make request and log out html
searchMovies('star wars').then(body => {
  const movies = [];
  const $ = cheerio.load(body);

  $('.findResult').each(function(i, element) {
    const $element = $(element);
    const $image = $element.find('td a img');
    const $title = $element.find('td.result_text a');

    const movie = {
      image: $image.attr('src'),
      title: $title.text()
    };

    movies.push(movie);
  });

  console.log(movies);
});
