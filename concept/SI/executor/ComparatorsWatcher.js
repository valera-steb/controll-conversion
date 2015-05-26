/**
 * Created on 25.05.2015.
 */
/*
 часть исполнителя
 отлавливает момент изменения компараторов:
 .изменения, либо выхода за пределы?
 контролирует, что всех компораторов отслеживаем
 */
define(function () {
    return function (pulseCallback) {
        var
            cw = this,
            disposableMap = {};

        cw.addComparator = function (comparator) {
            var
                disposable = comparator.value.subscribe(onChange);

            disposableMap[comparator.key] = disposable;
        };

        cw.removeComparatorByKey = function (key) {
            var disposable = disposableMap[key];

            if (disposable == undefined)
                return;

            delete disposableMap[key];
            disposable.dispose();
        };

        cw.clear = function () {
            for (var i in disposableMap) {
                disposableMap[i].dispose();
            }

            disposableMap = {};
        };

        return cw;


        function onChange(newValue) {
            if (newValue)
                pulseCallback();
        }
    }
});
