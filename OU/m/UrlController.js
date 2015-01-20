/**
 * Created by steb on 07.01.15.
 */
define([
], function () {
    return function UrlController(m) {
        var urlController = $.extend(this, {
            current: ko.observable(''),

            setUrl: setUrl
        });

        // уйдёт, станет прямым вызовом установки от СУ
        m.requester.state.subscribe(function (s) {
            if (s != 'loaded')
                return;
            //TODO: add switch
            //urlController.current(m.requester.params.url());
        });

        return urlController;

        function setUrl(url) {
            if (urlController.current() == url)
                return false;

            return m.requester.actions.load(url);
        }
    };
});