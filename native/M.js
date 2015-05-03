/**
 * Created by steb on 10.02.2015.
 */
define([

], function(){
    return function M(m) {

        with (m.requester.subscribe) with (m.requester.state.all) {
            // for requester
            onEnterToStates([canceled, loaded], function () {
                m.requester.actions.free();
            });

            // for urlController
           onEnterState(loaded, m.urlController.setLoadedUrl);
        }

        m.lunchLoading = function(url){
            var loading = m.urlController.setUrl(v);

            if (!loading) {
                vm.hasError(true);
                setTimeout(revertUrl, 500);
            }

        };

        return m;


        function revertUrl() {
            vm.url(m.urlController.current());
            vm.hasError(false);
        }
    };
});
