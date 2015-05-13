/**
 * Created on 13.05.2015.
 */
define(function () {
    return function Ou() {
        var ou = this;
        ou.interface = {
            number: ko.observable(),
            command: ko.observable()
        };

        ou.core = (function () {
            var
                accumulator = undefined,
                core = this,
                postbox = new ko.subscribable(),
                previousCommand = ko.observable(),
                currentCommand;

            core.clear = function () {
                core.accumulator = undefined;
                notifyAcc();
            };

            core.setUp = function (number) {
                accumulator = number;
                notifyAcc();
            };

            core.add = function (number) {
                accumulator += number;
                notifyAcc();
            };

            core.getA = function () {
                return accumulator;
            };

            core.subscribeToAccumulator = function(callback){
                return postbox.subscribe(callback, "accumulator");
            };
            core.getPreviousCommand = function(){
                return previousCommand();
            };

            ou.interface.command.subscribe(onCommand);

            return core;

            function notifyAcc() {
                postbox.notifySubscribers(
                    core.accumulator,
                    "accumulator"
                )
            }

            function onCommand(newCommand){
                previousCommand(currentCommand);
                currentCommand = newCommand;
            }
        })();
    }
});