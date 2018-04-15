var $ = require('jquery');
var View = require('jquery-simple-view');
var MainNav = require('js/components/mainNav');

module.exports = View.extend({

    delegatedEvents: false,

    initialize: function() {

        this.setupBaseComponents();

    },

    events: {
        'click .mainHeader .signIn': function(e) {

            e.preventDefault();
            this.showLoginModal();

        },

        'input .mainSearch': function() {

            console.log('input');
            this.initMainSearch();

        },

        'click .galleryModule .js-open-modal': function(e) {
            e.preventDefault();
            this.showImageModal(e);

        }
    },

    setupBaseComponents: function() {

        this.mainNav = this.addView(new MainNav({$el: $('.mainNav')}));

        return this;

    },

    initMainSearch: function() {

        require.ensure([], function() {
            var MainSearch = require('js/components/mainSearch');
            this.mainSearch =  this.addView(new MainSearch({$el: $('.mainSearch')}));
        });

    },

    showLoginModal: function(e) {

        require.ensure([], function() {

            var LoginModal = require('js/components/loginModal');
            new LoginModal();

        });

    },

    showImageModal: function(e) {

        var $gallery = $('.galleryModule .js-open-modal');

        require.ensure([], function() {

            var ImageModal = require('js/components/imageModal');
            new ImageModal(e, $gallery);

        });

    }

});
