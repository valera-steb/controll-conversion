/**
 * Created on 19.05.2015.
 */
define([
    'conceptInfrastructure/fixtures/executorConfig',
    'conceptInfrastructure/fixtures/ou',
    'SI/executor/Executor',
    'toolBox/automate/Tasker'
], function (executorConfig, Ou, Executor, Tasker) {

    describe('SI/executor', function () {
        var ou, x, executer;

        beforeEach(function () {
            ou = new Ou();
            x = new executorConfig({}, ou);
            ou.core.setUp(0);
            executer = new Executor(new Tasker(), ou);
        });

        describe('stub', function () {
            it('должен привязаться стереотипами к модели', function () {
                expect(x.stereotypes.s1.value()).toBeUndefined();

                ou.interface.command('add');

                expect(x.stereotypes.s1.value()).toBe('add');
            });

            it('должен привязать компараторы к стереотипам', function () {
                expect(x.targetVector[0].c.value()).toBe(false);

                ou.core.setUp(NaN);

                expect(x.targetVector[0].c.value()).toBe(true);
            });

            it('должен связать зависимости функций', function () {
                expect(x.targetVector[0].f()).toBeUndefined();

                ou.core.setUp(NaN);
                ou.interface.command('reset');

                expect(x.targetVector[0].f()).toBeDefined();
            });
        });


        describe('по загрузке', function () {
            var graph, history, disposables;

            beforeEach(function () {
                jasmine.clock().install();

                graph = executer.info.graph;
                history = undefined;
                disposables = [];
            });
            afterEach(function(){
                jasmine.clock().uninstall();

                disposables.forEach(function (item) {
                    item.dispose();
                });
            });

            it('должен подключать компараторы на прослушку', function () {
                graph.state.current.subscribe(onState);
                onState(graph.state.current());

                executer.load({concept: x});

                ou.core.setUp(NaN);
                jasmine.clock().tick(430);

                // наличие истории означает, что по установке значения в оу су увидел изменения
                expect(history).toBe('free => watching => calculating => watching');
            });


            function onState(newValue) {
                if (!history)
                    history = newValue;
                else
                    history += ' => {0}'.format(newValue);
            }
        });

        //todo: !!! додумался как тестить структуру не выдёргивая её внутренности - ниже
        /*
         по проялениям в оу. Ведь его параметры будут изменяться
         */

        //it('должен ')
        /*
         помечать инвалидные цели
         формировать вектор ошибки
         выбирать управляющую функцию - по наиболее приоритетной ошибке
         применять сформированное управляющее воздействие
         */
    });
});
