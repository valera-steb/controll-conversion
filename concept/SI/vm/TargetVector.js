/**
 * Created by steb on 12.01.15.
 */
define([
], function () {
    return function TargetVector(m) {
        var targetVector = ko.observableArray([]);

        wrapVector(m.items());
        m.items.subscribe(wrapVector);

        return targetVector;


        function wrapVector(targets) {
            targetVector($.map(
                targets,
                wrapTarget
            ));
        }

        function wrapTarget(t) {
            var itemVm = {
                name: t.description.name,
                subTargets: t.subTargets
                    ? new TargetVector(t.subTargets)
                    : undefined,
                mark: undefined
            };

            itemVm.mark = ko.computed(function () {
                return t.comparator()
                    ? 'success'
                    : 'targeting';
            });

            return itemVm;
        }
    };
});