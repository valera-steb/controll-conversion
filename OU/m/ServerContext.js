/**
 * Created by steb on 10.02.2015.
 */
define([

], function () {
    return function ServerContext(server) {
        var _ = $.extend(this, {
            hasError: false
        });

        _.clean = function () {
            _.hasError = false;
        };

        //-----------------------------
        // get request
        _.validateGet = function () {
            _.hasError = server.getDeferred() != undefined;

            // TODO: может что другое?
            if (_.hasError)
                throw new Error('can`t send second request');

            return _;
        };

        _.makeGetDeferred = function (url) {
            if (_.hasError) return _;

            makeSelfCleanDeferred('getDeferred');
            server.requestedUrl(url);

            return _;
        };

        _.doneGet = function () {
            if (!_.hasError && !server.isActive())
                server.getDeferred().reject();

            return getPromise(
                server.getDeferred()
            );
        };

        //-----------------------------
        // cancel request
        _.validateCancel = function () {
            var
                deferred = server.getDeferred();

            _.hasError = deferred != undefined
                && deferred.state() == "pending";

            // TODO: может что другое?
            if (_.hasError)
                throw new Error('can`t send second request');

            return _;
        };

        _.makeCancelDeferred = function () {
            if (_.hasError) return _;

            var
                cancelDeferred = makeSelfCleanDeferred('cancelDeferred'),
                getDeferred = server.getDeferred();

            //факт: если гет сработал, то отмена отклонена
            getDeferred.done(cancelDeferred.reject);

            //факт: если отмена сработала, то гет отменён
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
                _.hasError
                    ? (new $.Deferred()).reject()
                    : deferred
                ).promise();
        };

        function makeSelfCleanDeferred(field) {
            var
                deferred = new $.Deferred();

            deferred.always(function () {
                server[field](undefined);
            });

            server[field](deferred);

            return deferred;
        }

        return _;
    };
});