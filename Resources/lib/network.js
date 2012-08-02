exports.downloadFile = function(url, name) {
	Ti.API.info('======NETWORK MODULE========');
	Ti.API.info('Starting HTTP-connection');
	Ti.API.info('Downloading file: ' + url);
	var xhr = Titanium.Network.createHTTPClient({
		onload : function() {
			// first, grab a "handle" to the file where you'll store the downloaded data
			//PERMANENT DOWNLOAD
			// var f = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory + name + '.pdf');

			//TEMPORARY DOWNLOAD
			f = Ti.Filesystem.createTempFile();
			newPath = f.nativePath + '.pdf';
			f.move(newPath);
			f = Ti.Filesystem.getFile(newPath);
			//END TEMPORARY DOWNLOAD

			f.write(this.responseData);
			// write to the file
			Ti.App.fireEvent('pdf_downloaded', {
				filepath : f.nativePath
			});
		},
		timeout : 10000
	});
	xhr.open('GET', url);
	xhr.send();
	Ti.API.info('======END NETWORK MODULE');
}