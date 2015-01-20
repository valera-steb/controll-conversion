/**
 * Created by steb on 10.01.15.
 */
define([
], function () {
    return function Stereotype(name, object) {
        var stereotype = $.extend(this, {
            name: name,
            value: object
        });

        return stereotype;
    };
});