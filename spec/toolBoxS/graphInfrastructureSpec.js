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

        it('выполняет допустимый переход', function () {
            with (graphBase) {
                actions.g02();

                expect(state.current()).toBe('s02');
                expect(state.prev).toBe('s01');
            }
            expect(graphBase.error).toBeUndefined();
        });

        it('копирует параметры события по переходу', function(){
            with (graphBase) {
                actions.g02();
                actions.g03({id:1});

                expect(params.id).toBe(1);
            }
        });

        it('падает по несуществующему переходу', function(){
            with (graphBase) {
                actions.g03();

                expect(state.current()).toBe('"_error_"');
                expect(state.prev).toBe('s01');
                expect(error).toBe(GraphContext.errors.hasNoTransition);
            };
        });

        it('падает по не выполненному валидатору', function(){
            with (graphBase) {
                actions.g02();
                actions.g03({z:10});

                expect(state.current()).toBe('"_error_"');
                expect(state.prev).toBe('s02');
                expect(error).toBe(GraphContext.errors.validationError);
                expect(JSON.stringify(params)).toBe(JSON.stringify({}));
            }
        });
    });

    describe('Контроллер вызовов', function () {

    });
});
