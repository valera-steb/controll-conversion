/**
 * Created by steb on 12.01.15.
 */
define([], function () {
    return function Stereotypes(m, ou, i) {
        var stereotypes = $.extend(this, {
            items: ko.observableArray([]),
            map: {},

            addUrls: addStereotypes,
            add: addStereotype
        });

        return stereotypes;


        function addStereotypes(sFolder, urls) {
            var
                deferred = new $.Deferred(),
                added = urls.length;

            for (var i in urls)
                require(
                    [sFolder + urls[i]],
                    function (Registrate) {
                        addStereotype(
                            Registrate(
                                m.appRoot,
                                ou
                            ));

                        added--;
                        if (added < 1)
                            deferred.resolve();
                    });

            return deferred.promise();
        }

        function addStereotype(item) {
            stereotypes.map[item.name] = item;
            stereotypes.items.push(item);

            i.stateController.addParameter(item);
        }
    };
});