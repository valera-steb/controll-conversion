/**
 * Created on 29.05.2015.
 */
/*
 нужен что-бы делать задержку/timeout на переходах ExecutorGraph-а
 должен:
 .отслеживать смену режима
 .уметь форсировать переходы - любые либо только избранные.
 .может предоставлять свой UI.

 ?:
 .обобщать ли ответственность, делая конфиг для запуска событий
 * /

var itoExecutor = {
    to: {
        mode: ko.observable({}),
        state: ko.observable(),
        states: {},
        actions: {} // GraphActions
    },
    from: {
        force: {
            action: fStub,
            'actionName': fStub
        },
        call: {
            'actionName': fStub
        }
    }
};

var internalStructure = {
    pendingAction: {
        name: 'onComparatorChange',
        params: []
    }
};
/*
 может добавить конфиг, в котором будет
 .'имя действия':функция_инициализатор
 .функция оборачивает себя по имени и возвращает функцию исполнителя.
 */
define(function () {
    return function Delayer(iExecutor) {
        var
            d = this,
            pendingAction,
            timeout;

        d.call = {
            'onComparatorChange': function (params) {
                var actionName = 'onComparatorChange';

                if (isNotInState(iExecutor.states.watching, actionName, params))
                    return;

                tryCreate(actionName, params);
            },

            'controlImpactFree': function (params) {
                var actionName = 'controlImpactFree';

                if (isNotInState(iExecutor.states.applying, actionName, params))
                    return;

                tryCreate(actionName, params);
            }
        };

        d.force = {
            action: function () {
                if (!pendingAction)
                    return;

                clearTimeout(timeout);
                execute();
            }
        };

        return d;

        function isNotInState(state, actionName, params) {
            var isNot = iExecutor.state() != state;

            if (isNot)
                iExecutor.actions[actionName](params);

            return isNot;
        }

        function tryCreate(actionName, params) {
            if (pendingAction) {
                if (pendingAction.name == actionName)
                    return;

                throw new Error("Can`t change wating method. Current: {0}, new: {1}"
                    .format(pendingAction.name, actionName));

            }

            pendingAction = {
                name: actionName,
                params: params
            };

            initTimeout();
        }

        function initTimeout() {
            var mode = iExecutor.mode().delayer;

            switch (mode.type) {
                case('RealTime'):
                    execute();
                    break;

                case('Delayed'):
                    timeout = setTimeout(execute, mode.timeout);
                    break;

                case('Optional'):
                    // enumerate impact items
                    break;

                default:
                    throw new Error('No type {0}'.format(mode.type));
            }
        }

        function execute() {
            iExecutor.actions[pendingAction.name](pendingAction.params);

            timeout = undefined;
            pendingAction = undefined;
        }
    };
});
