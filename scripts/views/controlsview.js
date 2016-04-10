/*global define*/
define(
	[ 'util/addpublishers', 'util/el', 'util/localizetext' ],
	function ( addPublishers, elHelper, loc ) {
		// the control elements are used to change the appearance of the image
		function ControlsView ( parentEl, buttonParentEl, params ) {
			if ( ! ( this instanceof ControlsView ) ) {
				return new ControlsView( parentEl, buttonParentEl, params );
			}

			params = params || { };

			var self = this;
			var publishers = addPublishers( self, 'update','filter','framesign');

			var isIgnoringInput = false;
			var isActive = true;
			var activeTimeoutId = 0;

			var inputEls = { };
			var valueEls = { };

			var controlsEl = elHelper.createEl( 'div', 'controls', parentEl );
			var AdjustmenuEl = elHelper.createEl( 'div', 'controls-wrapper', controlsEl );
			var FiltermenuEl = elHelper.createEl( 'div', 'controls-wrapper', controlsEl );
			var FramemenuEl = elHelper.createEl( 'div', 'controls-wrapper', controlsEl );

			var selected;

			//var AdjustmenuEl = elHelper.createEl('div', 'menu-wrapper',controlsWrapperEl );
			var buttonEl = elHelper.createButton( 'controls.controls', 'controls.controlstitle', 'controls-toggle-button button is-active', buttonParentEl, toggleControls );
			
			//var ori_filter = addFilter ('Original');
			addFilter ('GrayscaleFilter');
			addFilter ('AgedFilter');
			addFilter ('MagnifyFilter');
			addFilter ('IcedFilter');
			addFilter ('TileFilter');
			addFilter ('SharpnessFilter');
			addFilter ('BlurFilter');
			addFilter ('ReliefFilter');
			addFilter ('CarnivalFilter');

			
			addFrame ('BlackEdgeFrame');
			addFrame('CircleFrame');
			addFrame('RainyFrame');
			addFrame('FlowerFrame');
			addFrame('VintageFrame');
			addFrame ('DiamondFrame');
			addFrame('LoveFrame');		
			addFrame('WhiteSpotFrame');
			addFrame('StarFrame');



			for ( var key in params  ) {
				addControl( key, params[key] ,AdjustmenuEl);
			}
			
			AdjustmenuEl.style.display = "none";
			FiltermenuEl.style.display = "none";
			FramemenuEl.style.display = "none";

			show();
		
			function addFilter (name){
				var filterfunc = function (){
					resetAll();
					setSelect(document.getElementById('filter.'+name));
					publishers.filter.dispatch(name);
				}
				var btnEl=elHelper.createButton('controls.'+name,'controls.'+name,name+'-button image-button',FiltermenuEl,filterfunc);
				btnEl.setAttribute('id','filter.'+name);
				return btnEl;

			}

			function addFrame (name){
				var framefunc = function (){
					resetAll();
					setSelect(document.getElementById('frame.'+name));
					publishers.framesign.dispatch(name);
				}
				var btnEl=elHelper.createButton('controls.'+name,'controls.'+name,name+'-button image-button',FramemenuEl,framefunc);
				btnEl.setAttribute('id','frame.'+name);
				return btnEl
			}

			function setSelect(btnEl){
				if (selected) selected.setAttribute('selected',false);
				selected=btnEl;
				if(btnEl) selected.setAttribute('selected',true);
			}

			function resetAll(){
				setSelect(null);
				reset();
			}

			function addControl ( key, params,parentEl ) {
				var controlEl = elHelper.createEl( 'div', 'control', AdjustmenuEl );
				
				var labelEl = elHelper.createLabel( 'controls.' + key, 'input-' + key, 'control-label', controlEl );
				loc( labelEl, 'title', 'controls.' + key );
				
				var inputEl = elHelper.createEl( 'input', 'control-input', controlEl );
				inputEl.setAttribute( 'data-key', key );
				inputEl.setAttribute( 'id', 'input-' + key );
				inputEl.type = 'range';
				inputEl.value = params.value || 0;
				inputEl.min = params.min || 0;
				inputEl.max = params.max || 100;
				inputEl.addEventListener( 'input', inputUpdated );
				inputEl.addEventListener( 'change', inputUpdated );
				
				inputEls[key] = inputEl;

				var valueEl = elHelper.createEl( 'input', 'control-value', controlEl );
				valueEl.setAttribute( 'data-key', key );
				valueEl.type = 'number';
				valueEl.value = params.value || 0;
				valueEl.min = params.min || 0;
				valueEl.max = params.max || 100;
				valueEl.addEventListener( 'input', inputUpdated );
				valueEl.addEventListener( 'change', inputUpdated );

				valueEls[key] = valueEl;

				inputUpdated( { target: inputEl } );
			}
	
			function inputUpdated ( event ) {
				if ( isActive && ! isIgnoringInput ) {
					var key = event.target.getAttribute( 'data-key' );
					var controlValues = getInputValues();

					if ( controlValues[key] !== event.target.value ) {
						controlValues[key] = parseInt( event.target.value, 10 );
						
						publishers.update.dispatch( key, controlValues[key] );
						setValue(key, controlValues[key] );
					}
				}
			}

			function reset(){

				setValue('contrast', 50);
				setValue('brightness',50);
				setValue('exposure',50);
				setValue('warmth',50);
				setValue('saturation',50);
			}

			function toggleControls () {
				if ( isActive ) {
					hide();
				} else {
					show();
				}
			}

			function hide () {
				controlsEl.classList.remove( 'is-active' );
				buttonEl.classList.remove( 'is-active' );
				buttonParentEl.classList.remove( 'controls-enabled' );
				isActive = false;

				clearTimeout( activeTimeoutId );

				activeTimeoutId = setTimeout( function () {
					controlsEl.classList.remove( 'is-visible' );
				}, 500 );
			}

			function show () {
				controlsEl.classList.add( 'is-visible' );
				isActive = true;
				
				clearTimeout( activeTimeoutId );

				activeTimeoutId = setTimeout( function () {
					controlsEl.classList.add( 'is-active' );
					buttonEl.classList.add( 'is-active' );
					buttonParentEl.classList.add( 'controls-enabled' );
				}, 10 );
			}

			function getInputValues () {
				var result = { };

				for ( var key in inputEls ) {
					result[key] = parseInt( inputEls[key].value, 10 );
				}

				return result;
			}

			// when setting a value, prevent dispatching
			// of elements to avoid an infinite loop of
			// input events
			function setValue ( key, newValue ) {
				isIgnoringInput = true;

				inputEls[key].value = newValue;
				valueEls[key].value = newValue;

				isIgnoringInput = false;
			}


			function updateAdjustMenu() {
				FiltermenuEl.style.display ="none";
				FramemenuEl.style.display = "none";
				AdjustmenuEl.style.display = "flex";	

			}

			function updateFilterMenu(){
				FramemenuEl.style.display = "none";
				AdjustmenuEl.style.display = "none";
				FiltermenuEl.style.display = "flex";
				setSelect(null);
			}

			function updateFrameMenu(){
				FiltermenuEl.style.display ="none";
				AdjustmenuEl.style.display = "none";
				FramemenuEl.style.display = "flex";
			}
			
			self.setValue = setValue;
			self.updateAdjustMenu = updateAdjustMenu;
			self.updateFilterMenu = updateFilterMenu;
			self.updateFrameMenu = updateFrameMenu;
			self.resetAll = resetAll;
		}

		return ControlsView;
	}
);