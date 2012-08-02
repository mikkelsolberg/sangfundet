/**
 * @author Mikkel
 */

var SongDetailWindow = function(song) {
	screenWidth = Ti.Platform.displayCaps.platformWidth;

	var self = Ti.UI.createWindow({
		navBarHidden : true,
		backgroundColor : '#8F6CD7', // Lys blå fra myTss
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

	var favoriteButton = Ti.UI.createButton({
		backgroundImage : '/images/star_icon.png',
		backgroundColor : 'gray',
		borderColor : 'black',
		borderWidth : 3,
		borderRadius : 10,
		width : 55,
		height : 50,
		left : (screenWidth - 4 * 50) / 5,
		top : 5,
		songTitle : song.title,
	});

	favoriteButton.addEventListener('touchstart', function(e) {
		e.source.backgroundColor = 'orange';
	});
	favoriteButton.addEventListener('touchend', function(e) {
		e.source.backgroundColor = 'gray';
	});

	buttonBar.add(favoriteButton);

	var downloadButton = Ti.UI.createButton({
		image : '/images/download_icon3.png',
		width : 55,
		height : 50,
		left : (screenWidth - 4 * 50) / 5,
		top : 5,
		songTitle : song.title,
	});
	buttonBar.add(downloadButton);

	var openButton = Ti.UI.createButton({
		image : '/images/pdf_icon.png',
		width : 55,
		height : 50,
		left : (screenWidth - 4 * 50) / 5,
		top : 5,
		songTitle : song.title,
	});
	buttonBar.add(openButton);

	self.favoriteButton = favoriteButton;
	self.downloadButton = downloadButton;
	self.openButton = openButton;
	//END BUTTON BAR

	//MAIN VIEW
	var mainView = Ti.UI.createView({

	});
	//END MAIN VIEW

	self.add(toolbar);
	self.add(buttonBar);
	self.add(mainView);

	//Reload the menu on changing of orientation
	Ti.Gesture.addEventListener('orientationchange', onOrientationChange);

	//Cleanup on close
	self.addEventListener('close', function(e) {
		//remove event listener
		Ti.Gesture.removeEventListener('orientationchange', onOrientationChange);
	});

	return self;
}
onOrientationChange = function(e) {
	screenWidth = Ti.Platform.displayCaps.platformWidth;
	e.source.favoriteButton.left = (screenWidth - 4 * 55) / 5;
	e.source.downloadButton.left = (screenWidth - 4 * 55) / 5;
	e.source.openButton.left = (screenWidth - 4 * 55) / 5;
}

module.exports = SongDetailWindow;
