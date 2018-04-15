var $ = require('jquery');
var View = require('jquery-simple-view');
var MainNav = require('js/components/mainNav');
var MainSearch = require('js/components/mainSearch');

module.exports = View.extend({

    delegatedEvents: false,

    initialize: function() {

        this.setupBaseComponents();
        this.initGallery();

    },

    events: {
        'click .mainHeader .signIn': function(e) {

            e.preventDefault();
            this.showLoginModal();

        }
    },

    setupBaseComponents: function() {

        this.mainNav = this.addView(new MainNav({$el: $('.mainNav')}));
        this.mainSearch =  this.addView(new MainSearch({$el: $('.mainSearch')}));

        return this;

    },

    showLoginModal: function(e) {

        require.ensure([], function() {

            var LoginModal = require('js/components/loginModal');
            new LoginModal();

        });

    },

    initGallery: function() {

        require('simple-lightbox');

        var gallery = $('.galleryModule .js-open-modal');
        gallery.simpleLightbox();

    }

});
