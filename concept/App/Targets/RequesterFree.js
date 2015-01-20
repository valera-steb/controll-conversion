/**
 * Created by steb on 15.01.15.
 */
define([
    'SI/m/shared/Target'
], function (Target) {
    return function RequesterFree() {
        var params = {
                requesterState: root.stereotypes
                    .map['requesterState'].value
            },
            requesterFree = $.extend(this,
                new Target(
                    'requesterState == free',
                    compare
                )
            );

        return requesterFree;

        function compare() {
            return params.requesterState() == 'free';
        }

    };
});