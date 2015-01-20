/**
 * Created by steb on 15.01.15.
 */
define([
], function () {
    return function ControlImpactApplier(ctx) {
        var controlImpactApplier = $.extend(this, {
            impact: ko.observable(),
            setUp: setUp,

            actions: {
                applyNext: undefined,
                applyAll: applyAll
            }
        });

        return controlImpactApplier;

        function setUp(impact) {
            controlImpactApplier.impact(impact);
        }

        function applyAll() {
            $.each(controlImpactApplier.impact(), function (i, obj) {
                var call = 'with(ctx){' +
                    obj.path + '.' + obj.method +
                    '.apply(obj.path, obj.params);}';
                console.log(call);
                eval(call);
            });
        }
    };
});