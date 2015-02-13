/**
 * Created by steb on 12.02.15.
 */
define([
    ], function () {
        function Tasker() {
            var
                _queue = [],
                tasker = $.extend(this, {
                    isWorking: ko.observable(false),
                    isInAction: ko.observable(false),

                    queueLength: ko.observable(0),
                    error: ko.observable(undefined)
                });

            tasker.addAction = function (action, params, mark) {
                if (!mayAdd())
                    return;

                _queue.push({action: action, params: params});
                tasker.queueLength(_queue.length);
            };

            tasker.enter = function () {
                if (!mayEnter())
                    return;

                tasker.isInAction(true);
                tasker.isWorking(true);
            };

            tasker.exit = function () {
                if (!mayAct()) return;

                tasker.isInAction(false);

                var
                    item = popItem();
                if (item)
                    item.action(item.params);
                else
                    tasker.isWorking(false);
            };

            tasker.clean = function () {
                with (tasker){
                    _queue = [];

                    isWorking(false);
                    isInAction(false);
                    queueLength(0);
                    error(undefined);
                }
            };


            return tasker;


            function popItem() {
                var
                    item = _queue.pop();

                if (item)
                    tasker.queueLength(_queue.length);

                return item;
            }

            function mayAdd() {
                if (!mayAct())
                    return false;

                if (tasker.isInAction())
                    return true;

                tasker.error(Tasker.errors.add);
                return false;
            }

            function mayEnter() {
                if (!mayAct())
                    return false;

                if (!tasker.isInAction())
                    return true;

                tasker.error(Tasker.errors.enter);
                return false;
            }

            function mayAct() {
                var mayNot = tasker.error();

                if (mayNot)
                    tasker.error(Tasker.errors.reError);

                return !mayNot;
            }
        };

        Tasker.errors = {
            add: 'Нельзя добавить событие в очередь, если таскер свободен',
            enter: 'Нельзя озадачить озадаченный таскер',
            reError: 'Нельзя пользоваться таскером с ошибкой'
        };

        return Tasker;
    }
);
