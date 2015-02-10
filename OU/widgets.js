/**
 * Created by steb on 27.01.2015.
 */
define(['text!OU/v/styles.css'], function (css) {
    ko.components.register('ou-w', {require: 'OU/vm/ou'});
    ko.components.register('server-model', {require: 'OU/vm/serverModel'});
    ko.components.register('lock-screen', {require: 'OU/vm/LockScreen'});

    $('head').append('<style>' + css + '</style>');
});