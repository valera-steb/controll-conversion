/**
 * Created by steb on 12.02.15.
 */
define([
    'toolBox/automate/FsmSubscription',
    'toolBox/automate/GraphContext'
], function (FsmSubscription, GraphContext) {
    return function GraphBase(_tasker, _params) {
        var
            _transitionsMap,
            graphBase = $.extend(this, {
                    state: {
                        current: ko.observable(),
                        prev: undefined,

                        first: undefined,
                        error: '"_error_"',
                        all: undefined
                    },
                    params: {},
                    error: undefined,

                    actions: {},
                    subscribe: {},
                    reset: undefined
                }
            );

        init();
        graphBase.subscribe = new FsmSubscription(graphBase);


        return graphBase;


        function init() {
            var
                states = buildObject(_params.states),
                actions = buildObject(_params.actions),
                transitions = _params.getTransitions(
                    states, actions, _params.validators
                );

            _transitionsMap = buildMap(transitions);

            $.each(actions, function (name) {
                graphBase.actions[name] = makeAction(name);
            });

            with (graphBase.state) {
                all = states;
                first = transitions[0][0];
                current(first);
            }
        }

        function switchTo(state) {
            with (graphBase.state) {
                prev = current();
                current(state);
            }
        }

        function errorAction(_, params) {
            _.error = undefined;

            _.copyParams(
                graphBase, params
            ).make(
                switchTo, graphBase.state.error
            );

            console.error((params.error));
        }

        function makeAction(actionName) {

            function action(params) {
                var _ = new GraphContext(
                    _tasker, _params.mark,
                    _transitionsMap, errorAction);

                _.enterTasker(
                    action,
                    params
                ).validateTransition(
                    graphBase.state.current(),
                    actionName
                ).validateAction(
                    params, graphBase,
                    _get(_.transition, ['validator'])
                ).copyParams(
                    graphBase.params,
                    params
                ).make(
                    switchTo,
                    _get(_.transition, ['state'])
                ).exitTasker();
            };

            return action;
        }
    };

    function buildObject(array) {
        var o = {};

        for (var i in array)
            o[array[i]] = array[i];

        return o;
    };

    function buildMap(array) {
        var map = {};

        $.each(array, function (i, o) {
            var actions = map[o[0]] = {};

            $.each(o[1], function (i, t) {
                actions[t[0]] = {
                    state: t[1],
                    validator: t[2]
                };
            });
        });

        return map;
    }

    function _get(from, path) {
        var current = from || {};

        $.each(path, function (i, segment) {
            current = current[segment];
            return current;
        });

        return current;
    }
});