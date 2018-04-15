var $ = require('jquery');
var View = require('jquery-simple-view');

require('simple-lightbox');

module.exports = View.extend({

    initialize: function(e, $gallery) {

        $.simpleLightbox.open({
            $items: $gallery,
            startAt: $gallery.index($(e.currentTarget)),
            bindToItems: false
        });

    }

});
