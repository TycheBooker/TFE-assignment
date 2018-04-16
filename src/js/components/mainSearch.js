var $ = require('jquery');
var View = require('jquery-simple-view');

require('fastsearch');

module.exports = View.extend({

    initialize: function() {

        this.loadCss('css/bundles/fastSearch.css', 'fastSearch');

        this.$('.query').fastsearch({
            onItemSelect: 'fillInput'
        });

    },

    loadCss: function(filename, id) {

        if ($('#' + id).length) {return;}

        $( '<link/>', {
            'rel': 'stylesheet',
            'type': 'text/css',
            'href': filename,
            'id': id
          })
            .appendTo('head');

    }

});
