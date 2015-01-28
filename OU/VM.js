/**
 * Created by steb on 07.01.15.
 */
define([
    'OU/widgets'
], function () {
    return function VM(m) {
        var vm = $.extend(this, {
            url: ko.observable(''),
            data: ko.observable(''),
            isLoading: ko.observable(false),
            hasError: ko.observable(false)
        });

        // уйдёт
        /*vm.url.subscribe(function (v) {
         var loading = m.urlController.setUrl(v);

         if(!loading){
         vm.hasError(true);
         setTimeout(revertUrl, 500);
         }
         });
         */
        // уйдёт
        /*      m.requester.state.subscribe(function (s) {
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
         });*/

        return vm;

        function revertUrl() {
            vm.url(m.urlController.current());
            vm.hasError(false);
        }
    };
});