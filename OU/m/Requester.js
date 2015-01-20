/**
 * Created by steb on 07.01.15.
 */
define([
], function () {
    return function Requester() {
        var requester = $.extend(this, {
            state: ko.observable('free'),
            oldState: '',
            params: {
                url: ko.observable(undefined)
            },
            actions: {
                load: actionLoad,
                free: actionFree
            },

            // added
            error: ko.observable(false)
        });


        window.load = function (data) {
            requester.params.data = data;
            switchState('loaded');

            //TODO: switch
            //setTimeout(actionFree, 2000);
        };
        window.cancel = function(){
            switchState('cancel');

            //TODO: switch
            //setTimeout(actionFree, 2000);
        };

        return requester;

        function actionLoad(url) {
            if(requester.state()!='free')
            return false;

            console.log('loading ', url);

            requester.params.url( url);
            switchState('loading');

            return true;
        }

        function actionFree(){
            requester.params = {
                url: requester.params.url
            };
            requester.params.url(undefined);

            switchState('free');
        }

        function switchState(newS){
            requester.oldState = requester.state();
            requester.state(newS);
        }
    };
});