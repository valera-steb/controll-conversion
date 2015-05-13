/**
 * Created on 13.05.2015.
 */
define({
    loading: {
        stereotypes: [
            'App/stereotypes/_01_hasCommand',
            'App/stereotypes/_02_numberChanged',
            'App/stereotypes/_04_failed',
            'App/stereotypes/_05_previousCommand'
        ],
        targets: [
            {path: 'App/...', stereotype: 'name'}
        ],
        functions: [
            'App/...'
        ],
        modes: [
            {
                path: 'App/modes/initial',
                targets: [
                    {name: '01', function: 'f1'}
                ]
            }
        ]
    },
    settings: {
        initialMode: 'name',

        //режим применения управляющего воздействия: авто
        executionMode: 'auto'
    }
});