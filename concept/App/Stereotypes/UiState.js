/**
 * Created by steb on 12.01.15.
 */
define([
    'SI/m/shared/Stereotype'
], function (Stereotype) {
    return function Registrate(root, ou) {
        with (root.stereotypes) {
            add(new Stereotype(
                'uiIsLoading',
                ou.vm.isLoading
            ));
        }
    };
});