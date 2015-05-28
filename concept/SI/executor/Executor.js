/**
 * Created on 19.05.2015.
 */

var fStub = function () {
};
var interfaceForUi = {
    fromExecutor: {
        domain: {
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
            ]
        },

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

/*
 есть ли ещё куда-либо интерфейсы - к чему-либо?
 кто толкает выполнение установки концепции?
 */
var interfaceToDomain = {
    //т.е. к концепции в систему загруженной, но от него ли он нужен?
};

// таки куда интерфейс? вообще-то si как раз то.
var interfaceToSi = {
    to:{
        ou: {},
        tasker: 'нужен для графа'
    },
    from: {
        getUi: fStub,
        load: fStub
    }
};

var internalStructure = {
    domain: {
        // из чего состоит? полная ли копия входящего, либо есть ообёртка какая?
        targetVector: [],

        // а нужна ли хоть какая-либо структура внутренняя, кроме приходящей от загрузчика?
        stereotypes: []
    },
    utils: {
        applyModeController: 'режим применения управляющего фоздействия / переходов',
        /*
         как он встроиться в граф?
         */

        comparatorsWatcher: 'обеспечивает своевременный запуск выбора управляющего воздействия',

        controlImpactCalculator: '+',

        controlImpactApplier: ''
    }
};

define([
    'SI/executor/ExecutorGraph',
    'toolBox/automate/GraphBase',
    'SI/executor/ComparatorsWatcher',
    'SI/executor/ControlImpactCalculator',
    'SI/executor/ControlImpactApplier'
], function (executorGraph, GraphBase, ComparatorsWatcher, ControlImpactCalculator, ControlImpactApplier) {
    /*
     каковы задачи?
     .загрузить и связать.
     .посчитать управляющее воздействие
     .предоставить ui интерфейс:
     ..списки.
     ..команды. - выше описаны.
     .предоставить интерфейс для домена:
     ..установка/модификация целей
     ..проброс управляющего воздействия.
     ..добавить/удалить стереотип.
     ..добавить/удалить компаратор.
     ..добавить/удалить функцию.
     ..доступ к спискам: целей/функций/стереотипов.
     */
    return function Executor(tasker, ou) {
        var
            ex = this,
            graph = new GraphBase(tasker, executorGraph),
            s = {};

        s.domain = {
            targetVector: ko.observableArray([]),
            stereotypes: ko.observableArray([]),
            functions: ko.observableArray([]),

            mode: ko.observable(),
            controlImpact: ko.observable()
        };

        s.utils = {
            comparatorsWatcher: new ComparatorsWatcher(graph.actions.onComparatorChange),

            calculateControlImpact: new ControlImpactCalculator({
                has: setUpControlImpact,
                allComparatorsOk: graph.allComparatorsOk
            }, s.domain.targetVector),

            controlImpactApplier: new ControlImpactApplier(ou, new ExecutorForApplier())
        };


        ex.info = {
            graph: graph
        };
        ex.load = graph.actions['load'];
        ex.getUi = function () {

        };

        // subscribe
        with (graph.subscribe) with (graph.state.all) {
            onTransition(free, watching, onLoad);
            onLeaveState(watching, onLoaded);

            onEnterState(calculating, s.utils.calculateControlImpact);

            onTransition(calculating, applying, setUpControlImpact)
        }
        return ex;


        function onLoad(p) { // p must have .concept
            /*
             факт.01: нужо отслеживать зависимость - изменение в компараторах - момент для запуска функций оценки
             факт.02: нужна возможность достраивать элементы в концепцию - но потом
             факт.02.1: вектор целей может меняться по составу в процессе

             факт.03: если есть UI нужно что-бы он реагировал на установку списков (переменных домена)
             */

            /*
             setUpLists -  domain subscribables
             subscribeComparators
             */
            var c = p.concept;
            with (s.domain) {
                stereotypes(c.stereotypes);
                functions(c.functions);
                targetVector(c.targetVector);
            };

            c.targetVector.forEach(function (target) {
                s.utils.comparatorsWatcher.addComparator(target.c);
            });
        }
        function onLoaded(p) {
            delete graph.params.concept;
        }

        function setUpControlImpact(vector){
            s.domain.controlImpact(vector);
            graph.actions['hasControlImpact']();
        }

        function ExecutorForApplier(){
            this.controlImpactFree = graph.actions['controlImpactFree'];
            this.applyMode = function(){
                //TODO: get mode from applyModeController - подумать нужен ли он
                return {
                    type: 'Delayed',
                    timeout: 200
                }
            };
            this.iDomainToSu = {};
            this.controlImpact = s.domain.controlImpact;

            return this;
        }
    };
});
