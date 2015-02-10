/**
 * Created by steb on 27.01.2015.
 */
define([
    'text!OU/v/server_model.html'
], function(html){
    function ServerModel(){
        var sm = $.extend(this, {
            data: ko.observable(),

            isActive: ko.observable(true),
            hasRequest: ko.observable(false),
            isCanceling: ko.observable(false),

            waitData: undefined
        });
        sm.waitData = ko.computed(isWait);

        //todo: где-то должен быть объект, с урл и deferred-ом

        sm.send = function () {
            //todo: resolve deferred
        };
        sm.makeError = function(){
            //todo: failed deferred
        };
        sm.makeCancel = function(){
            //todo: ?
        };
        return sm;


        function isWait(){
            return !sm.isActive() || !sm.hasRequest();
        }
    }

    return {
        viewModel: ServerModel,
        template: html
    };
});
