/**
 * Created by steb on 12.01.15.
 */
define([
    'SI/m/shared/Target'
], function (Target) {
    return function UrlEquility(root) {
        var
            params = {
                loadedUrl: root.stereotypes
                    .map['loadedUrl'].value,
                uiUrl: root.stereotypes
                    .map['uiUrl'].value
            },
            urlEquility = $.extend(this,
                new Target(
                    'loadedUrl == uiUrl',
                    compare
                )
            );

        return urlEquility;

        function compare() {
            with (params) {
                var x =
                    ko.unwrap(loadedUrl) == ko.unwrap(uiUrl);
                return x;
            }
        }
    };
});