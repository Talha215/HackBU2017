var x = [];

var vision = require('@google-cloud/vision');
var visionClient = vision({
  projectId: 'my-project-1478982802301',
  keyFilename: 'googleAPI.json'
});

//process("images/testImage.jpg");
// Detect faces and the locations of their features in an image.
function process(input) {
	visionClient.detectFaces(input, function(err, faces) {
		for(var i = 0; i < faces.length; i++) {
			x[i] = {
				emotion: [
					faces[i].joy,
					faces[i].anger,
					faces[i].sorrow,
					faces[i].surprise
				],
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
	});
}