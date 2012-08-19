/**
 *
 */
exports.create = function() {
	self = {};
	var osname = Ti.Platform.osname, version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;

	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));

	var Window;
	if (isTablet) {
		Window = require('ui/tablet/ApplicationWindow');
	} else {
		Window = require('ui/handheld/ApplicationWindow');
	}

	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	self.tabGroup = new ApplicationTabGroup(Window);

	self.open = open;
	self.close = close;

	startAllTableListener.call(self);
	startDownloadedTableListener.call(self);
	return self;
}
open = function() {
	Ti.API.info('SongTableController.open()');
	var Songs = require('/files/songs');
	var songs = Songs.getSongs();
	var favorites = Songs.getFavorites(songs);
	var offlines = Songs.getAvailableOfflines(songs);

	this.tabGroup.allWindow.table.update(songs);
	this.tabGroup.favouriteWindow.table.update(favorites);
	this.tabGroup.downloadWindow.table.update(offlines);

	this.tabGroup.open();
}
close = function() {
	this.tabGroup.close();
}
startAllTableListener = function() {
	Ti.API.info('Setup table listener');
	this.tabGroup.allWindow.table.addEventListener('click', function(e) {
		Ti.App.fireEvent('app:navigation', {
			navigation : 'songDetail',
			song : e.row.song,
		});
	});
}
startDownloadedTableListener = function() {
	Ti.API.info('Setup table listener');
	this.tabGroup.downloadWindow.table.addEventListener('click', function(e) {
		require('/files/songs').openSong(e.row.cloudName);
	});
	//end eventListener
}