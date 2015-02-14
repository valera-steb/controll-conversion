/**
 * Created by steb on 07.01.15.
 */
define([
    'OU/m/Requester/Model',
    'OU/m/UrlController',
    'toolBox/automate/Tasker'
], function (Requester, UrlController, Tasker) {
    return function M() {
        var m = this;
        m.tasker = new Tasker();
        m.requester = new Requester(m.tasker);
        m.urlController = new UrlController(m.requester);

        return m;
    };
});