/**
 * Created by steb on 10.02.2015.
 */

define([

], function () {
    return function VM(m, vm) {
        vm.url.subscribe(function (v) {
            var loading = m.urlController.setUrl(v);

            if (!loading) {
                vm.hasError(true);
                setTimeout(revertUrl, 500);
            }
        });
        m.requester.state.subscribe(function (s) {
            vm.isLoading(s != 'free');
            var key = m.requester.oldState + '_' + s;

            switch (key) {
                case ('loading_loaded'):
                    vm.data(JSON.stringify(m.requester.params.data));
                    break;
                case ('loading_cancel'):
                    // revert url
                    revertUrl();
                    break;
            }
        });

        function revertUrl() {
            vm.url(m.urlController.current());
            vm.hasError(false);
        }
    };
});
