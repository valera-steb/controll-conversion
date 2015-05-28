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

            xit('должен отлавливать события от добавленных компораторов, вызывая коллбэк по выходу значение за рамки допустимого', function () {

            });

            xit('должен отключаться от заданного ключём компаратора', function () {

            });

            xit('должен освобождать все компараторы', function () {

            });
        });

        describe('ControlImpactApplier', function () {
            var ou, iExecutor, ci;

            beforeEach(function () {
                ou = {
                    test: function (x) {
                    }
                };
                iExecutor = {
                    controlImpactFree: function () {
                    },

                    applyMode: ko.observable({
                        type: 'RealTime',
                        timeout: undefined
                    }),

                    iDomainToSu: {},
                    controlImpact: ko.observableArray([])
                };
                ci = new ControlImpactApplier(ou, iExecutor);

                spyOn(ou, 'test').and.callThrough();
            });

            it('должен сразу применять установленный вектор в режиме RealTime', function () {
                setUpControlImpact();

                expect(ou.test.calls.count()).toBe(1);
                expect(ou.test.calls.argsFor(0)).toEqual(['101']);
            });

            it('должен применить установленный вектор через заданное время в режиме Delayed', function(){
                jasmine.clock().install();

                iExecutor.applyMode().type = 'Delayed';
                iExecutor.applyMode().timeout = 500;
                expect(ou.test.calls.count()).toBe(0);

                setUpControlImpact();
                expect(ou.test.calls.count()).toBe(0);

                jasmine.clock().tick(1000);
                expect(ou.test.calls.count()).toBe(1);
                expect(ou.test.calls.argsFor(0)).toEqual(['101']);

                jasmine.clock().uninstall();
            });

            xit('должен очищать уже применённые действия', function(){

            });

            xit('должен помечать уже применённые действия', function(){});

            xit('при выполнении всех, должен применять только не применённые действия', function(){});

            function setUpControlImpact(){
                ci.setUpControlImpact([
                    {
                        path: 'ou', method: 'test', params: ['101']
                    }
                ]);
            }
        });
    });
});
