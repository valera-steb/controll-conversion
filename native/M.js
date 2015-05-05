/**
 * Created by steb on 10.02.2015.
 */
define([], function () {
    return function M(m) {

        with (m.requester.subscribe) with (m.requester.state.all) {
            // for requester
            onEnterToStates([canceled, loaded], function () {
                m.urlController.loadingUrl(undefined);
                m.requester.actions.free();
            });
        }

        m.urlController.loadingUrl.subscribe(function (newUrl) {
            if (newUrl == undefined || newUrl == '')
                return;

            m.requester.actions.get({url: newUrl});
        });

        return m;


        function revertUrl() {
            vm.url(m.urlController.current());
            vm.hasError(false);
        }
    };
});
