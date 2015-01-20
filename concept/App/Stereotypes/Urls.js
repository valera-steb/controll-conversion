/**
 * Created by steb on 10.01.15.
 */
define([
    'SI/m/shared/Stereotype'
], function (Stereotype) {
    return function Registrate(root, ou) {
        with (root.stereotypes) {
            add(new Stereotype(
                'uiUrl',
                ou.vm.url
            ));
            add(new Stereotype(
                'loadedUrl',
                ou.m.urlController.current
            ));
            // бывший > loadingUrl = o.requester.params.url
            add(new Stereotype(
                'loadingUrl',
                ou.m.requester.params.url
                //ko.observable(undefined)
            ));
        }

    };
});