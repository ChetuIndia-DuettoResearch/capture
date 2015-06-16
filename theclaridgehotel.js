var duetto = {
    appId: "ca303",
    tld: "microsdc.us",
    properties: [['h', '%HotelCode%']],

    search: {
        sel: function () {
            return location.pathname.indexOf('search_rooms') > -1 && jQuery('#no-results-msg').length < 1 && (('%ArrivalYear%'.length > 0) && ('%DepartureYear%'.length > 0)) ;
        },
        fn: function () {
            var msg = {};
            msg["cc"] = jQuery('.converted_currency_code:first').text().trim();
            return msg;
        }
    },

    noneAvailable: {
        sel: function () {
            return jQuery('#no-results-msg').length > 0;
        }
    },


    multiQuote: {
        sel: function () {
            return window.location.pathname.indexOf("search_rooms.cmd") > -1 && jQuery('.rates-packages li').length > 0;
        },
        quotesSel: '.rates-packages > li:visible',
        scrapeRoomFn: function (n, e) {
            var $n = jQuery(n);
            var r = Number($n.find('.converted_currency_amount:first').text().trim());
            var rc = $n.find('.room-descr').attr('id').split('_')[0];
            var rt = $n.find('.room-descr').attr('id').split('_')[1];
            var cc = $('.converted_currency_code:first').text().trim();
            if (!rc || !rt || !r) {
                return null;
            }
            return {
                'cc': cc,
                'rt': rt,
                'rc': rc,
                'r': r
            };

        },
    },

    booking: {
        sel: function () {
            return window.location.pathname.indexOf('confirmation') > -1;
        },
        scrapeBookFn: function () {
	   
             var totalcost = Number(jQuery(jQuery('.ui-rate-summary-amount')[2]).text().trim().replace(/[^\d.]/g, ''));
             var tax = Number(jQuery(jQuery('.ui-rate-summary-amount')[1]).text().trim().replace(/[^\d.]/g, ''));
             var numberofNights = jQuery('#reservation-summary li').first().text().replace(/[^\d.]/g, '');
             var msg = {
                'b': jQuery('#conf-no').text().replace(/[^0-9]/g, ''),
                'r': (totalcost - tax) / numberofNights,
                'rt': '%RoomCode%',
                'rc': '%RateCode%',
                'na': jQuery('#reservation-summary ul li:nth-child(3)').text().trim().replace(/[^\d.]/g, '')
            };

            return msg;
        }
    },

    dateScrapeFn: function (pageType) {
       return {
            'sd': '%ArrivalYear%' + '-' + '%ArrivalMonth%' + '-' + '%ArrivalDay%',
            'ed': '%DepartureYear%' + '-' + '%DepartureMonth%' + '-' + '%DepartureDay%'
        };
    }
};

(function () { var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'capture.duettoresearch.com/assets/js/duetto/duetto.js'; var n = document.getElementsByTagName('script')[0]; n.parentNode.insertBefore(s, n); })();


