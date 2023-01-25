"use strict";
import KTUtil from "@/assets/js/components/util.js";
import KTMenu from "@/assets/js/components/menu.js";

var KTLayoutAsideMenu = function() {
    // Private properties
    let _body;
    let _element;
    let _menuObject;

	// Initialize
	const _init = function() {
		const menuDesktopMode = (KTUtil.attr(_element, 'data-menu-dropdown') === '1' ? 'dropdown' : 'accordion');
        let scroll;

		if (KTUtil.attr(_element, 'data-menu-scroll') === '1') {
			scroll = {
				rememberPosition: true, // remember position on page reload
				height() { // calculate available scrollable area height
					let height = parseInt(KTUtil.getViewPort().height);

					if (KTUtil.isBreakpointUp('lg')) {
						height = height - KTLayoutBrand.getHeight();
					}

					height = height - (parseInt(KTUtil.css(_element, 'marginBottom')) + parseInt(KTUtil.css(_element, 'marginTop')));

					return height;
				}
			};
		}

		_menuObject = new KTMenu(_element, {
			// Vertical scroll
			scroll,

			// Submenu setup
			submenu: {
				desktop: menuDesktopMode,
				tablet: 'accordion', // menu set to accordion in tablet mode
				mobile: 'accordion' // menu set to accordion in mobile mode
			},

			// Accordion setup
			accordion: {
				expandAll: false // allow having multiple expanded accordions in the menu
			}
		});
	}

    const _initHover = function() {
        // Handle Minimized Aside Hover
		if (KTUtil.hasClass(_body, 'aside-fixed') && KTUtil.hasClass(_body, 'aside-minimize-hoverable')) {
			let insideTm;
			let outsideTm;

            // Handle Aside Hover Mode
			KTUtil.addEvent(_element, 'mouseenter', function(e) {
				e.preventDefault();

				if (KTUtil.isBreakpointUp('lg') === false) {
					return;
				}

				if (outsideTm) {
					clearTimeout(outsideTm);
					outsideTm = null;
				}

                if (insideTm) {
					clearTimeout(insideTm);
					insideTm = null;
				}

				insideTm = setTimeout(function() {
					if (KTUtil.hasClass(_body, 'aside-minimize') && KTUtil.isBreakpointUp('lg')) {
						// Hover class
						KTUtil.addClass(_body, 'aside-minimize-hover');

						KTLayoutAsideMenu.getMenu().scrollUpdate();
						KTLayoutAsideMenu.getMenu().scrollTop();
					}
				}, 50);
			});

			KTUtil.addEvent(KTLayoutAside.getElement(), 'mouseleave', function(e) {
				e.preventDefault();

				if (KTUtil.isBreakpointUp('lg') === false) {
					return;
				}

				if (insideTm) {
					clearTimeout(insideTm);
					insideTm = null;
				}

                if (outsideTm) {
					clearTimeout(outsideTm);
					outsideTm = null;
				}

				outsideTm = setTimeout(function() {
				    if (KTUtil.hasClass(_body, 'aside-minimize-hover') && KTUtil.isBreakpointUp('lg')) {
					    KTUtil.removeClass(_body, 'aside-minimize-hover');

						// Hover class
                        KTLayoutAsideMenu.getMenu().scrollUpdate();
						KTLayoutAsideMenu.getMenu().scrollTop();
					}
				}, 100);
			});
		}
	}

    // Public methods
	return {
		init(id) {
            _body = KTUtil.getBody();
            _element = KTUtil.getById(id);

            if (!_element) {
                return;
            }

            // Initialize menu
            _init();
            _initHover();
		},

		getElement() {
			return _element;
		},

        getMenu() {
			return _menuObject;
		},

        pauseDropdownHover(time) {
			if (_menuObject) {
				_menuObject.pauseDropdownHover(time);
			}
		},

		closeMobileOffcanvas() {
			if (_menuObject && KTUtil.isMobileDevice()) {
				_menuObject.hide();
			}
		}
	};
}();



export default KTLayoutAsideMenu;
