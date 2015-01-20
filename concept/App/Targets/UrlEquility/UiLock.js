/**
 * Created by steb on 12.01.15.
 */
define([
    'SI/m/shared/Target'
], function (Target) {
    return function UiLock() {
        var
            params = {
                isLoading: root.stereotypes
                    .map['isLoading'].value,
                uiUrl: root.stereotypes
                    .map['uiUrl'].value,
                loadingUrl: root.stereotypes
                    .map['loadingUrl'].value
            },
            uiLock = $.extend(this,
                new Target(
                    'loadingUrl == uiUrl, пока isLoading',
                    compare
                ));

        return uiLock;

        function compare() {
            with(params){
                var
                    e = loadingUrl() == uiUrl(),
                    l = isLoading();
                return l ? e : true;
            }
        }
    };
});