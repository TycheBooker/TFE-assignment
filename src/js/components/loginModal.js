var $ = require('jquery');
var View = require('jquery-simple-view');

require('simple-lightbox');

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
