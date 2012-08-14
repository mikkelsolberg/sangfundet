/**
 * @author Mikkel Solberg
 */
var TableView = function(sanger) {
	rows = createRows(sanger);
	Ti.API.info('Lager tabell');

	Ti.API.info('ROWS: ' + rows);
	var self = Ti.UI.createTableView({
		top : 10,
		width : '90%',
		backgroundColor : '#7546D7',
		separatorColor : 'transparent',
		opacity : 0.25,
		data : rows,
		borderColor : 'transparent',
		borderRadius : 10,
		borderWidth : 3,
	});
	self.update = update;
	return self;
}
update = function(sanger) {
	this.setData(createRows(sanger));
}
createRows = function(sanger) {
	var Songs = require('/files/songs');
	tableRowHeight = 60;
	rowContainerHeight = tableRowHeight - 4;
	var rows = [];

	for (var i = 0; i < sanger.length; i++) {
		var row = Ti.UI.createTableViewRow({
			height : tableRowHeight,
			touchEnabled : false,
			enabled : false,
			// borderWidth : 8,
			// borderColor : '#888888',
			// borderRadius : 8,
			// backgroundColor : '#CCCCCC',
		});

		var container = Ti.UI.createView({
			top : 0,
			height : rowContainerHeight,
			backgroundColor : '#290671',
			borderColor : 'transparent',
			borderWidth : 3,
			borderRadius : 20,
			// layout : 'horizontal',
		});

		var titleLabel = Ti.UI.createLabel({
			text : sanger[i].title,
			top : (rowContainerHeight - 30) / 2,
			// height : (rowContainerHeight - 20) / 2,
			left : 20,
			color : 'white',
			font : {
				fontSize : 20,
			},
			touchEnabled : false,
			enabled : false,
			// backgroundColor : 'red',
		});

		var rightView = Ti.UI.createView({
			right : 20,
			width : Ti.UI.SIZE,
			layout : 'horizontal',
			touchEnabled : false,
			enabled : false,
		});

		voices = getVoicesAsString(sanger[i].voices);
		var voicesLabel = Ti.UI.createLabel({
			text : voices,
			top : (rowContainerHeight - 30) / 2,
			// bottom : (rowContainerHeight - 40) / 2,
			// height : (rowContainerHeight - 20) / 2,
			// right : 20,
			textAlign : 'right',
			color : 'white',
			font : {
				fontSize : 20,
			},
			touchEnabled : false,
			enabled : false,
			// backgroundColor : 'red',
		});

		//Add star if favorite
		var isFavorite = Songs.isFavorite(sanger[i].cloudName);
		if (isFavorite) {
			var starView = Ti.UI.createImageView({
				height : 40,
				width : 40,
				top : 4,
				image : '/images/star_icon.png',
				touchEnabled : false,
			});
			rightView.add(starView);

		}

		container.add(titleLabel);

		rightView.add(voicesLabel);
		container.add(rightView);
		row.add(container);
		row.container = container;
		row.cloudName = sanger[i].cloudName;
		row.song = sanger[i];

		container.addEventListener('touchstart', function(e) {
			// Ti.API.info('ROW TOUCHSTART');
			// Ti.API.info('e.source ' + e.source);
			e.source.updateLayout({
				left : 5,
				top : 5,
				backgroundColor : '#472B83',
			});
		});

		container.addEventListener('touchend', function(e) {
			Ti.API.info('ROW TOUCHEND');
			e.source.updateLayout({
				left : 0,
				top : 0,
				backgroundColor : '#290671',
			});
		});
		container.addEventListener('touchcancel', function(e) {
			Ti.API.info('ROW TOUCHCANCEL');
			e.source.updateLayout({
				left : 0,
				top : 0,
				backgroundColor : '#290671',
			});
		});

		rows.push(row);
	}

	return rows;
}
/**
 * @param {Object} voices - object holding the voices of the song
 * returns a string of the voices without numbering, i.e. B2B1T2T1 -> BBTT
 */
getVoicesAsString = function(voices) {
	voicesString = '';
	for (var key in voices) {
		voicesString += key.replace(/[^A-z]/g, '');
		//Remove numbering
	}
	return voicesString;
};

module.exports = TableView;
