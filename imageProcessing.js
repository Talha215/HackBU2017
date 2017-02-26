var Jimp = require("jimp");

function math(arrEmojis, faces, numFaces, tweetedPic){
	var angle, angleRad, deltaY, deltaX, hyp;
	var sideX, sideY, hypRect, resizeX, resizeY;
	var posX, posY, propY, propX;
	for(i = 0; i < numFaces;i++){
  	var temp = arrEmojis[i];
  	//Adjust rotation
  	deltaY = Math.abs(faces[i].rightEye.y - faces[i].leftEye.y);
		deltaX = Math.abs(faces[i].rightEye.x - faces[i].leftEye.x);
		hyp = Math.sqrt(deltaY * deltaY + deltaX * deltaX);
		angleRad = Math.acos(deltaX / hyp);
		angle = angleRad * 57.29578;
		if(faces[i].leftEye.y < faces[i].rightEye.y){
  			angle *= -1;
		}
		temp.rotate(angle,false);

		//Adjust size
 		sideX = faces[i].head[1].x - faces[i].head[0].x;
		sideY = faces[i].head[1].y - faces[i].head[0].y;
		hypRect = Math.sqrt(sideY * sideY + sideX * sideX);
		resizeX = hypRect;
		resizeY = hypRect;
		temp.resize(resizeX,resizeY,Jimp.AUTO);

		//Place at position
		propY = faces[i].noseTip.y / hypRect;
		propX = faces[i].noseTip.x / hypRect;
		posY = faces[i].noseTip.y - propY * hypRect;
		posX = faces[i].noseTip.x - propX * hypRect;
		tweetedPic.composite(temp,posX,posY);
	}
}

function addEmoji(input,numFaces,faces){
	console.log(input + " " + numFaces);
	var arrEmojis = [];
	var promises = [];
	tweetedPic = Jimp.read(input, function (err, image) {
		if(err) throw err
		for(i = 0; i < numFaces; i++){
			switch(faces[i].emotion){
				case 0: // neutral
					promises.push(Jimp.read("./images/Emoji/neutral.png", function (err, image){
						arrEmojis.push(image);
						console.log("making happy");
						if(err) throw err
					}));
				case 1: // happy
					promises.push(Jimp.read("./images/Emoji/openHappy.png", function (err, image){
						arrEmojis.push(image);
						console.log("making happy");
						if(err) throw err
					}));
				case 2: // angry
					promises.push(Jimp.read("./images/Emoji/mad.png", function (err, image){
						arrEmojis.push(image);
						console.log("making happy");
						if(err) throw err
					}));
				case 3: // sad
					promises.push(Jimp.read("./images/Emoji/sad.png", function (err, image){
						arrEmojis.push(image);
						console.log("making happy");
						if(err) throw err
					}));
				case 4: // surprised
					promises.push(Jimp.read("./images/Emoji/surprised.png", function (err, image){
						arrEmojis.push(image);
						console.log("making happy");
						if(err) throw err
					}));
			}
		}
		console.log(promises);

		Promise.all(promises).then(function(err, data, response){
			console.log("help");
			console.log(arrEmojis);
			math(arrEmojis, faces, numFaces, tweetedPic);
			tweetedPic.clone().write("./images/edited_pic.jpg", function(err, data, response){
				console.log(data);
			});
		})
	});
}

module.exports.addEmoji = addEmoji;
