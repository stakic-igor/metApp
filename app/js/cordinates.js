var cordinates = function() {
    "use strict";
    this.constructor = function(fields) {
        this.fields = fields;
        this.cordinateStorage = {};
        this.counter = 0;
        this.init();
        var self = this;

    };
    this.init = function() {
        this.addFormListeners();
    };
    this.addFormListeners = function() {
        var form = document.querySelector(this.form);

    };
    this.validateFields = function() {

        for (var field in this.fields) {
            var element = document.querySelector(this.fields[field]);
            if (element.value === '') {
                return false;

            }
            if (isNaN(element.value)) {

                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    'address': element.value
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        this.cordinateStorage[this.counter] = {
                            lat: results[0].geometry.location.lat(),
                            lon: results[0].geometry.location.lng()
                        }
                        this.counter++;
                        // console.log("location : " + results[0].geometry.location.lat() + " " + results[0].geometry.location.lng());
                    } else {
                        console.log("Something got wrong " + status);
                    }
                }.bind(this));
            } else {

                this.cordinateStorage[field] = element.value;
            }
        }

        return this.cordinateStorage;
    };

};