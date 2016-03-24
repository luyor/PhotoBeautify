/*global define*/
define(
	[ 'util/el', 'views/dialog', 'util/localizetext' ],
	function ( elHelper, Dialog, loc ) {
		function AboutView ( parentEl ) {
			if ( ! ( this instanceof AboutView ) ) {
				return new AboutView ( parentEl );
			}

			var self = this;
			var buttonEl = elHelper.createButton( 'about.info', 'about.infotitle', 'nav-button info-button', parentEl );
			var dialog = Dialog( 'about-dialog', parentEl, buttonEl );
			var aboutEl = elHelper.createEl( 'div', 'about-content' );
			var textEl = document.querySelector( '.description' );

			loc( textEl, 'innerHTML', 'index.description' );
			
			aboutEl.appendChild( textEl );

			dialog.add( aboutEl );
		}

		return AboutView;
	}
);