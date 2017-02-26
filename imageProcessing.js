function addEmoji(input,numFaces,faces){
	var bg = Jimp.read("./images/testImage.jpg");
	var arrFaces = [];
	arrFaces[0] = bg;
	for(i=1;i <=numFaces;i++){
		for(j=0;j<4;j++){
			switch(faces[i].emotion){
				case 0: //Neutral  happy, angry, sad, surprised
					arrFaces[i] = Jimp.read("./images/Emoji/neutral.png");
					break;
				case 1: //Happy
					arrFaces[i] = Jimp.read("./images/Emoji/openHappy.png");
					break;
				case 2: //Angry
					arrFaces[i] = Jimp.read("./images/Emoji/mad.png");
					break;
				case 3: //Sad
					arrFaces[i] = Jimp.read("./images/Emoji/sad.png");
					break;
				case 4: //Surprised
					arrFaces[i] = Jimp.read("./images/Emoji/surprised.png");
			}
		}
	}
	var angle, angleRad, deltaY, deltaX, hyp;
	var sideX, sideY, hypRect, resizeX, resizeY;
	var posX, posY;
	Promise.all(arrFaces).then(function (images) {
		for(i = 1; i <= numFaces;i++){
    	//Adjust rotation	
    		deltaY = Math.abs(faces[i].rightEye.y - faces[i].leftEye.y);
			deltaX = Math.abs(faces[i].rightEye.x - faces[i].leftEye.x);
			hyp = Math.sqrt(deltaY * deltaY + deltaX * deltaX);
			angleRad = Math.acos(deltaX / hyp);
			angle = angleRad * 57.29578;
			if(faces[i].leftEye.y < faces[i].rightEye.y){
    			angle *= -1;
			}
			arrFaces[i].rotate(angle,false);
   		
		//Adjust size
   			sideX = faces[i].head[1].x - faces[i].head[0].x;
			sideY = faces[i].head[1].y - faces[i].head[0].y;
			hypRect = Math.sqrt(sideY * sideY + sideX * sideX);
			resizeX = hypRect;
			resizeY = hypRect;
			arrFaces[i].resize(resizeX,resizeY,Jimp.AUTO);

		//Place at position
			posX = faces[i].noseTip.x - (1/2) * sideX;
			posY = faces[i].noseTip.y - (1/2) * sideY;
		}
		arrFaces[0].write("./images/memes.png");
	}).catch(function (err) {
    console.log(err);
	});
}