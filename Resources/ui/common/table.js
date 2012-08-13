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
	tableRowHeight = 60;
	rowContainerHeight = tableRowHeight - 4;
	var rows = [];

	for (var i = 0; i < sanger.length; i++) {
		var row = Ti.UI.createTableViewRow({
			height : tableRowHeight,
			// borderWidth : 8,
			// borderColor : '#888888',
			// borderRadius : 8,
			// backgroundColor : '#CCCCCC',
		});

		var container = Ti.UI.createView({
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
			// backgroundColor : 'red',
		});

		var rightView = Ti.UI.createView({
			right : 20,
			width : Ti.UI.SIZE,
			layout : 'horizontal',
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
			// backgroundColor : 'red',
		});

		//Add star if favorite
		var isFavorite = require('/files/songs').isFavorite(sanger[i].cloudName);
		if (isFavorite) {
			var starView = Ti.UI.createImageView({
				height : 40,
				width : 40,
				top : 4,
				image : '/images/star_icon.png'
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
