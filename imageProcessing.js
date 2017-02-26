var Jimp = require("jimp");


function addEmoji(input,numFaces,faces){
	console.log(input + " " + numFaces);
	var arrFaces = new Array(1+numFaces);
	arrFaces[0] = Jimp.read(input, function (err, image) {if(err) throw error});
	for(i=1;i <=numFaces;i++){
		console.log(faces[i-1].emotion);
		switch(faces[i-1].emotion){
			case 0: //Neutral  happy, angry, sad, surprised
				arrFaces[i] = Jimp.read("./images/Emoji/neutral.png", function (err, image) {if(err) throw error});
				break;
			case 1: //Happy
				arrFaces[i] = Jimp.read("./images/Emoji/openHappy.png", function (err, image) {if(err) throw error});
				break;
			case 2: //Angry
				arrFaces[i] = Jimp.read("./images/Emoji/mad.png", function (err, image) {if(err) throw error});
				break;
			case 3: //Sad
				arrFaces[i] = Jimp.read("./images/Emoji/sad.png", function (err, image) {if(err) throw error});
				break;
			case 4: //Surprised
				arrFaces[i] = Jimp.read("./images/Emoji/surprised.png", function (err, image) {if(err) throw error});
		}
	}
	var angle, angleRad, deltaY, deltaX, hyp;
	var sideX, sideY, hypRect, resizeX, resizeY;
	var posX, posY, propY, propX;
	var arrX = [], arrY = [];
	Promise.all(arrFaces).then(function (images) {
		console.log("test");
		var fuckingfuck = arrFaces[0];
		/*for(i = 1; i <= numFaces;i++){
    		var temp = arrFaces[i];
    	//Adjust rotation	
    		deltaY = Math.abs(faces[i-1].rightEye.y - faces[i-1].leftEye.y);
			deltaX = Math.abs(faces[i-1].rightEye.x - faces[i-1].leftEye.x);
			hyp = Math.sqrt(deltaY * deltaY + deltaX * deltaX);
			angleRad = Math.acos(deltaX / hyp);
			angle = angleRad * 57.29578;
			if(faces[i-1].leftEye.y < faces[i-1].rightEye.y){
    			angle *= -1;
			}
			temp.rotate(angle,false);
   		
		//Adjust size
   			sideX = faces[i-1].head[1].x - faces[i-1].head[0].x;
			sideY = faces[i-1].head[1].y - faces[i-1].head[0].y;
			hypRect = Math.sqrt(sideY * sideY + sideX * sideX);
			resizeX = hypRect;
			resizeY = hypRect;
			temp.resize(resizeX,resizeY,Jimp.AUTO);

		//Place at position
			propY = faces[i-1].noseTip.y / hypRect;
			propX = faces[i-1].noseTip.x / hypRect;
			posY = faces[i-1].noseTip.y - propY * hypRect;
			posX = faces[i-1].noseTip.x - propX * hypRect;
			arrX[i] = posX;
			arrY[i] = posY;
		}
		fuckingfuck.clone().composite(arrFaces[1],arrX[1],arrY[1]).write("./images/test.jpg");*/
		var angle, angleRad, deltaY, deltaX, hyp;
		var sideX, sideY, hypRect, resizeX, resizeY;
		var posX, posY, propY, propX;
		deltaY = Math.abs(faces[i-1].rightEye.y - faces[i-1].leftEye.y);
		deltaX = Math.abs(faces[i-1].rightEye.x - faces[i-1].leftEye.x);
		hyp = Math.sqrt(deltaY * deltaY + deltaX * deltaX);
		angleRad = Math.acos(deltaX / hyp);
		angle = angleRad * 57.29578;
		if(faces[i-1].leftEye.y < faces[i-1].rightEye.y){
			angle *= -1;
		}
		sideX = faces[i-1].head[1].x - faces[i-1].head[0].x;
		sideY = faces[i-1].head[1].y - faces[i-1].head[0].y;
		hypRect = Math.sqrt(sideY * sideY + sideX * sideX);
		resizeX = hypRect;
		resizeY = hypRect;
		propY = faces[i-1].noseTip.y / hypRect;
		propX = faces[i-1].noseTip.x / hypRect;
		posY = faces[i-1].noseTip.y - propY * hypRect;
		posX = faces[i-1].noseTip.x - propX * hypRect;
		
		var face = Jimp.read("./images/Emoji/openHappy.png", function (err, image) {if(err) throw error});
		Jimp.read(input, function (err, image) {
			if(err) 
				throw error
			face.rotate(angle,false).resize(resizeX,resizeY,Jimp.AUTO);
			image.clone().composite(face,posX,posY).write("fuckyourdad.jpg");
		});

	}).catch(function (err) {
    console.log(err);
	});
}

module.exports.addEmoji = addEmoji;