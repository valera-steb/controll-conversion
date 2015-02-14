/**
 * Created by steb on 12.02.15.
 */
define([
    'toolBox/stringUtils'
], function () {
    function GraphContext(tasker, mark, map, makeError) {
        var _ = $.extend(this, {
            enteredTasker: undefined,
            error: undefined,
            transition: undefined
        });

        _.clean = function () {
            with (_) {
                enteredTasker =
                    error =
                        transitions =
                            undefined;
            }
            return _;
        };

        _.enterTasker = function (action, params) {
            _.enteredTasker = !tasker.isInAction();

            if (_.enteredTasker)
                tasker.enter();
            else
                tasker.addAction(action, params, mark);

            return _;
        };

        _.validateTransition = function (state, action) {
            if (isNotSuccess())
                return _;

            _.transition = map[state]
                ? map[state][action]
                : undefined;

            if (_.transition === undefined)
                _.error = GraphContext.errors.hasNoTransition
                    .format(state, action);

            return _;
        };

        _.validateAction = function (params, graph, validator) {
            if (isNotSuccess())
                return _;

            if (validator && !validator(params, graph))
                _.error = GraphContext.errors.validationError;

            return _;
        };

        _.copyParams = function (current, added) {
            if (isNotSuccess())
                return _;

            if (added)
                for (var i in added)
                    current[i] = added[i];

            return _;
        };

        _.make = function (switchTo, state) {
            if (!isNotSuccess())
                switchTo(state);

            return _;
        };

        _.exitTasker = function () {
            if (_.enteredTasker) {
                if (_.error)
                    makeError(_, {error: _.error});

                tasker.exit();
            }

            return _;
        };


        return _;


        function isNotSuccess() {
            return _.error || _.enteredTasker === false;
        }
    };

    GraphContext.errors = {
        hasNoTransition: 'из состояния [{0}] нет перехода по методу [{1}]',
        validationError: 'валидатор графа не пропустил'
    };

    return GraphContext;
});