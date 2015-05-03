/**
 * Created by steb on 10.02.2015.
 */

define([

], function () {
    return function VM(m, vm) {
        var
            _Ou = vm._Ou;

        vm._Ou = function(c){
            _Ou(c);
            initOu();
        };

        return vm;

        function initOu() {
            vm.ou.url.subscribe(function (v) {
            });


//TODO: перестроить под новый Requester
//            m.requester.state.subscribe(function (s) {
//                vm.isLoading(s != 'free');
//                var key = m.requester.oldState + '_' + s;
//
//                switch (key) {
//                    case ('loading_loaded'):
//                        vm.data(JSON.stringify(m.requester.params.data));
//                        break;
//                    case ('loading_cancel'):
//                        // revert url
//                        revertUrl();
//                        break;
//                }
//            });
        }

    };
});
