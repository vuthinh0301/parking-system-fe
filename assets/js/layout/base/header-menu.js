"use strict";

import KTUtil from "~/assets/js/components/util";
import KTOffcanvas from "~/assets/js/components/offcanvas";
import KTMenu from "~/assets/js/components/menu";

const KTLayoutHeaderMenu = function() {
    // Private properties
	let _menuElement;
    let _menuObject;
    let _offcanvasElement;
    let _offcanvasObject;

    // Private functions
	const _init = function() {
		_offcanvasObject = new KTOffcanvas(_offcanvasElement, {
			overlay: true,
			baseClass: 'header-menu-wrapper',
			closeBy: 'kt_header_menu_mobile_close_btn',
			toggleBy: {
				target: 'kt_header_mobile_toggle',
				state: 'mobile-toggle-active'
			}
		});

		_menuObject = new KTMenu(_menuElement, {
			submenu: {
				desktop: 'dropdown',
				tablet: 'accordion',
				mobile: 'accordion'
			},
			accordion: {
				slideSpeed: 200, // accordion toggle slide speed in milliseconds
				expandAll: false // allow having multiple expanded accordions in the menu
			}
		});

		// Close aside offcanvas panel before page reload On tablet and mobile
        _menuObject.on('linkClick', function(menu) {
            if (KTUtil.isBreakpointDown('lg')) { // Tablet and mobile mode
                _offcanvasObject.hide(); // Hide offcanvas after general link click
            }
        });
	}

    // Public methods
	return {
        init(menuId, offcanvasId) {
            _menuElement = KTUtil.getById(menuId);
            _offcanvasElement = KTUtil.getById(offcanvasId);

            if (!_menuElement) {
                return;
            }

            // Initialize menu
            _init();
		},

		getMenuElement() {
			return _menuElement;
		},

        getOffcanvasElement() {
			return _offcanvasElement;
		},

        getMenu() {
			return _menuObject;
		},

		pauseDropdownHover(time) {
			if (_menuObject) {
				_menuObject.pauseDropdownHover(time);
			}
		},

        getOffcanvas() {
			return _offcanvasObject;
		},

		closeMobileOffcanvas() {
			if (_menuObject && KTUtil.isMobileDevice()) {
				_offcanvasObject.hide();
			}
		}
	};
}();



export default KTLayoutHeaderMenu;
