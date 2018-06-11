const fetch = require('node-fetch');
const cheerio = require('cheerio');

const serachUrl = 'https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=';
const movieUrl = 'https://www.imdb.com/title/';

const searchCache = {};
const movieCache = {};

// fetch data from url
function searchMovies(searchTerm) {
  // caching for the searched terms
  if (searchCache[searchTerm]) {
    console.log('Serving from cache: ', searchTerm);
    return Promise.resolve(searchCache[searchTerm]);
  }

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

      searchCache[searchTerm] = movies;

      return movies;
    });
}

// get a specific movie
function getMovie(imdbID) {
  // caching for the searched movies
  if (movieCache[imdbID]) {
    console.log('Serving from cache: ', imdbID);
    return Promise.resolve(movieCache[imdbID]);
  }

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

      // get summary
      const summary = $('div.summary_text')
        .text()
        .trim();

      // get director
      const director = $('span[itemProp="director"]')
        .text()
        .trim();

      // get director(s)
      const directors = [];

      function getItems(itemArray) {
        return function(i, element) {
          const item = $(element)
            .text()
            .trim();

          itemArray.push(item);
        };
      }

      $('span[itemProp="director"]').each(getItems(directors));

      // get writer(s)
      const writers = [];

      $('.credit_summary_item span[itemProp="creator"]').each(getItems(writers));

      // get movie star(s)
      const stars = [];

      $('.credit_summary_item span[itemProp="actors"]').each(getItems(stars));

      // get storyline
      const storyLine = $('span[itemProp="description"]')
        .text()
        .trim();

      // get companies
      const companies = [];

      $('span[itemType="http://schema.org/Organization"]').each(getItems(companies));

      // get trailer
      const trailer = $('a[itemProp="trailer"]').attr('href');

      // return statement
      const movie = {
        imdbID,
        title,
        rating,
        runTime,
        genres,
        datePublished,
        imdbRating,
        poster,
        summary,
        directors,
        writers,
        stars,
        storyLine,
        companies,
        trailer: `https://www.imdb.com${trailer}`
      };

      movieCache[imdbID] = movie;

      return movie;
    });
}

module.exports = {
  searchMovies,
  getMovie
};
