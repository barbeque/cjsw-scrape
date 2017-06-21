var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

exports.get_tracks = function(show_url, next) {
  request(show_url, (error, response, html) => {
      if(!error) {
          var $ = cheerio.load(html);

          /*
              .tracklist
                  .list-unstyled
                      .chart__item
                          .chart__title (body)
                          .chart__info (body, split on •)
          */

          var chartItems = [];

          var $items = $('.tracklist > .list-unstyled > .chart__item');
          $items.each((idx, ci) => {
              let title = $(ci).children('.chart__title').first().text();
              let artistAndAlbum = $(ci).children('.chart__info').children().first().text()
              let tokens = artistAndAlbum.split('•');
              let artist = tokens[0].trim();
              let album = tokens[1].trim(); // assume there's only two...

              chartItems.push({
                  'title': title,
                  'artist': artist,
                  'album': album
              });
          });

          // Thunk to the callback
          next(null, chartItems);
      }
      else {
          next(error, null);
      }
  });
}