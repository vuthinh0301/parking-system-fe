"use strict";

const KTLayoutContent = function() {
    // Private properties
    let _element;

	// Private functions
	const _getHeight = function() {
		let height;

		height = KTUtil.getViewPort().height;

        if (_element) {
            height = height - parseInt(KTUtil.css(_element, 'paddingTop')) - parseInt(KTUtil.css(_element, 'paddingBottom'));
        }

        height = height - KTLayoutHeader.getHeight();
        height = height - KTLayoutSubheader.getHeight();
        height = height - KTLayoutFooter.getHeight();

		return height;
	}

    // Public methods
	return {
		init(id) {
            _element = KTUtil.getById(id);
		},

		getHeight() {
			return _getHeight();
		},

        getElement() {
            return _element;
        }
	};
}();



export default KTLayoutContent;