/**
 * Created by steb on 13.01.15.
 */
define([
    ], function () {
        return function FunctionLauncher(m, i) {
            var functionLauncher = $.extend(this, {
                stateSnapshot: ko.observable(),
                cfuId: ko.observable()
            });

            i.stateController.iteration.subscribe(onIteration);

            return functionLauncher;


            function onIteration() {
                with (functionLauncher) {
                    var
                        snapshot = makeSnapshot(m.stereotypes.map),
                        target = selectTarget(m.targetVector.items),
                        _cfuId, cfu, impact;

                    _cfuId = target ? target.cFunctionId : undefined;
                    cfu = _cfuId
                        ? m.generalConcept.map[_cfuId]
                        : undefined;


                    with (functionLauncher) {
                        stateSnapshot(snapshot);
                        cfuId(_cfuId);
                    }


                    if (cfu)
                        impact = cfu.calculate(snapshot);
                    i.controlImpactApplier.setUp(impact);
                }
            }
        };

        function makeSnapshot(statesMap) {
            var snapshot = {};

            for (var name in statesMap)
                snapshot[name] = statesMap[name].value();

            return snapshot;
        }

        function selectTarget(vector) {
            //TODO: добавить проверку на ошибку выкинутую в таблицу
            // сканировать, до обнаружения 1-й не выполненной цели
            // и вернуть её, возможно вместе с положением/адресом
            var
                targets = ko.unwrap(vector);

            for (var id in targets) {
                var
                    target = targets[id],
                    subTarget;

                if (target.subTargets)
                    subTarget = selectTarget(target.subTargets.items);

                if (subTarget)
                    return subTarget;

                if (!target.comparator())
                    return target;
            }

            return undefined;
        }
    }
);
