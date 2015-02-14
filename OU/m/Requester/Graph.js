/**
 * Created by steb on 11.02.2015.
 */
define({

    actions: ['get', 'cancel', 'free',
        'any', 'done', 'fail'],

    states: ['free', 'loading', 'loaded',
        'canceling', 'canceled'],

    getTransitions: function (s, a, v) {
        return [
            [s.free, [
                [a.get, s.loading]
            ]],
            [s.loading, [
                [a.any, s.loaded],
                [a.cancel, s.canceling]
            ]],
            [s.loaded, [
                [a.free, s.free]
            ]],
            [s.canceling, [
                [a.done, s.canceled],
                [a.fail, s.loading],
                [a.any, s.canceling, v.mustFailedGet]
            ]],
            [s.canceled, [
                [a.free, s.free]
            ]]
        ];
    },

    validators:{
        mustReceiveUrl: function(params, graph){
            return params && params.url != undefined;
        },
        mustFailedGet: function(params, graph){
            return params && params.fail;
        }
    }
});
