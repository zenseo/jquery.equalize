/*!
 * jQuery Equalize
 * 
 * An easy way to achieve equally high sets of content boxes regardless the length of their content.
 * This plugins supports responsive layouts and breakpoints.
 * 
 * @author		B2 Communcations GmbH
 * @url        https://github.com/B2communications/jquery.equalizer
 * @version    1.0
 * @license    Licensed under MIT, see license.txt
 */

(function ($) {
	/*
	 * Methods are @public
	 */
	var methods = {
		// default settings
		defaults: {
			'$window': $(window), // the parent resizing element, in most cases the window
			'responsive': true, // recalculate on resize
			'attribute': 'height', // in rare cases 'min-height' is the better option
			'breakpoints': {
				'md': 1200,
				'sm': 992,
				'xs': 768
			}
		},
		// initialize
		init: function (options) {
			return this.each(function () {
				var _this = this;
				var $this = $(this);

				data = $this.data('equalize');

				// the plugin hasn't been initialized yet
				if (!data) {
					// apply data
					$this.data('equalize', {
						settings: {},
						children: [],
						breakpoint: false
					});

					// set up data
					methods.applySettings.apply(this, [options]);

					// set breakpoint
					$this.data('equalize').breakpoint = $this.data('equalize-breakpoint');

					// set linked elements
					$this.children().each(function () {
						var $child = $(this);

						// check if element is ignored
						if ($child.data('equalize-ignore') === undefined) {
							links = false;

							// get linked sub-elements
							var link_selector = $child.data('equalize-link');
							if (link_selector !== undefined) {
								links = $child.find(link_selector);
							}

							$this.data('equalize').children.push({
								'$el': $child,
								'$links': links
							});
						}
					});

					functions.doResize.apply(this); // initial
				}
			});
		},
		// apply settings
		applySettings: function (options) {
			var _this = this;

			// merge options with defaults
			var settings = $(this).data('equalize').settings = $.extend({}, methods.defaults, options);

			// set responsive resizing
			settings.$window.off('resize.equalize', functions.lazyResize.call); // unbind resize (reset)
			if (settings.responsive) {
				// bind resize
				settings.$window.on('resize.equalize', function () {
					functions.lazyResize.call(_this);
				});
			}
		},
		// unbind plugin functions
		off: function () {
			var $this = $(this);
			$this.off('equalize');
			$this.data('equalize').settings.$window.off('equalize');
			methods.stop.apply(this);
			$.removeData(this, 'equalize');
		}
	};


	/**
	 * Functions are @private
	 */
	var functions = {
		// bind resizing
		doResize: function (event) {
			var _this = this;
			var $this = $(this);
			var data = $this.data('equalize');
			var max_height = 0;

			// get max height & reset
			$.each(data.children, function (key, child) {
				// reset height
				if (child.$links !== false) {
					child.$links.css(data.settings.attribute, ''); // add difference
				} else {
					child.$el.css(data.settings.attribute, '');
				}

				// set
				var child_height = child.$el.height();
				if (child_height > max_height) {
					max_height = child_height;
				}
			});

			// check breakpoint
			var win_width = data.settings.$window.width();
			
			if (data.breakpoint && data.settings.breakpoints[data.breakpoint] !== undefined && data.settings.breakpoints[data.breakpoint] > win_width) {
				return false; // breakpoint reached, abort resizing
			}

			// set height
			$.each(data.children, function (key, child) {
				var child_height = child.$el.height();

				if (child_height < max_height) {
					if (child.$links !== false) {
						// sub-elements are linked
						child.$links.each(function () {
							var $link = $(this);
							var link_height = $link.height();
							$link.css(data.settings.attribute, link_height + (max_height - child_height)); // add difference
						});
					} else {
						// default resizing
						child.$el.css(data.settings.attribute, max_height);
					}
				}
			});
		},
		// resizing proxy
		lazyResize: function () {
			var _this = this;

			// check for lodash (_) and the debounce function
			if (window._ !== undefined && window._.debounce !== undefined) {
				// use lodash debounce to improve performance
				_.debounce(functions.doResize.call(_this), 250);
			} else {
				// call resize function
				functions.doResize.call(_this);
			}
		}
	};

	$.fn.equalize = function (method) {
		// method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.equalize'); // unknown method
		}
	};
})(jQuery);