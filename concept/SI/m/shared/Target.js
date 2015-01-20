/**
 * Created by steb on 12.01.15.
 */
define([
], function () {
    return function Target(name, compare) {
        var
            flow = {},
            target = $.extend(this, {
                description: {
                    name: name
                },
                cFunctionId: undefined,

                comparator: ko.computed(compare),
                subTargets: undefined,

                _: flow
            });


        flow.cFunctionId = function (id) {
            target.cFunctionId = id;
            return target;
        };
        flow.addSubTarget = function(subTarget){
            target.subTargets = target.subTargets || {
                items: ko.observableArray([])
            };

            target.subTargets.items.push(subTarget);
            return target;
        };


        return target;
    };
});