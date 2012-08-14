/**
 * @author Mikkel Solberg
 */

var Cloud = require('ti.cloud');

//===================================
//========Song listing methods ======
//===================================
getSongs = function() {
	var songs = new Array();
	songs.push({
		title : 'Boar\'s Head Carol',
		voices : {
			B2 : 'G',
			B1 : 'D',
			T2 : 'G',
			T1 : 'B',
		},
		cloudName : 'boarsheadcarol',
	});
	songs.push({
		title : 'Brudeferden',
		voices : {
			B2 : 'G',
			B1 : 'D',
			T2 : 'G',
			T1 : 'B',
		},
		cloudName : 'brudeferden',
	});
	songs.push({
		title : 'Den norske sjømann',
		voices : {
			B2 : 'G',
			B1 : 'D',
			T2 : 'G',
			T1 : 'B',
		},
		cloudName : 'dennorskesjomann',
	});
	songs.push({
		title : 'Drikkevise',
		voices : {
			B2 : 'G',
			B1 : 'D',
			T2 : 'G',
			T1 : 'B',
		},
		cloudName : 'drikkevise',
	});
	songs.push({
		title : 'Ein König',
		voices : {
			B2 : 'G',
			B1 : 'D',
			T2 : 'G',
			T1 : 'B',
		},
		cloudName : 'einkonig',
	});
	songs.push({
		title : 'Gambrinus-visen',
		voices : {
			B2 : 'G',
			B1 : 'D',
			T2 : 'G',
			T1 : 'B',
		},
		cloudName : 'gambrinusvisen',
	});
	songs.push({
		title : 'Gammelt øl',
		voices : {
			B2 : 'G',
			B1 : 'D',
			T2 : 'G',
			T1 : 'B',
		},
		cloudName : 'gammeltol',
	});
	songs.push({
		title : 'Halvan',
		voices : {
			B2 : 'G',
			B1 : 'D',
			T2 : 'G',
			T1 : 'B',
		},
		cloudName : 'halvan',
	});
	songs.push({
		title : 'Hej, dunkom',
		voices : {
			B2 : 'G',
			B1 : 'D',
			T2 : 'G',
			T1 : 'B',
		},
		cloudName : 'hejdunkom',
	});
	songs.push({
		title : 'Helan går',
		voices : {
			B2 : 'G',
			B1 : 'D',
			T2 : 'G',
			T1 : 'B',
		},
		cloudName : 'helangar',
	});
	songs.push({
		title : 'Kvarten',
		voices : {
			B2 : 'G',
			B1 : 'D',
			T2 : 'G',
			T1 : 'B',
		},
		cloudName : 'kvarten',
	});
	songs.push({
		title : 'Madrigal',
		voices : {
			B2 : 'G',
			B1 : 'D',
			T2 : 'G',
			T1 : 'B',
		},
		cloudName : 'madrigal',
	});
	songs.push({
		title : 'Mannen og kråka',
		voices : {
			A2 : 'G',
			A1 : 'D',
			S2 : 'G',
			S1 : 'B',
		},
		cloudName : 'mannenogkraka',
	});
	songs.push({
		title : 'Metsämiehen juomalaulu',
		voices : {
			B2 : 'G',
			B1 : 'D',
			T2 : 'G',
			T1 : 'B',
		},
		cloudName : 'metsameihen',
	});
	songs.push({
		title : 'Olav Trygvason',
		voices : {
			B2 : 'G',
			B1 : 'D',
			T2 : 'G',
			T1 : 'B',
		},
		cloudName : 'olavtrygvason',
	});
	songs.push({
		title : 'Studentsång',
		voices : {
			B2 : 'G',
			B1 : 'D',
			T2 : 'G',
			T1 : 'B',
		},
		cloudName : 'studentsang',
	});
	songs.push({
		title : 'Till Østerland',
		voices : {
			B2 : 'F#',
			B1 : 'F#',
			T2 : 'F#',
			T1 : 'F#',
		},
		cloudName : 'osterland',
	});
	return songs;
}
getFavorites = function(songs) {
	var favorites = new Array();
	for (var i = 0; i < songs.length; i++) {
		if (isFavorite(songs[i].cloudName)) {
			favorites.push(songs[i]);
		}
	}
	return favorites;
}
getAvailableOfflines = function(songs) {
	var offlines = new Array();
	for (var i = 0; i < songs.length; i++) {
		if (isAvailableOffline(songs[i].cloudName)) {
			offlines.push(songs[i]);
		}
	}
	return offlines;
}
//===================================
//========Favorite song properties===
//===================================

setSongFavorite = function(cloudName, value) {
	Ti.API.info('Setter ' + cloudName + ' til favoritt ' + value);
	Ti.App.Properties.setBool('songs.favorite.' + cloudName, value);
}
isFavorite = function(cloudName) {
	return Ti.App.Properties.getBool('songs.favorite.' + cloudName);
}
/**
 * Switch the boolean value in the properties indicating wether a song is a favorite
 * @param {String} songTitle -
 * returns - the new boolean indicating if the song is a favorite or not
 */
toggleFavorite = function(cloudName) {
	Ti.API.info('Toggling if ' + cloudName + ' is favorite');
	setSongFavorite(cloudName, !isFavorite(cloudName));
	Ti.API.info('Returning: ' + isFavorite(cloudName));
	return isFavorite(cloudName);
}
//=======================================
//========Available offline properties===
//=======================================

setAvailableOffline = function(cloudName, value) {
	Ti.API.info('Setter ' + cloudName + ' til offline ' + value);
	if (value) {
		downloadSong(cloudName, false, false);
	} else if (!value) {
		deleteSong(cloudName);
		Ti.App.Properties.setBool('songs.offline.' + cloudName, value);
	}

}
isAvailableOffline = function(cloudName) {
	return Ti.App.Properties.getBool('songs.offline.' + cloudName);
}
/**
 * Switch the boolean value in the properties indicating wether a song is available offline
 * @param {String} songTitle -
 * returns - the new boolean indicating if the song is available offline or not
 */
toggleAvailableOffline = function(cloudName) {
	Ti.API.info('Toggling if' + cloudName + 'is available offline');
	setAvailableOffline(cloudName, !isAvailableOffline(cloudName));
	Ti.API.info('Returning: ' + isAvailableOffline(cloudName));
	return isAvailableOffline(cloudName);
}

//===================================
//========OTHER FUNCTIONS ===========
//===================================

openSong = function(cloudName) {
	if (!isAvailableOffline(cloudName)) {
		//If not available offline -> download file temporarily
		downloadSong(cloudName, true, true);
	} else {
		var filename = Ti.Filesystem.externalStorageDirectory + Ti.Filesystem.separator + cloudName + '.pdf';
		var file = Ti.Filesystem.getFile(filename);
		openPDF(file);
	}
}
/**
 *
 * @param {Object} cloudName
 * @param {Object} temporaryFile
 * returns - true on success, false on failure
 */
downloadSong = function(cloudName, temporaryFile, openAfterDownload) {
	Cloud.Files.query({
		where : {
			name : cloudName,
		},
	}, function(f) {
		if (f.success) {
			var file = f.files[0];
			Ti.API.info('Fant cloud FIL:' + JSON.stringify(file));
			Ti.API.info('Ved URL' + file.url);
			var callbackFunc = openAfterDownload ? openPDF : downloadComplete;
			require('/lib/network').downloadFile(file.url, file.name, temporaryFile, callbackFunc);
		} else {
			alert('Vennligst sjekk internettilkoblingen din');
		}
	});
}

deleteSong = function(cloudName) {
	Ti.API.info('Deleting song: ' + cloudName);
	var filename = Ti.Filesystem.externalStorageDirectory + Ti.Filesystem.separator + cloudName + '.pdf';
	var file = Ti.Filesystem.getFile(filename);
	file.deleteFile();
}

openPDF = function(file) {
	Ti.API.info('==============FILE OPEN==========');
	Ti.API.info('File path : ' + file.nativePath);
	Ti.API.info('=================================');
	Ti.Platform.openURL(file.nativePath);
}
downloadComplete = function(file) {
	Ti.API.info('Download complete!');
	Ti.App.Properties.setBool('songs.offline.' + file.cloudName, true);
	Ti.App.fireEvent('ui:downloadComplete', {
		cloudName : file.cloudName,
	});
}

exports.getAvailableOfflines = getAvailableOfflines;
exports.getFavorites = getFavorites;
exports.getSongs = getSongs;

exports.setSongFavorite = setSongFavorite;
exports.isFavorite = isFavorite;
exports.toggleFavorite = toggleFavorite;

exports.setAvailableOffline = setAvailableOffline;
exports.isAvailableOffline = isAvailableOffline;
exports.toggleAvailableOffline = toggleAvailableOffline;

exports.openSong = openSong;
exports.downloadSong = downloadSong;
exports.openPDF = openPDF;
