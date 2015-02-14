/**
 * Created by steb on 25.12.14.
 */
require.config({
    paths: {
        'OU': '../OU',
        'toolBox': '../toolBox'
    },
    callback: function () {
        var specs = [
            'ouS/requesterModelSpec',
            "ouS/serverModelSpec",
            'toolBoxS/graphInfrastructureSpec'
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
