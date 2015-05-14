/**
 * Created on 13.05.2015.
 */
define({
    loading: {
        stereotypes: [
            {
                key: 's1', path: 'App/stereotypes/_01_hasCommand',
                name: 'введена команда'
            },
            {
                key: 's2', path: 'App/stereotypes/_02_numberChanged',
                name: 'введено число'
            },
            {
                key: 's4', path: 'App/stereotypes/_04_failed',
                name: 'результат вычисления NaN'
            },
            {
                key: 's5', path: 'App/stereotypes/_05_previousCommand',
                name: 'предыдущая команда'
            },

            {
                key: 'c1', path: 'App/comparators/_01_hasError',
                params: ['s4']
            },
            {
                key: 'c2', path: 'App/comparators/_02_hasCommand',
                params: ['s2']
            },
            {
                key: 'c3', path: 'App/comparators/_03_hasTask',
                params: ['s2']
            }
        ],
        targets: [
            {key: 't1', name: 'ошибки отслежены'},
            {key: 't2', name: 'команда выполнена'},
            {key: 't3', name: 'вычисления выполнены'}
        ],
        functions: [
            {
                key: 'f1', name: 'исправление ошибок',
                path: '',
                params: ['s1', 's4']
            },
            {
                key: 'f2', name: 'выполнение команды',
                path: '',
                params: ['s1', 's5']
            },
            {
                key: 'f3', name: 'выполнение вычислений',
                path: '',
                params: ['s1', 's2']
            }
        ],
        modes: [
            {
                key: 'm1', name: 'base',
                vector: [
                    {target: 't1', function: 'f1', comparator: 'c1'},
                    {target: 't2', function: 'f2', comparator: 'c2'},
                    {target: 't3', function: 'f3', comparator: 'c3'}
                ]
            }
        ]
    },
    settings: {
        initialMode: 'm1',

        //режим применения управляющего воздействия: авто
        executionMode: 'auto'
    }
});