/**
 * Created by steb on 13.01.15.
 */
define([
], function () {
    return function StateController() {
        var
            subscriptions = {},
            timeout = null,
            stateController = $.extend(this, {
                iteration: ko.observable(0),
                addParameter: addParameter,
                removeParameter: undefined
            });

        return stateController;

        function addParameter(stereotype) {
            subscriptions[stereotype.name]
                = stereotype.value.subscribe(onChange);
        }

        function onChange() {
            if (timeout == null)
                timeout = setTimeout(onTime, 200);
        }

        function onTime() {
            var i = stateController.iteration();
            stateController.iteration(++i);
            timeout = null;
        }
    };
});