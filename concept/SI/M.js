/**
 * Created by steb on 10.01.15.
 */
define([
    'SI/m/Stereotypes',
    'SI/m/StateController',
    'SI/m/FunctionLauncher',
    'SI/m/GeneralConcept',
    'SI/m/ControlImpactApplier'
], function (Stereotypes, StateController, FunctionLauncher, GeneralConcept, ControlImpactApplier) {
    return function M(ou) {
        var
            m = $.extend(this, {
                appRoot: undefined,

                targetVector: {
                    items: ko.observableArray([])
                },
                stereotypes: undefined,
                generalConcept: undefined,

                additional: {
                    vm: undefined,
                    makeUi: makeUi,
                    loadConfig: loadConfig
                },
                state: {}
            }),
            i = {
                stateController: new StateController(),
                functionLauncher: undefined,
                controlImpactApplier: undefined
            };
        m.stereotypes = new Stereotypes(m, ou, i);
        m.generalConcept = new GeneralConcept(i, ou);

        i.controlImpactApplier = new ControlImpactApplier({
            ou: ou,
            su: { m: m, i: i }
        });
        i.functionLauncher = new FunctionLauncher(m, i);

        return m;


        function makeUi(element) {
            require(['SI/VM'], function (VM) {
                var vm =
                    m.additional.vm = new VM(m, i, ou);

                ko.applyBindings(vm, element);
            });
        }

        function loadConfig(c){
            //var notifier = new $.Deferred();

            var onStereotypes = m.stereotypes.addUrls(
                '',
                c.loading.stereotypes
            );

            return onStereotypes;
        }
    };
});


/*
какие интерфейсы тут должны быть?
.к пользователю - что несёт?
.к внешнему коду - т.е. коду:
    ..который инициализирует все.
    .?выходит за рамки подхода?
        ...либо не приемлит подход.
        ...то как он выражен
        ...либо то, сам подход

что обеспечить должен?
.взаимодействие структур в рамках решаемой задачи.
.нести задачи, которые общие для подхода, согласуют структуры.
.инфраструктурные задачи синхронизации - таскер графов.
*/
var fStub = function () {};


var outerInterface = {
    setUpMode: function(key){},

    // нужно ли, загрузка чего?
    load: fStub,

    makeUi: fStub
};

var uiInterface = {
    makeUi: fStub,
    hideUi: fStub
};

var domainInterface = {
    setUpMode: function(key){}
};


var internalStructure = {
    executor: 'исполняет загруженную в него концепцию',
    modeLoader: 'подгружает в исполнителя концепцию, строя её из ?конфига/совокупности?',
    conceptsAggregate: 'совокупность концепций управления'
};






