/**
 * Created by steb on 25.12.14.
 */
require.config({
    paths: {
        'OU': '../OU'
    },
    callback: function () {
        var specs = [
            "ouS/serverModelSpec"
        ];

        require(specs, function () {
            window.onload();
        });
    }
});
