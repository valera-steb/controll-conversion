/**
 * Created by steb on 15.01.15.
 */
define([
], function () {
    return function TFunction(controlImpactApplier, params, ou) {
        var tFunction = $.extend(this, {
            description: {
                name: params.name
            },
            calculate: calculate
        });

        return tFunction;


        function calculate(stateSnapshot) {
            var
                controlImpact;

            try {
                controlImpact = params.calculate(stateSnapshot, ou);
            }
            catch (e) {
                //TODO: а что если функция вызвала исключение?
                //по идее управляющее воздействие и тут может быть
                //но оно пока сложно определимо...
            }

            return controlImpact;
        }
    };
});