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
            "ouS/serverModelSpec",
            'toolBoxS/graphInfrastructureSpec'
        ];

        require(specs, function () {
            window.onload();
        });
    }
});
