"use strict";

import KTUtil from "./util";

// Component Definition
const KTCard = function(elementId, options) {
    // Main object
    let the = this;
    const init = false;

    // Get element object
    const element = KTUtil.getById(elementId);
    const body = KTUtil.getBody();

    if (!element) {
        return;
    }

    // Default options
    let defaultOptions = {
        toggleSpeed: 400,
        sticky: {
            releseOnReverse: false,
            offset: 300,
            zIndex: 101
        }
    };

    /// /////////////////////////
    // ** Private Methods  ** //
    /// /////////////////////////

    var Plugin = {
        /**
         * Construct
         */

        construct(options) {
            if (KTUtil.data(element).has('card')) {
                the = KTUtil.data(element).get('card');
            } else {
                // reset menu
                Plugin.init(options);

                // build menu
                Plugin.build();

                KTUtil.data(element).set('card', the);
            }

            return the;
        },

        /**
         * Init card
         */
        init(options) {
            the.element = element;
            the.events = [];

            // merge default and user defined options
            the.options = KTUtil.deepExtend({}, defaultOptions, options);
            the.header = KTUtil.child(element, '.card-header');
            the.footer = KTUtil.child(element, '.card-footer');

            if (KTUtil.child(element, '.card-body')) {
                the.body = KTUtil.child(element, '.card-body');
            } else if (KTUtil.child(element, '.form')) {
                the.body = KTUtil.child(element, '.form');
            }
        },

        /**
         * Build Form Wizard
         */
        build() {
            // Remove
            const remove = KTUtil.find(the.header, '[data-card-tool=remove]');
            if (remove) {
                KTUtil.addEvent(remove, 'click', function(e) {
                    e.preventDefault();
                    Plugin.remove();
                });
            }

            // Reload
            const reload = KTUtil.find(the.header, '[data-card-tool=reload]');
            if (reload) {
                KTUtil.addEvent(reload, 'click', function(e) {
                    e.preventDefault();
                    Plugin.reload();
                });
            }

            // Toggle
            const toggle = KTUtil.find(the.header, '[data-card-tool=toggle]');
            if (toggle) {
                KTUtil.addEvent(toggle, 'click', function(e) {
                    e.preventDefault();
                    Plugin.toggle();
                });
            }
        },

        /**
         * Enable stickt mode
         */
        initSticky() {
            const lastScrollTop = 0;
            const offset = the.options.sticky.offset;

            if (!the.header) {
                return;
            }

	        window.addEventListener('scroll', Plugin.onScrollSticky);
        },

	    /**
	     * Window scroll handle event for sticky card
	     */
	    onScrollSticky(e) {
		    const offset = the.options.sticky.offset;

		    if(isNaN(offset)) return;

		    const st = KTUtil.getScrollTop();

		    if (st >= offset && KTUtil.hasClass(body, 'card-sticky-on') === false) {
			    Plugin.eventTrigger('stickyOn');

			    KTUtil.addClass(body, 'card-sticky-on');

			    Plugin.updateSticky();

		    } else if ((st*1.5) <= offset && KTUtil.hasClass(body, 'card-sticky-on')) {
			    // Back scroll mode
			    Plugin.eventTrigger('stickyOff');

			    KTUtil.removeClass(body, 'card-sticky-on');

			    Plugin.resetSticky();
		    }
	    },

        updateSticky() {
            if (!the.header) {
                return;
            }

            let top;

            if (KTUtil.hasClass(body, 'card-sticky-on')) {
                if (the.options.sticky.position.top instanceof Function) {
                    top = parseInt(the.options.sticky.position.top.call(this, the));
                } else {
                    top = parseInt(the.options.sticky.position.top);
                }

                let left;
                if (the.options.sticky.position.left instanceof Function) {
                    left = parseInt(the.options.sticky.position.left.call(this, the));
                } else {
                    left = parseInt(the.options.sticky.position.left);
                }

                let right;
                if (the.options.sticky.position.right instanceof Function) {
                    right = parseInt(the.options.sticky.position.right.call(this, the));
                } else {
                    right = parseInt(the.options.sticky.position.right);
                }

                KTUtil.css(the.header, 'z-index', the.options.sticky.zIndex);
                KTUtil.css(the.header, 'top', top + 'px');
                KTUtil.css(the.header, 'left', left + 'px');
                KTUtil.css(the.header, 'right', right + 'px');
            }
        },

        resetSticky() {
            if (!the.header) {
                return;
            }

            if (KTUtil.hasClass(body, 'card-sticky-on') === false) {
                KTUtil.css(the.header, 'z-index', '');
                KTUtil.css(the.header, 'top', '');
                KTUtil.css(the.header, 'left', '');
                KTUtil.css(the.header, 'right', '');
            }
        },

        /**
         * Remove card
         */
        remove() {
            if (Plugin.eventTrigger('beforeRemove') === false) {
                return;
            }

            // Remove tooltips
            let tooltips;
            if ( tooltips = document.querySelectorAll('.tooltip.show') ) {
                $(tooltips).tooltip('dispose');
            }

            KTUtil.remove(element);

            Plugin.eventTrigger('afterRemove');
        },

        /**
         * Set content
         */
        setContent(html) {
            if (html) {
                the.body.innerHTML = html;
            }
        },

        /**
         * Get body
         */
        getBody() {
            return the.body;
        },

        /**
         * Get self
         */
        getSelf() {
            return element;
        },

        /**
         * Reload
         */
        reload() {
            Plugin.eventTrigger('reload');
        },

        /**
         * Toggle
         */
        toggle() {
            if (KTUtil.hasClass(element, 'card-collapse') || KTUtil.hasClass(element, 'card-collapsed')) {
                Plugin.expand();
            } else {
                Plugin.collapse();
            }
        },

        /**
         * Collapse
         */
        collapse() {
            if (Plugin.eventTrigger('beforeCollapse') === false) {
                return;
            }

            KTUtil.slideUp(the.body, the.options.toggleSpeed, function() {
                Plugin.eventTrigger('afterCollapse');
            });

            KTUtil.addClass(element, 'card-collapse');
        },

        /**
         * Expand
         */
        expand() {
            if (Plugin.eventTrigger('beforeExpand') === false) {
                return;
            }

            KTUtil.slideDown(the.body, the.options.toggleSpeed, function() {
                Plugin.eventTrigger('afterExpand');
            });

            KTUtil.removeClass(element, 'card-collapse');
            KTUtil.removeClass(element, 'card-collapsed');
        },

        /**
         * Trigger events
         */
        eventTrigger(name) {
            // KTUtil.triggerCustomEvent(name);
            for (let i = 0; i < the.events.length; i++) {
                const event = the.events[i];
                if (event.name == name) {
                    if (event.one == true) {
                        if (event.fired == false) {
                            the.events[i].fired = true;
                            return event.handler.call(this, the);
                        }
                    } else {
                        return event.handler.call(this, the);
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

            return the;
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
     * Remove card
     */
    the.remove = function() {
        return Plugin.remove(html);
    };

    /**
     * Init sticky card
     */
    the.initSticky = function() {
        return Plugin.initSticky();
    };

    /**
     * Rerender sticky layout
     */
    the.updateSticky = function() {
        return Plugin.updateSticky();
    };

    /**
     * Reset the sticky
     */
    the.resetSticky = function() {
        return Plugin.resetSticky();
    };

	/**
	 * Destroy sticky card
	 */
	the.destroySticky = function() {
		Plugin.resetSticky();
		window.removeEventListener('scroll', Plugin.onScrollSticky);
	};

    /**
     * Reload card
     */
    the.reload = function() {
        return Plugin.reload();
    };

    /**
     * Set card content
     */
    the.setContent = function(html) {
        return Plugin.setContent(html);
    };

    /**
     * Toggle card
     */
    the.toggle = function() {
        return Plugin.toggle();
    };

    /**
     * Collapse card
     */
    the.collapse = function() {
        return Plugin.collapse();
    };

    /**
     * Expand card
     */
    the.expand = function() {
        return Plugin.expand();
    };

    /**
     * Get cardbody
     * @returns {jQuery}
     */
    the.getBody = function() {
        return Plugin.getBody();
    };

    /**
     * Get cardbody
     * @returns {jQuery}
     */
    the.getSelf = function() {
        return Plugin.getSelf();
    };

    /**
     * Attach event
     */
    the.on = function(name, handler) {
        return Plugin.addEvent(name, handler);
    };

    /**
     * Attach event that will be fired once
     */
    the.one = function(name, handler) {
        return Plugin.addEvent(name, handler, true);
    };

    // Construct plugin
    Plugin.construct.apply(the, [options]);

    return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTCard;
}

export default KTCard;