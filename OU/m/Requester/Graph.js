/**
 * Created by steb on 11.02.2015.
 */
define([

], function () {
    var
        _actions = Graph.actions = buildObject(
            ['get', 'cancel', 'free',
                'any', 'done', 'fail']
        ),
        _states = Graph.states = buildObject(
            ['free', 'loading', 'loaded',
                'canceling', 'canceled']
        ),
        _transitions = Graph.transitions =
            buildTransitions(_states, _actions);

    function Graph(makeActions) {
        var graph = $.extend(this, {
            state: ko.observable(_states.free),
            params: {},

            hasError: ko.observable(false),

            actions: {}
        });

        makeActions(graph.actions, getNextState, graph);

        return graph;
    };


    return Graph;


    function buildObject(array) {
        var o = {};

        for (var i in array)
            o[array[i]] = array[i];

        return o;
    };

    function buildTransitions(s, a) {
        var t = [
            [s.free,
                [
                    [a.get, s.loading]
                ]
            ],
            [s.loading,
                [
                    [a.any, s.loaded],
                    [a.cancel, s.canceling]
                ]
            ],
            [s.loaded,
                [
                    [a.free, s.free]
                ]
            ],
            [s.canceling,
                [
                    [a.done, s.canceled],
                    [a.fail, s.loading]
                ]
            ],
            [s.canceled,
                [
                    [a.free, s.free]
                ]
            ]
        ];

        return t;
    }

    function getNextState(state, action) {
        var
            transition = getTransitionsFor(state),
            newState = search(action, transition);

        return newState;
    }

    function getTransitionsFor(state) {
        for (var i in _transitions)
            if (_transitions[i][0] == state)
                return _transitions[i][1];

        return [];
    }

    function search(action, inArray) {
        for (var i in inArray)
            if (inArray[i][0] == action)
                return inArray[i][1];
    }
});