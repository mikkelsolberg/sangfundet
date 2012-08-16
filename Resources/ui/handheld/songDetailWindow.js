/**
 * @author Mikkel Solberg
 */

var SongDetailWindow = function(song) {
	screenWidth = Ti.Platform.displayCaps.platformWidth;

	var self = Ti.UI.createWindow({
		navBarHidden : true,

		layout : 'vertical',
	});

	//TOOLBAR
	var toolbar = Ti.UI.createView({
		height : 60,
		backgroundColor : '#290671',
		// opacity : 0.25,
	});

	var titleLabel = Ti.UI.createLabel({
		text : song.title,
		font : {
			fontSize : 26,
		},
		color : 'white',
	});
	toolbar.add(titleLabel);
	//END TOOLBAR

	//BUTTON BAR
	var buttonBar = Ti.UI.createView({
		height : 60,
		backgroundColor : '#7546D7',
		layout : 'horizontal',
	});

	isFavorite = require('/files/songs').isFavorite(song.cloudName);
	var favoriteButton = Ti.UI.createButton({
		backgroundImage : isFavorite ? '/images/star_disable_icon.png' : '/images/star_icon.png',
		backgroundColor : 'gray',
		borderColor : 'black',
		borderWidth : 3,
		borderRadius : 10,
		width : 55,
		height : 50,
		left : (screenWidth - 4 * 50) / 5,
		top : 5,
		songTitle : song.cloudName,
	});

	favoriteButton.addEventListener('touchstart', function(e) {
		Ti.API.info('Fav-button: TOUCHSTART');
		e.source.backgroundColor = 'orange';
	});
	favoriteButton.addEventListener('touchend', function(e) {
		Ti.API.info('Fav-button: TOUCHEND');
		e.source.backgroundColor = 'gray';
	});

	buttonBar.add(favoriteButton);

	isAvailableOffline = require('/files/songs').isAvailableOffline(song.cloudName);
	var downloadButton = Ti.UI.createButton({
		backgroundImage : isAvailableOffline ? '/images/download_disable_icon3.png' : '/images/download_icon3.png',
		backgroundColor : 'gray',
		borderColor : 'black',
		borderWidth : 3,
		borderRadius : 10,
		width : 55,
		height : 50,
		left : (screenWidth - 4 * 50) / 5,
		top : 5,
		songTitle : song.cloudName,
	});
	downloadButton.addEventListener('touchstart', function(e) {
		Ti.API.info('downloadButton: TOUCHSTART');
		e.source.backgroundColor = 'orange';
	});
	downloadButton.addEventListener('touchend', function(e) {
		Ti.API.info('downloadButton: TOUCHEND');
		e.source.backgroundColor = 'gray';
	});
	buttonBar.add(downloadButton);

	var openButton = Ti.UI.createButton({
		image : '/images/pdf_icon2.png',
		backgroundColor : 'gray',
		borderColor : 'black',
		borderWidth : 3,
		borderRadius : 10,
		width : 55,
		height : 50,
		left : (screenWidth - 4 * 50) / 5,
		top : 5,
		
		songTitle : song.cloudName,
	});

	openButton.addEventListener('touchstart', function(e) {
		Ti.API.info('openButton: TOUCHSTART');
		e.source.backgroundColor = 'orange';
	});
	openButton.addEventListener('touchend', function(e) {
		Ti.API.info('openButton: TOUCHEND');
		e.source.backgroundColor = 'gray';
	});

	buttonBar.add(openButton);

	self.favoriteButton = favoriteButton;
	self.downloadButton = downloadButton;
	self.openButton = openButton;
	//END BUTTON BAR

	//MAIN VIEW
	var mainView = Ti.UI.createView({
		backgroundColor : '#8F6CD7', // Lys blå fra myTss
	});
	//END MAIN VIEW

	self.add(toolbar);
	self.add(buttonBar);

	progressBar = setupProgressBar();
	self.progressBar = progressBar;
	mainView.add(progressBar);

	self.add(mainView);
	// progressBar.show();
	//Reload the menu on changing of orientation
	Ti.Gesture.addEventListener('orientationchange', onOrientationChange);

	//Cleanup on close
	self.addEventListener('close', function(e) {
		//remove event listener
		Ti.Gesture.removeEventListener('orientationchange', onOrientationChange);
	});
	
	// self.buttons = [];
	// self.buttons['favorite'] = favoriteButton;

	return self;
}

switchButtonIcon = function(buttonName, value){
	if(buttonName == 'downloadButton'){
		this.downloadButton.backgroundImage = value ? '/images/download_disable_icon3.png' : '/images/download_icon3.png';
	}
}

onOrientationChange = function(e) {
	Ti.App.fireEvent('app:orientation:songDetailWindow');
}
setupProgressBar = function() {
	var progressBar = Ti.UI.createProgressBar({
		top : 10,
		width : 250,
		height : 50,
		min : 0,
		max : 1,
		value : 0,
		color : '#fff',
		// zindex : 1,
		visible : false,
		message : 'Laster ned',
		font : {
			fontSize : 20,
			fontWeight : 'bold'
		},
	});

	return progressBar;
}

module.exports = SongDetailWindow;
