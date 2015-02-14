/**
 * Created by steb on 07.01.15.
 */
define([
], function () {
    return function UrlController(requester) {
        var urlController = $.extend(this, {
            current: ko.observable(''),

            setUrl: function setUrl(url) {
                if (urlController.current() == url)
                    return false;

                requester.actions.get({url: url});
            },
            setLoadedUrl: function (params) {
                urlController.current(params.fail ? '' : params.url);
            }
        });

        return urlController;
    };
});