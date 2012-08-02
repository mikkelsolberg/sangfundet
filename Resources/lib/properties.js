/**
 * @author Mikkel Solberg
 */


//===================================
//========Favorite song properties===
//===================================

setSongFavorite = function(songTitle, value) {
	Ti.API.info('Setter ' + songTitle +  ' til favoritt ' + value);
	Ti.App.Properties.setBool('songs.favorite.' + songTitle, value);
}

isFavorite = function(songTitle) {
	return Ti.App.Properties.getBool('songs.favorite.' + songTitle);
}
/**
 * Switch the boolean value in the properties indicating wether a song is a favorite
 * @param {String} songTitle -
 * returns - the new boolean indicating if the song is a favorite or not
 */
toggleFavorite = function(songTitle) {
	setSongFavorite(songTitle, !isFavorite(songTitle));
	return !isFavorite(songTitle);
}

//=======================================
//========Available offline properties===
//=======================================

setAvailableOffline = function(songTitle, value) {
	Ti.API.info('Setter ' + songTitle +  ' til offline ' + value);
	Ti.App.Properties.setBool('songs.offline.' + songTitle, value);
}

isAvailableOffline = function(songTitle) {
	return Ti.App.Properties.getBool('songs.offline.' + songTitle);
}
/**
 * Switch the boolean value in the properties indicating wether a song is available offline
 * @param {String} songTitle -
 * returns - the new boolean indicating if the song is available offline or not
 */
toggleAvailableOffline = function(songTitle) {
	setAvailableOffline(songTitle, !isAvailableOffline(songTitle));
	return !isAvailableOffline(songTitle);
}
exports.setSongFavorite = setSongFavorite;
exports.isFavorite = isFavorite;
exports.toggleFavorite = toggleFavorite;

exports.setAvailableOffline = setAvailableOffline;
exports.isAvailableOffline = isAvailableOffline;
exports.toggleAvailableOffline = toggleAvailableOffline;
