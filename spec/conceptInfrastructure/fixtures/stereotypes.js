/**
 * Created on 13.05.2015.
 */
define('App/stereotypes/_01_hasCommand', [
    'SI/m/shared/Stereotype'
], function (Stereotype) {
    return function (root, ou) {
        return {
            value: ou.interface.command,
            dispose: function () {
            }
        }
    }
});

define('App/stereotypes/_02_numberChanged', [
    'SI/m/shared/Stereotype'
], function (Stereotype) {
    return function (root, ou) {
        return {
            value: ou.interface.number,
            dispose: function () {
            }
        }
    };
});

define('App/stereotypes/_04_failed', [
    'SI/m/shared/Stereotype'
], function (Stereotype) {
    return function (root, ou) {
        var value = ko.observable(),
            subscription = ou.core.subscribeToAccumulator(function(v){
                value(v);
            });

        return {
            value: value,
            dispose: subscription.dispose
        };
    };
});

define('App/stereotypes/_05_previousCommand', [
    'SI/m/shared/Stereotype'
], function (Stereotype) {
    return function (root, ou) {
        var value = ko.computed(ou.core.getPreviousCommand);

        return {
            value: value,
            dispose: value.dispose
        }
    };
});
