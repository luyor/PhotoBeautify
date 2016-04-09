/*global define*/
define(
	[ 'util/el', 'util/addpublishers', 'util/browser', 'views/dialog', 'util/time' ],
	function ( elHelper, addPublishers, browser, Dialog, timeHelper ) {
		function SaveView ( parentEl , imageModel) {
			if ( ! ( this instanceof SaveView ) ) {
				return new SaveView( parentEl ,imageModel);
			}

			var self = this;
			var publishers = addPublishers( self, 'show' );

			var saveButtonEl;
			var navButtonEl;
			var dialog;
			var downloadLinkEl;
			var date;
			var fileId;
			var isActive = false;

			navButtonEl = elHelper.createButton( 'file.saveinbrowser', 'file.saveinbrowsertitle', 'nav-button save-view-button', parentEl );

			dialog = Dialog( 'save-dialog', parentEl, navButtonEl );
			
			downloadLinkEl = elHelper.createLink(
				'file.download',
				'file.downloadtitle',
				null, null,
				'download-link button'
			);

			downloadLinkEl.target = '_blank';

			dialog
				.on( 'show', activate )
				.on( 'hide', deactivate )
				.add( downloadLinkEl );

			// the href attribute of the download link is updated every time
			// we change a parameter
			function updateDownloadLink ( ) {
				fileName = 'beautify.png';
				var newUrl = imageModel.getLastImageSRC();

				// setting the download attribute makes the browser
				// download the link target instead of opening it
				downloadLinkEl.setAttribute( 'download', fileName );
				downloadLinkEl.href = newUrl;
			}

			function activate () {
				isActive = true;
				publishers.show.dispatch();
			}

			function deactivate () {
				isActive = false;
			}

			function getActive () {
				return isActive;
			}

			self.updateDownloadLink = updateDownloadLink;
			self.getActive = getActive;
		}

		return SaveView;
	}
);