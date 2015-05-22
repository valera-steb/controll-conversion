/**
 * Created on 19.05.2015.
 */
define([],
    function () {
        return function (root, ou) {
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
                        'f1': {
                            params: ['s1', 's4'],
                            execute: function (p) {
                                var sum = 0;
                                sum += (p.s1 == 'reset') ? 1 : 0;
                                sum += isNaN(p.s4) ? 2 : 0; // accumulator == NaN?

                                if (sum == 3)
                                    return {
                                        path: 'ou.core.setUp',
                                        params: 0
                                    };
                            }
                        },
                        'f2': {
                            params: ['s1', 's5'],
                            execute: function (p) {
                            }
                        },
                        'f3': {
                            params: ['s1', 's2'],
                            execute: function (p) {
                            }
                        }
                    }
                },
                comparators = {
                    'c1': {
                        deps: ['s1', 's4'],
                        calculate: function (p) {
                            return isNaN(p.s4);
                        }
                    },
                    'c2': {
                        deps: ['s2'],
                        calculate: function (p) {
                        }
                    },
                    'c3': {
                        deps: ['s2'],
                        calculate: function (p) {
                        }
                    }
                };


            enumerate(structStub.stereotypes, function (x, st) {
                return st(root, ou);
            });

            enumerate(comparators, ComparatorConstructor);
            enumerate(structStub.functions, FunctionConstructor);

            enumerate(structStub.targetVector, function (x, target) {
                return {
                    description: target.description,
                    f: structStub.functions[target.f],
                    c: comparators[target.c]
                }
            });

            return structStub;


            function enumerate(list, Constructor) {
                for (var i in list) {
                    list[i] = new Constructor(
                        structStub.stereotypes,
                        list[i]
                    )
                }
            }
        };

        function ComparatorConstructor(stereotypesMap, params) {
            var computed = ko.computed(calculate);

            return {
                value: computed,
                dispouse: computed.dispose
            };

            function calculate() {
                var values = getValues(params.deps, stereotypesMap);

                return params.calculate(values);
            }
        }

        function FunctionConstructor(stereotypesMap, params) {
            return function () {
                var values = getValues(params.params, stereotypesMap);

                return params.execute(values);
            }
        }

        function getValues(stereotypes, stereotypesMap) {
            var obj = {};

            stereotypes.forEach(function (item) {
                obj[item] = ko.unwrap(stereotypesMap[item].value());
            });

            return obj;
        }
    });
