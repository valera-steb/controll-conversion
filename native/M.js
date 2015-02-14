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
    };
});
