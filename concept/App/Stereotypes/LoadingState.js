/**
 * Created by steb on 10.01.15.
 */
define([
    'SI/m/shared/Stereotype'
], function (Stereotype) {
    return function Registrate(root, ou) {
        with (root.stereotypes) {
            add(new Stereotype(
                'isLoading',
                ko.computed(makeIsLoading(
                    ou.m.requester.state))
            ));
            add(new Stereotype(
                'requesterState',
                ou.m.requester.state
            ));

            add(new Stereotype(
                'hasError',
                ou.m.requester.error
            ));
        }

        function makeIsLoading(object) {
            return function () {
                var
                    requesterState = object();

                return requesterState != 'free';
            };
        }
    };
});
