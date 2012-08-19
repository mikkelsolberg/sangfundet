/**
 * @author Mikkel Solberg
 */
self = {};

exports.create = function(song) {

	var osname = Ti.Platform.osname, version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;

	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));

	var Window;
	if (isTablet) {
		Window = require('ui/tablet/songDetailWindow');
	} else {
		Window = require('ui/handheld/songDetailWindow');
	}

	self.Window = new Window(song);
	self.open = open;
	self.close = close;

	handleButtons.call(self);
	handleBackButton.call(self);

	return self;
}
open = function() {
	Ti.App.addEventListener('app:download:complete', downloadCompleted);
	Ti.App.addEventListener('app:download:progress', updateProgressBar);
	Ti.Gesture.addEventListener('orientationchange', onOrientationChange);
	this.Window.open();
	this.Window.progressBar.hide();
}
close = function() {
	Ti.Gesture.removeEventListener('orientationchange', onOrientationChange);
	this.Window.close();
	Ti.App.removeEventListener('app:download:complete', downloadCompleted);
	Ti.App.removeEventListener('app:download:progress', updateProgressBar);
}
handleButtons = function() {
	var Songs = require('/files/songs');
	progressBar = this.Window.progressBar;
	this.Window.favoriteButton.addEventListener('click', function(e) {
		Ti.API.info('Fav-button: CLICK');
		isFavorite = Songs.toggleFavorite(e.source.songTitle);
		e.source.backgroundImage = isFavorite ? '/images/star_disable_icon.png' : '/images/star_icon.png';
	});

	this.Window.downloadButton.addEventListener('click', function(e) {
		Ti.API.info('Download-button: CLICK');
		if (!Songs.isAvailableOffline(e.source.songTitle)) {
			//The song must be downloaded
			progressBar.setValue(0);
			progressBar.show();
		}

		var available = Songs.toggleAvailableOffline(e.source.songTitle);
		e.source.backgroundImage = available ? '/images/download_disable_icon3.png' : '/images/download_icon3.png';
	});

	this.Window.openButton.addEventListener('click', function(e) {
		if (!Songs.isAvailableOffline(e.source.songTitle)) {
			//The song must be downloaded
			progressBar.value = 0;
			progressBar.show();
		}
		Songs.openSong(e.source.songTitle);
	});
}
downloadCompleted = function(e) {
	Ti.API.info('songDetail: Event : download complete');
	self.Window.downloadComplete();
	Ti.App.removeEventListener('app:downloadComplete', downloadCompleted);
}
handleBackButton = function() {
	this.Window.addEventListener('android:back', function(e) {
		Ti.App.fireEvent('app:navigation', {
			navigation : 'songList',
		});
	});
}
onOrientationChange = function() {
	self.Window.orientationChange();
}
updateProgressBar = function(e) {
	Ti.API.info('Updating progress bar');
	var downloaded = e.filesize * e.progress;
	self.Window.progressBar.value = e.progress;
	//Does not work, Titanium bug?
	self.Window.progressBar.setMessage('Laster ned ' + downloaded + '/' + e.fileszie + ' kb');
};
