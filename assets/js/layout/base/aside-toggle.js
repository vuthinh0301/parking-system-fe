"use strict";
import KTUtil from "@/assets/js/components/util.js";
import KTToggle from "@/assets/js/components/toggle.js";
import KTCookie from "@/assets/js/components/cookie.js";

const KTLayoutAsideToggle = function() {
    // Private properties
    let _body;
    let _element;
    let _toggleObject;

	// Initialize
	const _init = function() {
		_toggleObject = new KTToggle(_element, _body, {
			targetState: 'aside-minimize',
			toggleState: 'active'
		});

		_toggleObject.on('toggle', function(toggle) {
            // Update sticky card
            if (typeof KTLayoutStickyCard !== 'undefined') {
                KTLayoutStickyCard.update();
            }

            // Pause header menu dropdowns
            if (typeof KTLayoutHeaderMenu !== 'undefined') {
                KTLayoutHeaderMenu.pauseDropdownHover(800);
            }

            // Pause aside menu dropdowns
            if (typeof KTLayoutAsideMenu !== 'undefined') {
                KTLayoutAsideMenu.pauseDropdownHover(800);
            }

            // Remember state in cookie
			KTCookie.setCookie('kt_aside_toggle_state', toggle.getState());
			// to set default minimized left aside use this cookie value in your
			// server side code and add "kt-primary--minimize aside-minimize" classes to
			// the body tag in order to initialize the minimized left aside mode during page loading.
		});

		_toggleObject.on('beforeToggle', function(toggle) {
			if (KTUtil.hasClass(_body, 'aside-minimize') === false && KTUtil.hasClass(_body, 'aside-minimize-hover')) {
				KTUtil.removeClass(_body, 'aside-minimize-hover');
			}
		});
	}

    // Public methods
	return {
		init(id) {
            _element = KTUtil.getById(id);
            _body = KTUtil.getBody();

            if (!_element) {
                return;
            }

            // Initialize
            _init();
		},

        getElement() {
            return _element;
        },

        getToggle() {
			return _toggleObject;
		},

		onToggle(handler) {
			if (typeof _toggleObject.element !== 'undefined') {
				_toggleObject.on('toggle', handler);
			}
		}
	};
}();



export default KTLayoutAsideToggle;
