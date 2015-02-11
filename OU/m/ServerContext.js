/**
 * Created by steb on 10.02.2015.
 */
define([
], function () {
    return function ServerContext(server, Server) {
        var _ = $.extend(this, {
            hasError: false
        });

        _.clean = function () {
            _.hasError = false;

            return _;
        };

        //-----------------------------
        // get request
        _.validateGet = function () {
            preValidate();
            if (_.hasError) return _;

            _.hasError = server.getDeferred() != undefined;

            if (_.hasError)
                server.callError(Server.callErrors.oneGet);

            return _;
        };

        _.makeGetDeferred = function (url) {
            if (_.hasError) return _;

            if (server.isActive()) {
                makeSelfCleanDeferred('getDeferred');
                server.requestedUrl(url);
            }

            return _;
        };

        _.doneGet = function () {
            return getPromise(
                server.getDeferred()
            );
        };

        //-----------------------------
        // cancel request
        _.validateCancel = function () {
            preValidate();
            if (_.hasError) return _;

            var
                deferred = server.getDeferred();

            _.hasError = deferred == undefined
                || deferred.state() != "pending";

            if (_.hasError)
                server.callError(Server.callErrors.cancelError);

            return _;
        };

        _.makeCancelDeferred = function () {
            if (_.hasError) return _;

            var
                cancelDeferred = makeSelfCleanDeferred('cancelDeferred'),
                getDeferred = server.getDeferred();

            //факт:3.запрос и отмена взаимосвязаны
            //факт:3.1.отмена отклоняеться, по ответу на запрос
            getDeferred.always(cancelDeferred.reject);
            //факт:3.2.запрос отклоняется по подтверждению отмены
            cancelDeferred.done(getDeferred.reject);

            return _;
        };

        _.doneCancel = function () {
            return getPromise(
                server.cancelDeferred()
            );
        };

        //-----------------------------
        // utils
        function getPromise(deferred) {
            return (
                    _.hasError || !deferred
                ? (new $.Deferred()).reject()
                : deferred
                ).promise();
        };

        function makeSelfCleanDeferred(field) {
            var
                deferred = new $.Deferred();

            deferred.always(function () {
                server[field](undefined);

                if (field == 'getDeferred')
                    server.requestedUrl(undefined);
            });

            server[field](deferred);

            return deferred;
        }

        function preValidate() {
            if (server.callError()) {
                _.hasError = true;
                server.callError(Server.callErrors.unclean);
            }
        }

        return _;
    };
});