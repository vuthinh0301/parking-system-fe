"use strict";

import KTUtil from "./util";

// Component Definition
const KTHeader = function(elementId, options) {
    // Main object
    let the = this;
    let init = false;

    // Get element object
    const element = KTUtil.getById(elementId);
    const body = KTUtil.getBody();

    if (element === undefined) {
        return;
    }

    // Default options
    let defaultOptions = {
        offset: {
            desktop: true,
            tabletAndMobile: true
        },
        releseOnReverse: {
            desktop: false,
            tabletAndMobile: false
        }
    };

    /// /////////////////////////
    // ** Private Methods  ** //
    /// /////////////////////////

    var Plugin = {
        /**
         * Run plugin
         * @returns {KTHeader}
         */
        construct(options) {
            if (KTUtil.data(element).has('header')) {
                the = KTUtil.data(element).get('header');
            } else {
                // reset header
                Plugin.init(options);

                // build header
                Plugin.build();

                KTUtil.data(element).set('header', the);
            }

            return the;
        },

        /**
         * Handles subheader click toggle
         * @returns {KTHeader}
         */
        init(options) {
            the.events = [];

            // merge default and user defined options
            the.options = KTUtil.deepExtend({}, defaultOptions, options);
        },

        /**
         * Reset header
         * @returns {KTHeader}
         */
        build() {
            let eventTriggerState = true;
            let lastScrollTop = 0;

            window.addEventListener('scroll', function() {
                let offset = 0; let st; let attrName;

                if (KTUtil.isBreakpointDown('lg') && the.options.offset.tabletAndMobile === false) {
                    return;
                }

                if (KTUtil.isBreakpointUp('lg') && the.options.offset.desktop === false) {
                    return;
                }

                if (KTUtil.isBreakpointUp('lg')) {
                    offset = the.options.offset.desktop;
                } else if (KTUtil.isBreakpointDown('lg')) {
                    offset = the.options.offset.tabletAndMobile;
                }

                st = KTUtil.getScrollTop();

                if (
                    (KTUtil.isBreakpointDown('lg') && the.options.releseOnReverse.tabletAndMobile) ||
                    (KTUtil.isBreakpointUp('lg') && the.options.releseOnReverse.desktop)
                ) {
                    if (st > offset && lastScrollTop < st) { // down scroll mode
                        if (body.hasAttribute('data-header-scroll') === false) {
                            body.setAttribute('data-header-scroll', 'on');
                        }

                        if (eventTriggerState) {
                            Plugin.eventTrigger('scrollOn', the);
                            eventTriggerState = false;
                        }
                    } else { // back scroll mode
                        if (body.hasAttribute('data-header-scroll') === true) {
                            body.removeAttribute('data-header-scroll');
                        }

                        if (eventTriggerState == false) {
                            Plugin.eventTrigger('scrollOff', the);
                            eventTriggerState = true;
                        }
                    }

                    lastScrollTop = st;
                } else if (st > offset) { // down scroll mode
                        if (body.hasAttribute('data-header-scroll') === false) {
                            body.setAttribute('data-header-scroll', 'on');
                        }

                        if (eventTriggerState) {
                            Plugin.eventTrigger('scrollOn', the);
                            eventTriggerState = false;
                        }
                    } else { // back scroll mode
                        if (body.hasAttribute('data-header-scroll') === true) {
                            body.removeAttribute('data-header-scroll');
                        }

                        if (eventTriggerState == false) {
                            Plugin.eventTrigger('scrollOff', the);
                            eventTriggerState = true;
                        }
                    }
            });
        },

        /**
         * Trigger events
         */
        eventTrigger(name, args) {
            for (let i = 0; i < the.events.length; i++) {
                const event = the.events[i];
                if (event.name == name) {
                    if (event.one == true) {
                        if (event.fired == false) {
                            the.events[i].fired = true;
                            return event.handler.call(this, the, args);
                        }
                    } else {
                        return event.handler.call(this, the, args);
                    }
                }
            }
        },

        addEvent(name, handler, one) {
            the.events.push({
                name,
                handler,
                one,
                fired: false
            });
        }
    };

    /// ///////////////////////
    // ** Public Methods ** //
    /// ///////////////////////

    /**
     * Set default options
     */

    the.setDefaults = function(options) {
        defaultOptions = options;
    };

    /**
     * Register event
     */
    the.on = function(name, handler) {
        return Plugin.addEvent(name, handler);
    };

    /// ////////////////////////////
    // ** Plugin Construction ** //
    /// ////////////////////////////

    // Run plugin
    Plugin.construct.apply(the, [options]);

    // Init done
    init = true;

    // Return plugin instance
    return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTHeader;
}

export default KTHeader;