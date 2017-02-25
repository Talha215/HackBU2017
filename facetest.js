var oxford = require('project-oxford'), 
	client = new oxford.Client('7fb073s72bh72663y5ddh129m12e598d');

client.face.detect({
    path: 'images/testImage.jpg',
    analyzesAge: true,
    analyzesGender: true
}).then(function (response) {
    console.log('The age is: ' + response[0].attributes.age);
    console.log('The gender is: ' + response[0].attributes.gender);
});