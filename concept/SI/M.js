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
                }
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