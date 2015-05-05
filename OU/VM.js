/**
 * Created by steb on 07.01.15.
 */
define([
    'OU/widgets'
], function () {
    return function VM(m) {
        var vm = this;
        vm.m = m;

        vm._Ou = function (c) {
            vm.ou = c;
        };

        vm._ServerModel = function (c) {
            vm.serverModel = c;
        };

        return vm;
    };
});