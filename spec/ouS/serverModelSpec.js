/**
 * Created by steb on 10.02.2015.
 */
define([
    'OU/m/Server'
], function (Server) {

    describe('OU/m/Server', function () {
        var
            server, url;

        beforeEach(function () {
            server = new Server();
            url = 'url';
        });

        it('по умолчанию: сервер активен, нет запроса, нет ошибки', function () {
            expect(server.isActive()).toBeTruthy();
            expect(server.getDeferred()).toBeUndefined();
            expect(server.requestedUrl()).toBeUndefined();
            expect(server.callError()).toBeUndefined();
        });

        it('подтверждение отмены отклоняет запрос', function () {
            var getPromise = server.get(url);
            server.cancel();

            server.cancelDeferred().resolve();

            expect(getPromise.state()).toBe('rejected');
            expect(server.cancelDeferred()).toBeUndefined();
        });

        it('после ответа на запрос, можно отсылать следующий', function(){
            var url2 = 'url2';
            server.get(url);
            server.getDeferred().resolve();

            server.get(url2);

            expect(server.requestedUrl()).toBe(url2);
            expect(server.callError()).toBeUndefined();
        });

        it('не работает, пока висит ошибка callError', function(){
            server.cancel();

            var d = server.get(url);

            expect(d).toBeDefined();
            expect(d.state()).toBe('rejected');
            expect(server.requestedUrl()).toBeUndefined();
            expect(server.callError()).toBe(Server.callErrors.unclean);
        });

        describe('отправка запроса', function () {
            it('даёт Deferred', function () {
                var d = server.get(url);

                expect(d).toBeDefined();
                expect(d.state()).toBe('pending');
                expect(server.requestedUrl()).toBe(url);
                expect(server.callError()).toBeUndefined();
            });

            it('неактивному серверу, даёт отклонённый Deferred', function () {
                server.isActive(false);

                var d = server.get(url);

                expect(d).toBeDefined();
                expect(d.state()).toBe('rejected');
                expect(server.requestedUrl()).toBeUndefined();
                expect(server.callError()).toBeUndefined();
            });

            it('факт:1.1.если есть запрос - его нельзя переотправить', function () {
                var url2 = 'url2';
                server.get(url);

                var d = server.get(url2);

                expect(d).toBeDefined();
                expect(d.state()).toBe('rejected');
                expect(server.requestedUrl()).toBe(url);
                expect(server.callError()).toBe(Server.callErrors.oneGet);
            });
        });

        describe('вызов отмены запроса', function () {
            it('даёт deferred', function () {
                server.get(url);
                var d = server.cancel();

                expect(d).toBeDefined();
                expect(d.state()).toBe('pending');
                expect(server.callError()).toBeUndefined();
            });

            it('факт:1.2.если нет запроса - его нельзя отменить', function () {
                var d = server.cancel();

                expect(d).toBeDefined();
                expect(d.state()).toBe('rejected');
                expect(server.callError()).toBe(Server.callErrors.cancelError);
            });
        });

        describe('ответ на запрос', function () {
            beforeEach(function () {
                server.get(url);
            });

            it('очищает параметры запроса', function () {
                server.getDeferred().resolve();

                expect(server.getDeferred()).toBeUndefined();
                expect(server.requestedUrl()).toBeUndefined();
            });

            it('отклоняет отмену запроса', function () {
                var promise = server.cancel();

                server.getDeferred().resolve();

                expect(server.cancelDeferred()).toBeUndefined();
                expect(promise.state()).toBe('rejected');
            });
        });

        describe('fact:2.запрос отклоняеться, если сервер дезактивируеться', function () {
            var getPromise;

            beforeEach(function(){
                getPromise = server.get();
            });

            it('отклоняется отмена', function () {
                var cancelPromise = server.cancel();

                server.isActive(false);

                expect(cancelPromise.state()).toBe('rejected');
            });

            it('отклоняеться запрос', function () {
                server.isActive(false);

                expect(getPromise.state()).toBe('rejected');
            });
        });
    });
});