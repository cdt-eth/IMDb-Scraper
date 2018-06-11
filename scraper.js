const fetch = require('node-fetch');
const cheerio = require('cheerio');

const serachUrl = 'https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=';
const movieUrl = 'https://www.imdb.com/title/';

// fetch data from url
function searchMovies(searchTerm) {
  return fetch(`${serachUrl}${searchTerm}`)
    .then(response => response.text())
    .then(body => {
      const movies = [];
      const $ = cheerio.load(body);

      $('.findResult').each(function(i, element) {
        const $element = $(element);
        const $image = $element.find('td a img');
        const $title = $element.find('td.result_text a');
        const imdbID = $title.attr('href').match(/title\/(.*)\//)[1];

        const movie = {
          image: $image.attr('src'),
          title: $title.text(),
          imdbID
        };

        movies.push(movie);
      });

      return movies;
    });
}

// get a specific movie
function getMovie(imdbID) {
  return fetch(`${movieUrl}${imdbID}`)
    .then(response => response.text())
    .then(body => {
      const $ = cheerio.load(body);
      const $title = $('.title_wrapper h1');

      const title = $title
        .first()
        .contents()
        .filter(function() {
          return this.type === 'text';
        })
        .text()
        .trim();

      return { title };
    });
}

module.exports = {
  searchMovies,
  getMovie
};
