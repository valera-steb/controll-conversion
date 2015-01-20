/**
 * Created by steb on 15.01.15.
 */
define([
    'SI/m/shared/TFunction'
], function (TFunction) {
    return function GeneralConcept(i, ou) {
        var generalConcept = $.extend(this, {
            map: {},
            functions:ko.observableArray([]),

            addFunction: addTargetFunction,
            registrateFunctions: registrate
        });

        return generalConcept;

        function addTargetFunction(params) {
            var f = new TFunction(
                i.controlImpactApplier,
                params, ou
            );

            with(generalConcept) {
                map[params.name] = f;
                functions.push(f);
            }
            return f;
        }

        function registrate(fFolder, urls) {
            var
                deferred = new $.Deferred(),
                added = urls.length;

            for (var i in urls)
                require([fFolder + urls[i]], function (f) {
                    addTargetFunction(f);

                    added--;
                    if (added < 1)
                        deferred.resolve();
                });

            return deferred.promise();
        }
    };
});