var request = require('request')
  , cheerio = require('cheerio')
  , async = require('async')
  , seen = {};

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

var descriptify = function(user, $, e) {
  var data = $('.entryCases').children('p').text();
  descriptions.push({ id: user, description : data.trim() });
}

var queue = async.queue(function crawl(url, next) {
  if (next == null) {
        console.log(JSON.stringify(descriptions));
        return;
  }
  if (!url || seen[url]) return next(null);

  request(url, function(err, response, body){
    if (err) return next(err);

    seen[url] = true;
    
    var $ = cheerio.load(body);

    $('a.m_profiel').each(function(i, e){ 
      objectify($, e, queue);
    })

    $('.entryCases').each(function(i,e){
      descriptify(users[i].id, $, e);
    });

    next(null);
  });
}, 2);

queue.push('https://arnhem.luminis.eu/mensen/');
