/**
 * Created by steb on 10.02.2015.
 */
define([
    'OU/m/ServerContext'
], function (ServerContext) {
    return function Server() {
        var server = $.extend(this, {
                isActive: ko.observable(true),

                getDeferred: ko.observable(),
                cancelDeferred: ko.observable(),

                requestedUrl: ko.observable()
            }),
            _ = new ServerContext(server);

        server.get = function (url) {
            _
                .clean()
                .validateGet()
                .makeGetDeferred(url);

            return _.doneGet();
        };

        server.cancel = function () {
            _
                .clean()
                .validateCancel()
                .makeCancelDeferred();

            return _.doneCancel();
        };

        server.isActive.subscribe(function (v) {
            //fact: запрос фаилиться, если сервер падает
            var deferred = server.getDeferred();

            if (!v && deferred)
                deferred.reject();
        });
    }
});