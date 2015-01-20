/**
 * Created by steb on 07.01.15.
 */
define([
    'OU/m/Requester',
    'OU/m/UrlController'

], function (Requester, UrlController) {
    return function M() {
        var m = $.extend(this, {
            urlController: undefined,
            requester: new Requester()
        });

        m.urlController = new UrlController(m);

        return m;
    };
});