/**
 * @author Mikkel Solberg
 */
exports.create = function(Cloud, song) {
	self = {};
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
	self.Cloud = Cloud;
	self.open = open;
	self.close = close;

	handlefavoriteButton.call(self);
	handleBackButton.call(self);
	return self;
}
open = function() {
	this.Window.open();
}
close = function() {
	this.Window.close();
}
handlefavoriteButton = function() {
	this.Window.favoriteButton.addEventListener('click', function(e) {
		isFavorite = require('/lib/properties').toggleFavorite(e.source.songTitle);
		e.source.backgroundImage = isFavorite ? '/images/star_disable_icon.png' : '/images/star_icon.png';
	});

	this.Window.downloadButton.addEventListener('click', function(e) {
		available = require('/lib/properties').toggleAvailableOffline(e.source.songTitle);
		e.source.backgroundImage = available ? '/images/download_disable_icon3.png' : '/images/download_icon.png';
	});
}

handleBackButton = function(){
	this.Window.addEventListener('android:back', function(e){
		Ti.App.fireEvent('app:navigation', {
			navigation : 'songList',
		});
	});
}
