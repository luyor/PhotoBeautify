/*global define*/
define(
	[ 'util/browser', 'util/addpublishers', 'util/el', 'util/time', 'util/localizetext', 'views/dialog' ],
	function ( browser, addPublishers, elHelper, timeHelper, loc, Dialog ) {
		function OpenFileView ( parentEl ) {
			if ( ! ( this instanceof OpenFileView ) ) {
				return new OpenFileView( parentEl );
			}

			var self = this;
			var fileOpenEl;
			var storageListEl;
			var emptyListEl;
			var navButtonEl;
			var dialog;

			var publishers = addPublishers( self, 'openfile', 'deletefromlocalstorage', 'openfromlocalstorage', 'deletefromimgur' );

			// check if the browser supports the filereader API
			// before displaying upload button
			if ( browser.getFeature( window, 'FileReader' ) ) {
				navButtonEl = elHelper.createButton( 'file.open', 'file.opentitle', 'open-button nav-button', parentEl );
				dialog = Dialog( 'open-file-dialog', parentEl, navButtonEl );

				var fileLabelEl = elHelper.createLabel( 'file.importtitle', 'input-file', 'file-label label' );

				fileInputEl = document.createElement( 'input' );
				fileInputEl.classList.add( 'file-input' );
				fileInputEl.type = 'file';
				fileInputEl.id = 'input-file';
				fileInputEl.accept = 'image/*';

				fileInputEl.addEventListener( 'change', fileSelected );

				var fileLabelButtonEl = elHelper.createLabel( 'file.import', 'input-file', 'file-button button' );
				
				dialog.add( fileLabelEl, fileInputEl, fileLabelButtonEl );

				self.fileinput = fileInputEl;				
			}
			
			function fileSelected ( event ) {
				if (
					event.target &&
					event.target.files &&
					event.target.files[0]
				) {
					publishers.openfile.dispatch( event.target.files[0] );
				}
			}

			self.dialog = dialog;
		}

		return OpenFileView;
	}	
);