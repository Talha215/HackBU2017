var vision = require('@google-cloud/vision');
var visionClient = vision({
  projectId: 'my-project-1478982802301',
  keyFilename: 'googleAPI.json'
});


// Read the text from an image.
visionClient.detectText('images/testImage.jpg', function(err, text) {
  console.log(text);
});

// Detect faces and the locations of their features in an image.
visionClient.detectFaces('images/testImage.jpg', function(err, faces) {
  console.log(faces);
});