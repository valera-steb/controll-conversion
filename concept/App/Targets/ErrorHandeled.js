/**
 * Created by steb on 12.01.15.
 */
define([
    'SI/m/shared/Target'
], function (Target) {
    return function ErrorHandeled(root) {
        var
            params = {
                hasError: root.stereotypes
                    .map['hasError'].value
            },
            errorHandeled = $.extend(this,
            new Target(
                'Сбои отслежены',
                compare
            ));

        return errorHandeled;

        function compare(){
            with(params){
                return !(hasError());
            }
        }
    };
});