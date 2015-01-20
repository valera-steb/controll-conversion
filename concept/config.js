/**
 * Created by steb on 10.01.15.
 */
require.config({
    paths: {
        'OU': '../OU',
        SI: 'SI',
        App: 'App'
    },
    callback: function () {
        require([
            'OU/M', 'OU/VM',
            'App/Root'
        ], function (M, VM, Root) {
            var
                m = new M(),
                vm = new VM(m),
                root = new Root({m: m, vm: vm});

            ko.applyBindings(vm, document.getElementById('ou'));
            root.additional.makeUi(document.getElementById('si'));
        })
    }
});