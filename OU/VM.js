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

            //TODO: вынести в native
            c.url.subscribe(
                m.urlController.setUrl
//TODO: обдумать, чья ответственность блокировать ввод урл во время загрузки
//                function (newValue) {
//                    if (!m.urlController.setUrl(newValue))
//                        c.url(m.urlController.current());
//                }
            );
        };

        vm._ServerModel = function (c) {
            vm.serverModel = c;
        };

        return vm;
    };
});