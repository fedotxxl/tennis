(function() {
    ymaps.ready(function() {
        var map = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 15
        });

        map.controls
            .remove('zoomControl')
            .remove('searchControl')
            .remove('typeSelector')
            .remove('trafficControl');
    });


    var $map = $('#map');
}());