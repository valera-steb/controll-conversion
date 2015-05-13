/**
 * Created on 13.05.2015.
 */
define('App/stereotypes/_01_hasCommand', [
    'SI/m/shared/Stereotype'
], function (Stereotype) {
    return function _01_hasCommand(root, ou) {
        return new Stereotype(
            '01.has command',
            ou.interface.command
        );
    }
});

define('App/stereotypes/_02_numberChanged', [
    'SI/m/shared/Stereotype'
], function (Stereotype) {
    return function _02_numberChanged(root, ou) {
        //var number =
        //TODO: проверить, что точно есть оповещение если 2 одинаковых числа ввести
        return new Stereotype(
            '03.number is changed',
            ou.interface.number
        );
    }
});

define('App/stereotypes/_04_failed', [
    'SI/m/shared/Stereotype'
], function (Stereotype) {
    return function _04_failed(root, ou) {
        var value = ko.observable();

        ou.core.subscribeToAccumulator(value);

        return new Stereotype(
            '04.accumulator is NaN',
            value
        );
    }
});

define('App/stereotypes/_05_previousCommand', [
    'SI/m/shared/Stereotype'
], function (Stereotype) {
    return function _05_previousCommand(root, ou) {
        return new Stereotype(
            '05.previousCommand',
            ko.computed(ou.core.getPreviousCommand)
        );
    }
});

/*
define('App/stereotypes/_03_failed', [
    'SI/m/shared/Stereotype'
], function (Stereotype) {
    return function _03_failed(root, ou) {
        return new Stereotype(
        );
    }
});
*/