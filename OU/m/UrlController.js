/**
 * Created by steb on 07.01.15.
 */
define([], function () {
    return function UrlController(requester) {
        var urlController = $.extend(this, {
            currentUrl: ko.observable(),
            loadingUrl: ko.observable()
        });

        urlController.currentUrl.subscribe(function (newUrl) {
            var
                loadingUrl = urlController.loadingUrl(),
                hasNewUrl = newUrl != '' && newUrl != undefined;

            if (loadingUrl == undefined) {
                if (!hasNewUrl)
                    return;

                urlController.loadingUrl(newUrl);
            }
            else
                urlController.currentUrl(loadingUrl);
        });

        return urlController;
    };
});