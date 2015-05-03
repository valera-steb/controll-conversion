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
            'spec/native',
            'spec/ou',

            'steps/ou',
            'steps/native',
            'steps/groups'
        ], function () {
            var runner = window.GroupsRunner(window.fetureGroups, window.stepsGroups);

            for (var i in window.fetureGroups)
                runner(i);

            window.onload();
        });
    }
});