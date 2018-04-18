var $ = require('jquery');
var View = require('jquery-simple-view');

require('simple-lightbox');

module.exports = View.extend({

    initialize: function(e, $gallery) {

        this.loadCss('css/bundles/simpleLightbox.css', 'simpleLightbox');

        $.simpleLightbox.open({
            $items: $gallery,
            startAt: $gallery.index($(e.currentTarget)),
            bindToItems: false
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
