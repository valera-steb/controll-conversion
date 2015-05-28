/**
 * Created on 26.05.2015.
 */
define([
    'SI/executor/ComparatorsWatcher',
    'SI/executor/ControlImpactApplier'
], function (ComparatorsWatcher, ControlImpactApplier) {
    describe('Si/Executor - parts', function () {

        describe('ComparatorsWatcher', function () {
            var cw, stub = {
                callback: function () {
                }
            };

            beforeEach(function () {
                spyOn(stub, 'callback');
                cw = new ComparatorsWatcher()
            });

            it('должен отлавливать события от добавленных компораторов, вызывая коллбэк по выходу значение за рамки допустимого', function () {

            });

            it('должен отключаться от заданного ключём компаратора', function () {

            });

            it('должен освобождать все компараторы', function () {

            });
        });

        describe('ControlImpactApplier', function () {
            it('должен сразу применять установленный вектор в режиме RealTime', function () {
                var
                    ou = { test: function (x) { } },
                    iExecutor = {
                        controlImpactFree: function () {
                        },

                        applyMode: ko.observable({
                            type: 'RealTime',
                            timeout: undefined
                        }),

                        iDomainToSu: {}
                    },
                    ci = new ControlImpactApplier(ou, iExecutor);

                spyOn(ou, 'test').and.callThrough();

                ci.setUpControlImpact([
                    {
                        path: 'ou', method: 'test', params: ['101']
                    }
                ]);

                expect(ou.test.calls.count()).toBe(1);
                expect(ou.test.calls.argsFor(0)).toEqual(['101']);
            });

            id('должен применить установленный вектор через заданное время в режиме')
        });
    });
});
