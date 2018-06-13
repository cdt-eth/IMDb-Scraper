<div align="center">
<h1>IMDb Scraper</h1>

<a href="https://www.emojione.com/emoji/1f3ac">
<img height="80" width="80" alt="palette" src="https://user-images.githubusercontent.com/26611339/41251421-e0e39fda-6d87-11e8-9aca-30ff61500cff.png" />
</a>

<p> An IMDb scraper built with Express and Vanilla Javascript. </p>
</div>

<hr />

[![GitHub followers](https://img.shields.io/github/followers/christiandavidturner.svg?style=social&label=Follow)](http://github.com/christiandavidturner) [![Twitter Follow](https://img.shields.io/twitter/follow/imcdt.svg?style=social&label=Follow)](https://twitter.com/imcdt)

## Table of Contents

- [Overview](#overview)
- [Tools](#tools)

# Overview

An IMDb scraper built with Vanilla Javascript and Express. It scrapes IMDb to show general search results as well as data from a specific movie page. Node fetch was used to make the request and Cheerio was used to parse it. Caching was implemented as well. I deployed the it to [_now_](https://zeit.co/now) and you can see that part [here](https://my-imdb-scraper.now.sh/) and the final project [here](https://imdb-search.now.sh/).

I also made a frontend UI for it to view it all cleanly. It makes requests to this api and display all the search data as well as movie page data. I wrote some regex to parse the movie urls and display the movie posters in a high-res format. I also added a placeholder image for untitled movies that don't have a poster yet. I used Bootstrap for styling and also deployed it using [_now_](https://zeit.co/now).

You can see the final project [here](https://imdb-search.now.sh/).

# Tools

- Express/Node
- Vanilla JS
- Cheerio
- cors
- nodemon
- Bootstrap
- regex
- [_now_](https://zeit.co/now)
