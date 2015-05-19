/**
 * Created on 19.05.2015.
 */
define([
    'conceptInfrastructure/fixtures/conceptConfig',
    'SI/m/i/ModeLoader'
], function (conceptConfig, ModeLoader) {

    describe('SI/m/i/ModeLoader', function () {
        it('по данной целе из режима должен собирать в массив все стереотипы: для функций и компараторов', function () {
            var ctx = ModeLoader.contextForTests,
                m1 = ctx.findConfigItemBy('m1', conceptConfig.loading.modes),
                map = {};

            ctx.buildUrlsMapByTarget(conceptConfig.loading, m1.vector[0], map);

            var test = {
                s1: ctx.findConfigItemBy('s1', conceptConfig.loading.stereotypes),
                s4: ctx.findConfigItemBy('s4', conceptConfig.loading.stereotypes)
            };
            expect(JSON.stringify(map)).toBe(JSON.stringify(test));
        });
    });
});
