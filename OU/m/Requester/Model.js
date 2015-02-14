/**
 * Created by steb on 13.02.2015.
 */
define([
    'OU/m/Requester/Graph',
    'toolBox/automate/GraphBase',
    'OU/m/Server'
], function (graph, GraphBase, Server) {
    return function Create(tasker) {
        function Requester(){
            this.server = new Server();
        };
        Requester.prototype = new GraphBase(tasker, graph);
        var requester = new Requester();

        with (requester.subscribe) with (requester.state.all) {
            onTransition(free, loading, lunchLoading);
            onEnterToStates([canceled, free], cleanParams);

            onTransition(loading, canceling, callCancel);
        }


        return requester;


        // handlers
        function lunchLoading(params) {
            requester.server.get(params.url)
                .done(function (data) {
                    requester.actions.any({data: data});
                })
                .fail(function () {
                    requester.actions.any({fail: true});
                });
        }

        function callCancel() {
            requester.server.cancel()
                .done(requester.actions.done)
                .fail(requester.actions.fail);
        }


        function cleanParams() {
            Requester.prototype.params = {};
        }
    };
});
