/*global define*/
define(
	[ 'util/browser', 'util/addpublishers', 'util/el', 'util/time', 'util/localizetext', 'views/dialog' ],
	function ( browser, addPublishers, elHelper, timeHelper, loc, Dialog ) {
		function FrameView ( parentEl ) {
			if ( ! ( this instanceof FrameView ) ) {
				return new FrameView( parentEl );
			}

			var self = this;
			var fileOpenEl;
			var navButtonEl;
			var dialog;

			var publishers = addPublishers( self, 'openFrameMenu' );

			navButtonEl = elHelper.createButton( 'file.frame', 'file.frametitle', 'frame-button nav-button', parentEl );

			dialog = Dialog( 'open-file-dialog', parentEl, navButtonEl );
			var fileLabelEl = elHelper.createLabel( 'file.framelabeltitle', 'frame', 'frame-label label' );

			dialog.add(fileLabelEl);

			self.dialog = dialog;

			//dialog = Dialog( 'open-file-dialog', parentEl, navButtonEl );

			// var fileLabelEl = elHelper.createLabel( 'file.importtitle', 'input-file', 'file-label label' );

			// fileInputEl = document.createElement( 'input' );
			// fileInputEl.classList.add( 'file-input' );
			// fileInputEl.type = 'file';
			// fileInputEl.id = 'input-file';
			// fileInputEl.accept = 'image/*';

			// fileInputEl.addEventListener( 'change', fileSelected );

			// var fileLabelButtonEl = elHelper.createLabel( 'file.import', 'input-file', 'file-button button' );
			
			// dialog.add( fileLabelEl, fileInputEl, fileLabelButtonEl );

			// self.fileinput = fileInputEl;		
		}
		return FrameView;
	}	
);