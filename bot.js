var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);
var handle = '@facerecogbot';

Twitter.get('search/tweets', { q: handle }, function(err, data, response){
  for(i = 0; i < data.statuses.length; i++){
    if(data.statuses[i].extended_entities !== undefined){
      var url = data.statuses[i].extended_entities.media[0].media_url;
      var dest = './images/user_submitted/';
      var suffix = url.substring(url.lastIndexOf('.'));
      var crypto = require('crypto');
      var rand_id = crypto.randomBytes(15).toString('hex');
      var rand_id = rand_id.concat(suffix);

      console.log("downloading from: " + url);

      var http = require('http');
      var fs = require('fs');
      var download = function(uri, dest, cb){
        var file = fs.createWriteStream(dest);
        var request = http.get(uri, function(response){
          response.pipe(file);
          file.on('finish', function(){
            file.close(cb);
          });
        });
      }

      download(url, dest + rand_id, function(){
        console.log("finished downloading to: " + dest + rand_id);
      });
    }
  }
})
