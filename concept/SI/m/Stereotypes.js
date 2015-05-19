/**
 * Created by steb on 12.01.15.
 */
define([
    'SI/m/shared/Stereotype'
], function (Stereotype) {
    return function Stereotypes(m, ou, i) {
        var stereotypes = $.extend(this, {
            items: ko.observableArray([]),
            map: {},

            addUrls: addStereotypes,
            add: addStereotype
        });

        return stereotypes;


        function addStereotypes(sFolder, config) {
            var
                deferred = new $.Deferred(),
                added = config.length;

            // TODO: use SI/m/i/batchLoader

            for (var i in config) {
                var itemConfig = config[i];

                require(
                    [sFolder + itemConfig.path],
                    makeRegistrator(itemConfig));
            }

            return deferred.promise();

            function makeRegistrator(params) {
                return function (file) {
                    addStereotype(params, file);

                    added--;
                    if (added < 1)
                        deferred.resolve();
                }
            }
        }

        function addStereotype(stereotypeConfig, file) {
            var stereotypeContainer = new Stereotype(
                stereotypeConfig, file);

            stereotypes.map[stereotypeConfig.key] = stereotypeContainer;
            stereotypes.items.push(stereotypeContainer);
        }
    };
});