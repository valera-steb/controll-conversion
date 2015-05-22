/**
 * Created on 22.05.2015.
 */
define({

    actions: ['free', 'watching', 'calculating',
        'applying', 'finishing'],

    states: ['load', 'stop', 'allComparatorsOk',
        'onComparatorChange', 'hasControlImpact', 'controlImpactFree'],

    getTransitions: function (s, a, v) {
        return [
            [s.free, [
                [a.load, s.watching],

                [a.onComparatorChange, s.free],
                [a.allComparatorsOk, s.free],
                [a.hasControlImpact, s.free]
            ]],
            [s.watching, [
                [a.onComparatorChange, s.calculating],
                [a.stop, s.free]
            ]],
            [s.calculating, [
                [a.onComparatorChange, s.calculating],
                [a.stop, s.free],
                [a.allComparatorsOk, s.watching],
                [a.hasControlImpact, s.applying]
            ]],
            [s.applying, [
                [a.controlImpactFree, s.calculating],
                [a.stop, s.finishing],
                [a.onComparatorChange, s.applying]
            ]],
            [s.finishing, [
                [a.controlImpactFree, s.free],
                [a.stop, s.finishing],
                [a.onComparatorChange, s.finishing]
            ]]
        ];
    },

    validators: {
        x: function (params, graph) {
        }
    }
});
