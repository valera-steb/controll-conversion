/**
 * Created on 19.05.2015.
 */
define([
    'conceptInfrastructure/fixtures/executorConfig',
    'conceptInfrastructure/fixtures/ou',
    'SI/executor/Executor'
], function (executorConfig, Ou, Executor) {

    describe('SI/executor', function () {
        var ou, x, executer;

        beforeEach(function () {
            ou = new Ou();
            x = new executorConfig({}, ou);
            ou.core.setUp(0);
            executer = new Executor();
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


        it('должен загружать связанный режим и подключать его (куда?)', function(){
            executer.load(x);
        });

        //it('должен ')
        /*
        помечать инвалидные цели
        формировать вектор ошибки
        выбирать управляющую функцию - по наиболее приоритетной ошибке
        применять сформированное управляющее воздействие
         */
    });
});