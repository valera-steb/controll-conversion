/**
 * Created on 26.05.2015.
 */
/*
 обязанность:
 .есть вектор управляющего воздействия
 .для каждого элемента последовательно вызвать действия
 .пометить уже вызванные

 дополнительно, при наличии интерфейса:
 .выполнить одну из.
 .пронумеровать элементы воздействия
 .возможность добавить/удалить элемент

 по событиям:
 .если меняеться режим применения в процессе выполнения.
 */

var interfaceToExecutor = {
    from: { // получаю либо вызываю?
        // Executor может вызвать на ControlImpactApplier-е
        getUi: fStub,
        removeUi: fStub,

        setUpControlImpact: fStub
    },
    to: { // в смысле он вызывать может? == получает от меня доступ к
        // ControlImpactApplier может вызвать на Executor-е
        controlImpactFree: fStub,

        applyMode: ko.observable({
            type: 'RealTime',
            timeout: 10
        }),

        //
        iDomainToSu: {},

        controlImpact: ko.observableArray([])
    }
};

var interfaceFromUi = {
    setUpMode: fStub,

    addControlImpactItem: fStub,
    reorder: fStub,
    removeControlImpactItem: fStub,
    executeControlImpactItem: fStub,

    execute: fStub
};

var internalStructure = {
    domain: {
        ou: {}
    }
};

define([], function () {
    //факт.01: должен менять поведение в зависимости от режима исполнителя
    return function ControlImpactApplier(ou, iExecutor) {
        var
            cia = this,
            //controlImpact = ko.observableArray([]),
            ctx = {
                ou: ou,
                su: iExecutor.iDomainToSu
            };

        cia.getUi = function () {

        };
        cia.removeUi = function () {

        };
        cia.setUpControlImpact = function (p) {
            // в зависимости от режима, применяю ув
            var applyMode = iExecutor.applyMode();
            iExecutor.controlImpact(p);

            switch (applyMode.type) {
                case('RealTime'):
                    applyAll();
                    break;

                case('Delayed'):
                    setTimeout(applyAll, applyMode.timeout);
                    break;

                case('Optional'):
                    // enumerate impact items
                    break;

                default:
                    throw new Error('No type {0}'.format(applyMode.type));
            }
        };
        return cia;


        function applyAll() {
            iExecutor.controlImpact().forEach(applyItem);
            clearVector();
        }

        function clearVector() {
            iExecutor.controlImpact.remove(function (i) {
                return i.applyed;
            });
        }

        function applyItem(impactItem) {
            var
                call = 'with(ctx){ {0}.{1}.apply(path, params);}';

            with (impactItem) {
                call = call.format(path, method);

                console.log(call);
                eval(call);
            }

            impactItem.applyed = true;
        }
    };
});
