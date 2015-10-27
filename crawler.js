var request = require('request')
  , cheerio = require('cheerio')
  , async = require('async')
  , seen = {}
  , fs = require('fs');

var users = [];
var descriptions = [];

var objectify = function($, e, queue) {
      var href =  $(e).attr('href'); 
      var name = $(e).children('.contactName').text();
      var email = $(e).children('.contactSubTitle').text();
      var fn = $(e).children('.m_contactTitle').text();
      var item = {
        id: href.split('/')[3],
        email: email.trim(),
        name: name.trim(),
        'function' : fn.trim()
      }
      users.push(item);
      queue.push(href);
}

var descriptify = function(id, $, e) {
  console.log('descriptify', id);

  var data = $('.entryCases').children('p').text();
  descriptions.push({ id: id, description : data.trim() });
  console.log('-------');
  console.log(id + '.md');
  fs.writeFileSync('app/api/details/' + id + '.md', data.trim());
  console.log('-------');
}

var queue = async.queue(function crawl(url, next) {
  if (next == null) {
        console.log(JSON.stringify(descriptions));
        return;
  }
  if (!url || seen[url]) return next(null);

  request(url, function(err, response, body) {
    if (err) return next(err);

    seen[url] = true;
    
    var $ = cheerio.load(body);

    $('a.m_profiel').each(function(i, e){ 
      objectify($, e, queue);
    })

    $('.entryCases').each(function(i,e) {
      var id = url.split('/')[3];
      descriptify(id, $, e);
    });

    next(null);
  });
}, 2);

queue.push('https://arnhem.luminis.eu/mensen/');
