/**
 * @author Mikkel Solberg
 */

exports.getSongs = function() {
	var songs = new Array();
	songs.push( {
		title : 'Till Østerland',
		voices : {
			B2 : 'F#',
			B1 : 'F#',
			T2 : 'F#',
			T1 : 'F#',
		},
		cloudName : 'osterland',
	});
	songs.push({
		title : 'Studentersang',
		voices : {
			B2 : 'G',
			B1 : 'D',
			T2 : 'G',
			T1 : 'B',
		},
		cloudName : 'studentsang',
	});
	return songs;
}

exports.getFavorites = function(songs) {
	var properties = require('/lib/properties');
	var favorites = new Array();
	for (var i = 0; i < songs.length; i++) {
		if (properties.isFavorite(songs[i].title)) {
			favorites.push(songs[i]);
		}
	}
	return favorites;
}
exports.getAvailableOfflines = function(songs) {
	var properties = require('/lib/properties');
	var offlines = new Array();
	for (var i = 0; i < songs.length; i++) {
		if (properties.isAvailableOffline(songs[i].title)) {
			offlines.push(songs[i]);
		}
	}
	return offlines;
}
