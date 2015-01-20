/**
 * Created by steb on 10.01.15.
 */
define([
    'SI/vm/TargetVector',
    'SI/vm/ObjectTree'
], function (TargetVectorVm, ObjectTree) {
    return function VM(m, i, ou) {
        var vm = $.extend(this, {
            stereotypes: m.stereotypes.items,

            targets: new TargetVectorVm(
                m.targetVector),

            generalConcept: {
                functions: m.generalConcept.functions,
                currentId: i.functionLauncher.cfuId
            },

            tree: [new ObjectTree(m, 'm'), new ObjectTree(ou, 'ou')],

            iteration: i.stateController.iteration,
            controlImpact: i.controlImpactApplier
        });

        return vm;
    };
});