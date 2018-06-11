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

      // get title
      const title = $title
        .first()
        .contents()
        .filter(function() {
          return this.type === 'text';
        })
        .text()
        .trim();

      // get rating
      const rating = $('meta[itemProp="contentRating"]').attr('content');

      // get runtime
      const runTime = $('time[itemProp="duration"]')
        .first()
        .contents()
        .filter(function() {
          return this.type === 'text';
        })
        .text()
        .trim();

      // get genres
      const genres = [];

      $('span[itemProp="genre"]').each(function(i, element) {
        const genre = $(element).text();
        genres.push(genre);
      });

      // get release date
      const datePublished = $('meta[itemProp="datePublished"]').attr('content');

      // get imdb rating
      const imdbRating = $('span[itemProp="ratingValue"]').text();

      // get movie poster
      const poster = $('img[itemProp="image"]').attr('src');

      return {
        imdbID,
        title,
        rating,
        runTime,
        genres,
        datePublished,
        imdbRating,
        poster
      };
    });
}

module.exports = {
  searchMovies,
  getMovie
};
