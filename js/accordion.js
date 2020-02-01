( function ($) {

    /**
     * Accordion && Collapsible (2 in 1)
     * @param options
     * @returns {Array|Object|string|*|jQuery}
     * @constructor
     */
    $.fn.Accordion = function (options) {

        // Default settings
        var settings = $.extend( {
            activeClassName: "active",
            collapsible: false,
        }, options );

        var __deactivateAll = function ($panels) {
            $panels.removeClass( settings.activeClassName );
            $panels.find( '.accordion-body' ).slideUp();
        };

        var __activatePanel = function (panel) {
            panel.addClass( settings.activeClassName );
            $( '.accordion-body', panel ).slideDown(function(){
                panel.removeAttr('data-animating');
            });
        };
        var __deactivatePanel = function (panel) {
            panel.removeClass( settings.activeClassName );
            $( '.accordion-body', panel ).slideUp(function(){
                panel.removeAttr('data-animating');
            });
        };

        return this.each( function () {
            var element = $( this ),
                panels = $( '.accordion-item', element );

            var attr = ( typeof ( element.attr( 'data-collapse' ) ) !== 'undefined' ? element.attr( 'data-collapse' ) : null );
            var collapsible = settings.collapsible;

            if ( attr !== null ) {
                collapsible = ( attr === 'true' || attr === '1' );
            }

            //#! Collapsible
            if ( collapsible ) {
                panels.each( function (i, el) {
                    var panel = $( el );

                    panel.on( 'click', function (e) {
                        if ( panel.attr('data-animating') ) {
                            return false;
                        }
                        panel.attr('data-animating', true);
                        if ( panel.hasClass( settings.activeClassName ) ) {
                            __deactivatePanel( panel );
                        }
                        else {
                            __activatePanel( panel );
                        }
                    } );
                } );
            }
            //#! Accordion
            else {
                panels.each( function (i, el) {
                    var panel = $( el );
                    panel.on( 'click', function (e) {
                        if ( panel.attr('data-animating') ) {
                            return false;
                        }
                        panel.attr('data-animating');
                        __deactivateAll( panels );
                        __activatePanel( panel );
                    } );
                } );
            }
        } );
    };
}( jQuery ) );
