var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);
var handle = '@facerecogbot';

Twitter.get('search/tweets', { q: handle }, function(err, data, response){
  for(i = 0; i < data.statuses.length; i++){
    if(data.statuses[i].extended_entities !== undefined){
      var url = data.statuses[i].extended_entities.media[0].media_url;
      console.log(url);

      var fs = require('fs');
      var request = require('request');
      var download = function(uri, file, cb){
        request.head(uri, function(err, res, body){
          request(uri).pipe(fs.createWriteStream(file)).on('close', cb);
        });
      };
      download(url, 'cat-img.jpg', function(){
        console.log("downloaded!");
      });
    }
  }
})
