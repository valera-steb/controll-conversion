/**
 * Created by steb on 25.12.14.
 */
require.config({
    paths: {
        'OU': '../OU',
        'toolBox': '../toolBox',
        'SI': '../concept/SI'
    },
    deps: [
        'conceptInfrastructure/fixtures/stereotypes',
        'conceptInfrastructure/fixtures/targets',
        'conceptInfrastructure/fixtures/comparators'
    ],
    callback: function () {
        var specs = [
            'ouS/requesterModelSpec',
            "ouS/serverModelSpec",
            'toolBoxS/graphInfrastructureSpec',

            'conceptInfrastructure/tests',
            'conceptInfrastructure/modeLoaderTests',
            'conceptInfrastructure/executorTests'
        ];

        (function getSpec(id) {
            if (id == specs.length) {
                window.onload();
                return;
            }

            require([specs[id]], function () {
                getSpec(id + 1);
            });
        })(0);
    }
});
