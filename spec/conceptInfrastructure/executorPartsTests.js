/**
 * Created on 26.05.2015.
 */
define([
    'SI/executor/ComparatorsWatcher',
    'SI/executor/ControlImpactApplier',
    'SI/executor/Delayer'
], function (ComparatorsWatcher, ControlImpactApplier, Delayer) {
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

        describe('Delayer', function(){
            var iExecutor, delayer;

            beforeEach(function(){
                iExecutor = {
                    state: ko.observable(),
                    states: {
                        watching:'watching',
                        applying: 'applying'
                    },
                    actions: {
                        'onComparatorChange': {},
                        'controlImpactFree' : {}
                    }
                };

                delayer = new Delayer(iExecutor);

                spyOn(iExecutor.actions, 'onComparatorChange');
                spyOn(iExecutor.actions, 'controlImpactFree');
            });

            describe('в режиме Delayed', function(){
                beforeEach(function () {
                    iExecutor.mode = ko.observable({
                        delayer: {
                            type: 'Delayed',
                            timeout: 200
                        }
                    });

                    jasmine.clock().install();
                });

                afterEach(function(){
                    jasmine.clock().uninstall();
                });

                it('должен откладывать вызов если исполнитель в заданном состоянии', function(){
                    iExecutor.state('watching');
                    delayer.call['onComparatorChange']('params');

                    with(iExecutor.actions) {
                        expect(onComparatorChange.calls.count()).toBe(0);
                        jasmine.clock().tick(210);

                        expect(onComparatorChange.calls.count()).toBe(1);
                        expect(onComparatorChange.calls.argsFor(0)).toEqual(['params']);
                    }
                });

                it('должен пропускать вызов в низлежащий граф если исполнитель не в заданном состоянии', function(){
                    iExecutor.state('not watching');
                    delayer.call['onComparatorChange']('params');

                    with(iExecutor.actions) {
                        expect(onComparatorChange.calls.count()).toBe(1);
                        jasmine.clock().tick(210);

                        expect(onComparatorChange.calls.count()).toBe(1);
                        expect(onComparatorChange.calls.argsFor(0)).toEqual(['params']);
                    }
                });

                it('должен позволять вызвать то-же действие повторно - но не переинициализируя ожидание', function(){
                    iExecutor.state('watching');
                    delayer.call['onComparatorChange']('params');

                    with(iExecutor.actions) {
                        expect(onComparatorChange.calls.count()).toBe(0);
                        jasmine.clock().tick(110);

                        delayer.call['onComparatorChange']('params');
                        expect(onComparatorChange.calls.count()).toBe(0);
                        jasmine.clock().tick(100);

                        expect(onComparatorChange.calls.count()).toBe(1);
                        expect(onComparatorChange.calls.argsFor(0)).toEqual(['params']);
                    }
                });

                it('должен кидать исключение при попытки отложить другое действие, до выполнения уже отложенного', function(){
                    iExecutor.state('watching');
                    delayer.call['onComparatorChange']('params');

                    iExecutor.state('applying');
                    expect(function(){
                        delayer.call['controlImpactFree']('error');
                    }).toThrow();

                    jasmine.clock().tick(210);

                    with(iExecutor.actions) {
                        expect(onComparatorChange.calls.count()).toBe(1);
                        expect(onComparatorChange.calls.argsFor(0)).toEqual(['params']);
                    }
                });

                it('должен позволять форсировать выполнение отложенного действия', function(){
                    iExecutor.state('watching');
                    delayer.call['onComparatorChange']('params');

                    with(iExecutor.actions) {
                        expect(onComparatorChange.calls.count()).toBe(0);
                        jasmine.clock().tick(110);

                        delayer.force.action();
                        expect(onComparatorChange.calls.count()).toBe(1);
                        expect(onComparatorChange.calls.argsFor(0)).toEqual(['params']);

                        jasmine.clock().tick(110);
                        expect(onComparatorChange.calls.count()).toBe(1);
                        expect(onComparatorChange.calls.argsFor(0)).toEqual(['params']);
                    }
                });

                xit('а что делать, если граф ушёл из заданного состояния до вызова действия?', function () {

                });
            });

            describe('в режиме RealTime', function(){});

            describe('в режиме Optional', function () {

            });
        });
    });
});
