/**
 * Created on 19.05.2015.
 */

var fStub = function () {
};
var interfaceForUi = {
    fromExecutor: {
        // выдергивает описание и булево значение компоратора для подсветки
        targetVector: [],

        // массив стереотипов, текущее значение которых забиндено на вывод
        state: [],

        // аналогичный targetVector, только выдергивает значение компараторов
        error: [],

        mode: {
            key: '',

            // подсвечивает активную управлюящую функцию
            functions: [],

            // может детали о режиме...
            params: {}
        },

        // управляющее воздействие, вроде как и было, только добавить название
        controlImpact: [
            {
                path: 'ou.core', params: {}, method: '<methodName>',
                description: {title: '', text: ''}
            }
        ],


        // далее идёт не связанное с концепцией отображённой, но
        // являющееся выражением концепции SI
        // кажеться это стоит разделить
        executorParams: {
            mode: 'режим формирования и применения управляющего воздействия',
            iteration: 0
        }
    },
    toExecutor: {
        // выбираеться: когда генерить управляющее воздействие
        // как выполнять применение управляющего воздействия
        setUpExecutionMode: fStub,

        recalculateControlImpact: fStub,

        applyControlImpactItem: fStub
    }
};

define([
    'SI/executor/Graph',
    'toolBox/automate/GraphBase'
], function (graph, GraphBase) {
    return function Executor() {
        var ex = this;


        ex.load = function (concept) {
            /*
             факт.01: нужо отслеживать зависимость - изменение в компараторах - момент для запуска функций оценки
             факт.02: нужна возможность достраивать элементы в концепцию - но потом
             факт.02.1: вектор целей может меняться по составу в процессе
             */
        };


        function onComparatorChange(){}
    };
});
