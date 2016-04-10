/*global define*/
define(
	[ 'util/browser', 'util/addpublishers', 'util/el', 'util/time', 'util/localizetext', 'views/dialog' ],
	function ( browser, addPublishers, elHelper, timeHelper, loc, Dialog ) {
		function AdjustView ( parentEl ) {
			if ( ! ( this instanceof AdjustView ) ) {
				return new AdjustView( parentEl );
			}

			var self = this;
			var fileOpenEl;
			var navButtonEl;
			var dialog;

			var publishers = addPublishers( self, 'updateControlView' );

			navButtonEl = elHelper.createButton( 'file.adjust', 'file.adjusttitle', 'adjust-button nav-button', parentEl );

			dialog = Dialog( 'open-file-dialog', parentEl, navButtonEl );
			var fileLabelEl = elHelper.createLabel( 'file.adjustlabeltitle', 'adjust', 'adjust-label label' );

			dialog.add(fileLabelEl);

			self.dialog = dialog;

            navButtonEl.addEventListener( 'click', click );

            function click() {
                publishers.updateControlView.dispatch();
            }
			
		}
		return AdjustView;
	}	
);