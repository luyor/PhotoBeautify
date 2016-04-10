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

			var publishers = addPublishers( self, 'updateControlView' );

			navButtonEl = elHelper.createButton( 'file.frame', 'file.frametitle', 'frame-button nav-button', parentEl );

			dialog = Dialog( 'open-file-dialog', parentEl, navButtonEl );
			var fileLabelEl = elHelper.createLabel( 'file.framelabeltitle', 'frame', 'frame-label label' );

			dialog.add(fileLabelEl);

			self.dialog = dialog;

			navButtonEl.addEventListener( 'click', click );

			function click() {
				publishers.updateControlView.dispatch( ["a", "b"] );
			}
			
		}
		return FrameView;
	}	
);