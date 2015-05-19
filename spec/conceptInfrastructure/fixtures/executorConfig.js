/**
 * Created on 19.05.2015.
 */
define(function () {
    var structStub = {
        targetVector: [
            {
                description: {key: 't1', name: 'ошибки отслежены'},
                f: 'f1',
                c: 'c1'
            },
            {
                description: {key: 't2', name: 'команда выполнена'},
                f: 'f2',
                c: 'c2'
            },
            {
                description: {key: 't3', name: 'вычисления выполнены'},
                f: 'f3',
                c: 'c3'
            }],
        stereotypes: {
            's1': function (root, ou) {
                return {
                    value: ou.interface.command,
                    dispose: function () {
                    }
                }
            },
            's2': function (root, ou) {
                return {
                    value: ou.interface.number,
                    dispose: function () {
                    }
                }
            },
            's4': function (root, ou) {
                var value = ko.observable(),
                    subscription = ou.core.subscribeToAccumulator(function (v) {
                        value(v);
                    });

                return {
                    value: value,
                    dispose: subscription.dispose
                };
            },
            's5': function (root, ou) {
                var value = ko.computed(ou.core.getPreviousCommand);

                return {
                    value: value,
                    dispose: value.dispose
                }
            }
        },
        functions: {
            'f1': ['s1', 's4'],
            'f2': ['s1', 's5'],
            'f3': ['s1', 's2']
        }
        },
        comparators = {

        };
});
