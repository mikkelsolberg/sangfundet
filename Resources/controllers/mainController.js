var songTableController;
var songDetailController;

var MainController = function() {

	Ti.App.addEventListener('pdf_downloaded', function(e) {
		Ti.API.info('==============FILE DOWNLOAD==========');
		Ti.API.info('File path : ' + e.filepath);
		Ti.API.info('======================================');
		Ti.Platform.openURL(e.filepath);
	});
	Cloud = initializeCloud();
	songTableController = require('/controllers/songTableController').create(Cloud);
	songTableController.open();
	Ti.App.addEventListener('app:navigation', function(e) {
		Ti.API.info('Navigation: ' + e.navigation);
		switch(e.navigation) {
			case 'songDetail':
				songDetailController = require('/controllers/songDetailController').create(Cloud, e.song);
				songDetailController.open();
				break;
			case 'songList':
				songDetailController.close();
				songTableController.open();
				break;
		}
	});
}
initializeCloud = function() {
	var Cloud = require('/lib/ti.cloud');
	Cloud.debug = true;
	Cloud.Users.login({
		login : 'teste',
		password : 'teste',
	}, function(e) {
		if (e.success) {
			Ti.API.info('CloudMain ' + JSON.stringify(Cloud));
			var user = e.users[0];
			alert('Logged in! You are now logged in as ' + user.id);
		} else {
			Ti.API.info(JSON.stringify(e));
			alert('Error');
		}
	});
	return Cloud;
}
module.exports = MainController;
