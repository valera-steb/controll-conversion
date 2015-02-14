/**
 * Created by steb on 12.02.15.
 */
define([
    'toolBox/automate/GraphBase',
    'toolBox/automate/Tasker',
    'toolBox/automate/GraphContext'
], function (GraphBase, Tasker, GraphContext) {
    var graphParams = {
        states: ['s01', 's02', 's03'],
        actions: ['g02', 'g03', 'g01'],
        validators: {
            out02: function (params, graph) {
                return params && params.id != undefined;
            }
        },
        getTransitions: function (s, a, v) {
            return [
                [s.s01, [
                    [a.g02, s.s02]
                ]],
                [s.s02, [
                    [a.g03, s.s03, v.out02],
                    [a.g01, s.s01]
                ]],
                [s.s03, [
                    [a.g01, s.s01]
                ]]
            ];
        }
    };

    describe('Базовый класс графа', function () {
        var
            graphBase;

        beforeEach(function () {
            graphBase = new GraphBase(
                new Tasker(),
                graphParams
            );
        });

        it('по умолчанию в начальном состоянии', function(){

        });

        it('выполняет допустимый переход', function () {
            with (graphBase) {
                actions.g02();

                expect(state.current()).toBe('s02');
                expect(state.prev).toBe('s01');
            }
            expect(graphBase.error).toBeUndefined();
        });

        it('копирует параметры события по переходу', function () {
            with (graphBase) {
                actions.g02();
                actions.g03({id: 1});

                expect(params.id).toBe(1);
            }
        });

        it('падает по несуществующему переходу', function () {
            with (graphBase) {
                actions.g03();

                expect(state.current()).toBe('"_error_"');
                expect(state.prev).toBe('s01');
                expect(error).toBe(GraphContext.errors.hasNoTransition);
            }
        });

        it('падает по не выполненному валидатору', function () {
            with (graphBase) {
                actions.g02();
                actions.g03({z: 10});

                expect(state.current()).toBe('"_error_"');
                expect(state.prev).toBe('s02');
                expect(error).toBe(GraphContext.errors.validationError);
                expect(JSON.stringify(params)).toBe(JSON.stringify({}));
            }
        });

        it('сбрасываеться в начальное состояние', function(){

        });
    });

    describe('Контроллер вызовов', function () {
        var
            tasker;

        beforeEach(function () {
            tasker = new Tasker;
        });

        it('по умолчанию настроен и свободен', function () {
            testReadyAndFree(tasker);
        });

        it('загружаеться', function () {
            tasker.enter();
            testWorking(tasker);
        });

        it('добавляет событие в очередь, если загружен', function () {
            with(tasker) {
                enter(), addAction('act', 'p', 'm');

                expect(queueLength()).toBe(1);
            }

            testWorking(tasker);
        });

        it('по выходу запускает событие из очереди, если есть', function () {
            var
                currentD,
                testD = 'test data';

            tasker.enter();
            tasker.addAction(function (p) {
                currentD = p;
                tasker.exit();
            }, testD, 'mark');
            tasker.exit();

            testReadyAndFree(tasker);
            expect(currentD).toBe(testD);
        });

        it('полностью очищаеться по сбросу', function(){
            tasker.addAction('a', 'p', 'm');
            tasker.clean();

            testReadyAndFree(tasker);
        });

        function testWorking(tasker) {
            with (tasker) {
                expect(error()).toBeUndefined();
                expect(isWorking()).toBeTruthy();
                expect(isInAction()).toBeTruthy();
            }
        };

        function testReadyAndFree(tasker) {
            with (tasker) {
                expect(queueLength()).toBe(0);
                expect(error()).toBeUndefined();
                expect(isWorking()).toBeFalsy();
                expect(isInAction()).toBeFalsy();
            }
        }

        describe('падает по', function () {
            it('добавлению в незагруженный', function () {
                tasker.addAction('a', 'p', 'm');

                expect(tasker.error()).toBe(Tasker.errors.add);
            });

            it('входу в загруженный', function () {
                with (tasker) {
                    enter(), enter();

                    expect(error()).toBe(Tasker.errors.enter);
                }
            });

            it('действию при наличии ошибки', function () {
                with (tasker) {
                    addAction('a', 'p', 'm'), enter();

                    expect(error()).toBe(Tasker.errors.reError);
                }
            });
        });
    });

    describe('Граф с контроллером очереди FIFO', function(){
        var graph, spayedObj;

        beforeEach(function () {
            graph = new GraphBase(
                new Tasker(),
                graphParams
            );

            spayedObj = {
                call: function(){},
                fire: function(){
                    graph.actions.g03({id:'id'});
                }
            };
        });

        it('вызывает дочерние события в порядке их появления', function(){
            spyOn(spayedObj, 'call');
            with(graph) {
                subscribe.onEnterState(state.all.s02, spayedObj.fire);
                subscribe.onEnterState(state.all.s03, spayedObj.call);
                actions.g02();
            }
            with (spayedObj.call.calls) {
                expect(any()).toBeTruthy();
                expect(mostRecent().args).toContain({id:'id'});
            };
        });
    });
});
