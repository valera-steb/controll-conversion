/**
 * Created by steb on 07.01.15.
 */
define([
    'OU/widgets'
], function () {
    return function VM(m) {
        var vm = this;

        vm.setUpOu = function (c) {
            vm.ou = c;
        };

        return vm;
    };
});