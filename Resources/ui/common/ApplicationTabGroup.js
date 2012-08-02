function ApplicationTabGroup(Window) {
	//create module instance
	var self = Ti.UI.createTabGroup();

	//create app tabs
	var win1 = new Window('Alle');
	var win2 = new Window('Nedlastede');
	var win3 = new Window('Favoritter');

	var tab1 = Ti.UI.createTab({
		title : 'Alle',
		icon : '/images/KS_nav_ui.png',
		window : win1
	});
	win1.containingTab = tab1;

	var tab2 = Ti.UI.createTab({
		title : 'Nedlastede',
		icon : '/images/download_icon3.png',
		window : win2
	});
	win2.containingTab = tab2;

	var tab3 = Ti.UI.createTab({
		title : 'Favoritter',
		icon : '/images/star_icon.png',
		window : win3
	});
	win3.containingTab = tab3;

	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	self.allWindow = win1;
	self.downloadWindow = win2;
	self.favouriteWindow = win3;

	return self;
};

module.exports = ApplicationTabGroup;
