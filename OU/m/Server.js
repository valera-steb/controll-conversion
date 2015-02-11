/**
 * Created by steb on 10.02.2015.
 */
//факт:1.работа методов зависит от текущего состояния
//факт:1.1.если есть запрос - его нельзя переотправить
//факт:1.2.если нет запроса - его нельзя отменить
define([
    'OU/m/ServerContext'
], function (ServerContext) {
    function Server() {
        var server = $.extend(this, {
                isActive: ko.observable(true),

                getDeferred: ko.observable(),
                cancelDeferred: ko.observable(),

                requestedUrl: ko.observable(),
                callError: ko.observable(),

                get: undefined,
                cancel: undefined
            }),
            _ = new ServerContext(server, Server);

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
            //fact:2.запрос фаилиться, если сервер падает
            var
                getDeferred = server.getDeferred(),
                cancelDeferred = server.cancelDeferred();

            //fact:2.1.в начале отменяеться отмена
            if (!v && cancelDeferred)
                cancelDeferred.reject();

            //факт:2.2.потом, запрос
            if (!v && getDeferred)
                getDeferred.reject();
        });
    };

    Server.callErrors = {
        oneGet: 'нельзя отправить запрос, пока предыдущий работает',
        cancelError: 'можно отменить только отправленный запрос',
        unclean: 'перед следующим запросом нужно убрать callError'
    };

    return Server;
});