webpackJsonp([1],{

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(2);
	var View = __webpack_require__(3);

	__webpack_require__(9);

	module.exports = View.extend({

	    initialize: function(options) {
	        $.ajax({
	            url:'login-modal.html',
	            success: function(data) {
	                $.simpleLightbox.open({
	                    content: data,
	                    elementClass: 'slbContentEl'
	                });
	            }
	        });


	    }

	});


/***/ })

});