'use strict';

var canvas = document.getElementById('board');
var ctx = canvas.getContext('2d');

ctx.strokeStyle = 'black';
var x;
var y;
for (x = 0; x < 5; ++x) {
	for (y = 0; y < 5; ++y) {
		ctx.strokeRect(60 * x, 60 * y, 60, 60);
	}
}

$(canvas).on('click', function(e) {
	$.post(
		'https://us-central1-tower-islands.cloudfunctions.net/buildTower', {
			game: 'hQBb8ikf2fEs8s706bhr',
			x: e.clientX,
			y: e.clientY,
		},
		function(response) {
			console.log(response);
		});
});