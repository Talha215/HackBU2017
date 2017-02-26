var x = [];

var vision = require('@google-cloud/vision');
var visionClient = vision({
  projectId: 'my-project-1478982802301',
  keyFilename: 'googleAPI.json'
});

process("images/hipster.jpg");
// Detect faces and the locations of their features in an image.
function process(input) {
	var numFaces;

	visionClient.detectFaces(input, function(err, faces) {
		numFaces = faces.length;
		for(var i = 0; i < numFaces; i++) {
			var em;
			if(faces[i].joy == true)
				em = 1;
			else if(faces[i].anger == true)
				em = 2;
			else if(faces[i].sorrow == true)
				em = 3;
			else if(faces[i].surprised == true)
				em = 4;
			else
				em = 0;
			x[i] = {
				emotion: em,
				lip: [
					faces[i].features.lips.top,
					faces[i].features.lips.bottom
				],
				noseTip: faces[i].features.nose.tip,
				leftEye: faces[i].features.eyes.left,
				rightEye: faces[i].features.eyes.right,
				head: [
					faces[i].bounds.head[0],
					faces[i].bounds.head[2]
				]
			};
			//console.log(x[i]);
		}
		//console.log("numFaces = " + faces.length);
		var next = require('./imageProcessing.js');
		next.addEmoji(input,numFaces,x);
	});
	
}

module.exports.process = process;