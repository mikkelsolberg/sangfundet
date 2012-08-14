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
	detectNetworkChange(Cloud);
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
	Cloud.online = Ti.Network.online;
	Cloud.Users.login({
		login : 'korist',
		password : 'korist',
	}, function(e) {
		if (e.success) {
			Ti.API.info('CloudMain ' + JSON.stringify(Cloud));
			var user = e.users[0];
			// alert('Logged in! You are now logged in as ' + user.username);
			createAltertBox('Logget inn', 'Du har logget inn som ' + user.username);
		} else {
			Ti.API.info(JSON.stringify(e));
			createAltertBox('Feil', 'Klarte ikke å logge inn. Sjekk internettforbindelsen');
		}
	});
	return Cloud;
}
detectNetworkChange = function(Cloud) {
	setInterval(function() {
		if (Ti.Network.online != Cloud.online) {
			Ti.API.info(' ===================================================');
			Ti.API.info(' ================= NETTVERKSENDRING! ===============');
			Ti.API.info(' ===================================================');
			initializeCloud();
			Cloud.online = Ti.Network.online;
		}
	}, 1000);
}
createAltertBox = function(title, text) {
	view = Ti.UI.createView({
		// left : 10,
		// right : 10,

	});

	textLabel = Ti.UI.createLabel({
		left : 10,
		right : 10,
		text : text,
		color : 'white',
		font : {
			fontSize : 18,
		}
	});
	view.add(textLabel);

	var alertDialog = Ti.UI.createAlertDialog({
		title : title,
		androidView : view,
		buttonNames : ['OK'],
		cancel : 0,
	});
	alertDialog.show();
}

module.exports = MainController;
