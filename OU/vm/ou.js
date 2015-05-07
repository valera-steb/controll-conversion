/**
 * Created by steb on 27.01.2015.
 */
define([
    'text!OU/v/ou.html'
], function (html) {
    function Ou(p) {
        var vm = $.extend(this, {
            url: p.m.urlController.currentUrl,
            data: ko.observable(''),

            isLoading: ko.observable(false),
            isCanceling: ko.observable(false),

            hasError: ko.observable(false)
        });

        vm.setUpLS = function (ls) {
            vm.lockScreen = ls;
        };
        vm.cancel = function () {
            vm.isCanceling(true);
            //TODO: это тоже не тут...
            p.m.requester.actions.cancel();
        };

        makeSubscriptions(vm, p.m);

        p.setUp(vm);
        return vm;
    };

    return {
        viewModel: Ou,
        template: html
    };

    function makeSubscriptions(vm, m) {
        with (m.requester.subscribe) with (m.requester.state.all) {
            onTransition(free, loading, loadingStarted);
            onEnterState(loaded, setNewData);
            onEnterState(canceled, cleanData);
            onTransition(canceling, loading, showCancelButton);
        }

        // handlers
        function loadingStarted() {
            vm.isLoading(true);
        }

        function setNewData(params) {
            vm.isLoading(false);
            vm.data(params.data);
        }

        function cleanData() {
            vm.data('');
            vm.isLoading(false);
            vm.isCanceling(false);
        }

        function showCancelButton(){
            vm.isCanceling(false);
        }
    }
});
