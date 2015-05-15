/**
 * Created on 14.05.2015.
 */
define('App/comparators/_01_hasError', [], function () {
    return function () {

        return {
            calculate: function(state){
                return isNaN(state.s4);
            },
            dispose: function() {
            }
        }
    }
});

define('App/comparators/_02_hasCommand', [], function () {
    return function (paramsComputed) {
        var value = ko.computed(function () {
            var params = paramsComputed();
        });

        return {
            value: value,
            dispose: function() {
                value.dispose();
                paramsComputed.dispose();
            }
        }
    }
});

define('App/comparators/_03_hasTask', [], function () {
    return function (paramsComputed) {
        var value = ko.computed(function () {
            var params = paramsComputed();
        });

        return {
            value: value,
            dispose: function() {
                value.dispose();
                paramsComputed.dispose();
            }
        }
    }
});
