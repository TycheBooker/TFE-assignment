var $ = require('jquery');
var View = require('jquery-simple-view');

require('simple-lightbox');

module.exports = View.extend({

    initialize: function(options) {

        this.loadCss('css/bundles/simpleLightbox.css', 'simpleLightbox');

        $.ajax({
            url:'login-modal.html',
            success: function(data) {
                $.simpleLightbox.open({
                    content: data,
                    elementClass: 'slbContentEl'
                });
            }
        });

    },

    loadCss: function(filename, id) {

        if ($('#' + id).length) {
            return;
        }

        $('<link/>', {
            rel: 'stylesheet',
            type: 'text/css',
            href: filename,
            id: id
        })
        .appendTo('head');

    }

});
