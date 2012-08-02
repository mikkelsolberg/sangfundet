function ApplicationWindow(title) {
	var self = Ti.UI.createWindow({
		title : title,
		backgroundColor : '#8F6CD7', // Lys blå fra myTss,
		exitOnClose : true,
	});

	var Songs = require('/files/songs');
	var songs = Songs.getSongs();

	var Table = require('/ui/common/table');
	var table;
	if (title == 'Favoritter') {
		favorites = Songs.getFavorites(songs);
		table = new Table(favorites);
	} else if (title == 'Nedlastede') {
		offlines = Songs.getAvailableOfflines(songs);
		table = new Table(offlines);
	} else {
		table = new Table(songs);
	}
	self.add(table);
	self.table = table;

	return self;
};

module.exports = ApplicationWindow;
