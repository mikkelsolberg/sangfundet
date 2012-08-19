exports.downloadFile = function(url, name, temporaryFile, callback) {
	Ti.API.info('======NETWORK MODULE========');
	Ti.API.info('Starting HTTP-connection');
	Ti.API.info('Downloading file: ' + url);

	var f = null;

	if (temporaryFile) {
		f = Ti.Filesystem.createTempFile();
		newPath = f.nativePath + '.pdf';
		f.move(newPath);
		f = Ti.Filesystem.getFile(newPath);
	} else {
		var filename = Ti.Filesystem.externalStorageDirectory + Ti.Filesystem.separator + name + '.pdf';
		f = Ti.Filesystem.getFile(filename);
		// f.createFile();
	}

	var xhr = Titanium.Network.createHTTPClient({
		onload : function() {
			// first, grab a "handle" to the file where you'll store the downloaded data
			//PERMANENT DOWNLOAD
			// var f = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory + name + '.pdf');
			Ti.API.info('Lastet ned PDF!');
			f.write(this.responseData);
			f.downloaded = true;
			f.cloudName = name;
			callback(f);
			// write to the file
			// Ti.App.fireEvent('pdf_downloaded', {
			// filepath : f.nativePath,
			// isTemp : temporaryFile,
			// open : open,
			// });
		},
		onerror : function(e) {
			Ti.API.debug('NETTVERKSFEIL' + e.error);
			alert('error');
		},
		ondatastream : function(e) {
			Ti.API.info('Progress: ' + e.progress);
			Ti.App.fireEvent('app:download:progress', {
				progress : e.progress,
				filesize : Math.round(this.getResponseHeader('Content-Length') / 1024),
			});
		},
		onreadystatechange : function(e) {
			Ti.API.info('StateChange: ' + this.readyState);
			if (this.readyState == 2 ) {
				Ti.API.info('StateChange: ' + JSON.stringify(e));
				var kb = Math.round(this.getResponseHeader('Content-Length') / 1024);
				Ti.API.info('Filstørrelse: ' + kb + ' kb');
			}
		},

		timeout : 3000
	});
	xhr.open('GET', url);
	xhr.send();
	Ti.API.info('======END NETWORK MODULE');
}
//Deprecated
exports.downloadSong = function(Cloud, songCloudName, temporaryFile, open) {
	Cloud.Files.query({
		where : {
			name : songCloudName
		},
	}, function(f) {
		if (f.success) {
			var file = f.files[0];
			Ti.API.info('FIL:' + JSON.stringify(file));
			Ti.API.info('URL' + file.url);
			downloadFile(file.url, file.name, temporaryFile, open);
		} else {
			alert('Vennligst sjekk internettilkoblingen din');
		}
	});
	//end query
}
