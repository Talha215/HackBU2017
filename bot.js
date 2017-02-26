var twit = require('twit');
var config = require('./config.js');
var fs = require('fs');
var http = require('http');

var Twitter = new twit(config);
var handle = '@facerecogbot';

function Tweet(path, username){
  this.path = path;
  this.username = username;
}

function createFile(url){
  var dest = './images/user_submitted/';
  var suffix = url.substring(url.lastIndexOf('.'));
  var crypto = require('crypto');
  var rand_id = crypto.randomBytes(15).toString('hex');
  var rand_id = rand_id.concat(suffix);
  return dest + rand_id;
};

function gatherTweets(){
  var query = handle;

  Twitter.get('search/tweets', {q: query, result_type: 'recent' }, function(err, data, response){

    if(data !== undefined){
      for(i = 0; i < data.statuses.length; i++){
        completedTweets.push(data.statuses[i].id_str);
        if(data.statuses[i].extended_entities !== undefined){
          var url = data.statuses[i].extended_entities.media[0].media_url;
          var fileName = createFile(url);

          var download = function(uri, dest, name, cb){
            var file = fs.createWriteStream(dest);
            var request = http.get(uri, function(response){
              response.pipe(file);
              file.on('finish', function(){
                file.close(cb);
              });
            });
          }

          var username = data.statuses[i].user.screen_name
          download(url, fileName, username, function(err, data, response){
            postTweet(fileName, username);
          })
        }
      }
    }
  });
  })

};

function postTweet(fileName, username){
  var b64content = fs.readFileSync(fileName, { encoding: 'base64' });

  Twitter.post('media/upload', { media_data: b64content }, function(err, data, response){
    var media_id_string = data.media_id_string;
    var altText = "face recognition bot";
    var meta_params = { media_id: media_id_string, alt_text: { text: altText } }

    Twitter.post('media/metadata/create', meta_params, function(err, data, response){
      if(!err){
        var params = { status: '@' + username + " here is your photo! #facerecogbot", media_ids: [media_id_string] }
        Twitter.post('statuses/update', params, function(err, data, response){
        });
      }
    });
  });
}

gatherTweets();
