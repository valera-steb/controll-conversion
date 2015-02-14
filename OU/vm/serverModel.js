/**
 * Created by steb on 27.01.2015.
 */
define([
    'text!OU/v/server_model.html'
], function (html) {
    function ServerModel(params) {
        with (params) {
            var sm = $.extend(this, {
                data: ko.observable(),

                isActive: server.isActive,
                hasRequest: server.getDeferred,
                isCanceling: server.cancelDeferred,

                waitData: undefined,

                send: function () {
                    server.getDeferred()
                        .resolve(sm.data());
                },
                makeError: function () {
                    server.getDeferred()
                        .reject();
                },
                makeCancel: function () {
                    server.cancelDeferred()
                        .resolve();
                },
                cancelCancel: function () {
                    server.cancelDeferred()
                        .reject();
                }
            });

            sm.waitData = ko.computed(isWait);

            setUp(sm);
            return sm;


            function isWait() {
                return !sm.isActive() || !sm.hasRequest();
            }
        }
    }

    return {
        viewModel: ServerModel,
        template: html
    };
});
