"use strict";

const KTLayoutDemoPanel = function() {
    // Private properties
    let _element;
    let _offcanvasObject;

    // Private functions
    const _init = function() {
        _offcanvasObject = new KTOffcanvas(_element, {
            overlay: true,
            baseClass: 'offcanvas',
            placement: 'right',
            closeBy: 'kt_demo_panel_close',
            toggleBy: 'kt_demo_panel_toggle'
        });

        const header = KTUtil.find(_element, '.offcanvas-header');
        const content = KTUtil.find(_element, '.offcanvas-content');
        const wrapper = KTUtil.find(_element, '.offcanvas-wrapper');
        const footer = KTUtil.find(_element, '.offcanvas-footer');

        KTUtil.scrollInit(wrapper, {
            disableForMobile: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height() {
                let height = parseInt(KTUtil.getViewPort().height);

                if (header) {
                    height = height - parseInt(KTUtil.actualHeight(header));
                    height = height - parseInt(KTUtil.css(header, 'marginTop'));
                    height = height - parseInt(KTUtil.css(header, 'marginBottom'));
                }

                if (content) {
                    height = height - parseInt(KTUtil.css(content, 'marginTop'));
                    height = height - parseInt(KTUtil.css(content, 'marginBottom'));
                }

                if (wrapper) {
                    height = height - parseInt(KTUtil.css(wrapper, 'marginTop'));
                    height = height - parseInt(KTUtil.css(wrapper, 'marginBottom'));
                }

                if (footer) {
                    height = height - parseInt(KTUtil.actualHeight(footer));
                    height = height - parseInt(KTUtil.css(footer, 'marginTop'));
                    height = height - parseInt(KTUtil.css(footer, 'marginBottom'));
                }

                height = height - parseInt(KTUtil.css(_element, 'paddingTop'));
                height = height - parseInt(KTUtil.css(_element, 'paddingBottom'));

                height = height - 2;

                return height;
            }
        });

        if (typeof offcanvas !== 'undefined' && offcanvas.length === 0) {
            offcanvas.on('hide', function() {
                const expires = new Date(new Date().getTime() + 60 * 60 * 1000); // expire in 60 minutes from now
                KTCookie.setCookie('kt_demo_panel_shown', 1, {expires});
            });
        }
    }

    const _remind = function() {
        if (!(encodeURI(window.location.hostname) == 'keenthemes.com' || encodeURI(window.location.hostname) == 'www.keenthemes.com')) {
            return;
        }

        setTimeout(function() {
            if (!KTCookie.getCookie('kt_demo_panel_shown')) {
                const expires = new Date(new Date().getTime() + 15 * 60 * 1000); // expire in 15 minutes from now
                KTCookie.setCookie('kt_demo_panel_shown', 1, { expires });
                if (typeof _offcanvasObject !== 'undefined') {
                    _offcanvasObject.show();
                }
            }
        }, 4000);
    }

    // Public methods
    return {
        init(id) {
            _element = KTUtil.getById(id);

            if (!_element) {
                return;
            }

            // Initialize
            _init();

            // Remind
            _remind();
        }
    };
}();



export default KTLayoutDemoPanel;