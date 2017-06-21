var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

const url =
    'http://cjsw.com/program/tombstone-after-dark/episode/20170613/';

function get_tracks(show_url, next) {
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

get_tracks(url, (error, tracks) => {
    if(!error) {
        for(var i = 0; i < tracks.length; ++i) {
            let track = tracks[i];
            console.log(`Track: ${track.artist} - ${track.title} (album: ${track.album})`);
        }
    }
})