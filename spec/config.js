/**
 * Created by steb on 18.02.2015.
 */
require.config({
    baseUrl: 'functional/',
    deps: ['../../lib/browsered-jasmine-cucumber'],
    paths: {
        'OU': '../../OU',
        'toolBox': '../../toolBox',
        'native': '../../native',
        'text':'../../lib/requirejs/text'
    },

    callback: function () {
        require([
            'browsered-jasmine-cucumber',
            //'spec/native',
            'spec/conceptInfrastructure',

            'steps/groups',
            'steps/sendRequest',
            'steps/cancelSentRequest',
            'steps/serverFallDown'
        ], function () {
            var runner = window.GroupsRunner(window.fetureGroups, window.stepsGroups);

            for (var i in window.fetureGroups)
                runner(i);

            window.onload();
        });
    }
});