/**
 * Created by steb on 10.01.15.
 */
define([], function () {
    return function Stereotype(params, custom) {
        var stereotype = $.extend(this, {
            name: params.name,
            create: create
        });

        return stereotype;

        function create(root, ou) {
            return (params.params == undefined)
                ? createStereotype(root, ou)
                : createComparator(root.state); //TODO: карта думаю будет глубже
        }


        //todo: test function
        function createComparator(map) {
            var
                comparator = new custom(),
                linked = ko.computed(wrapper);

            return {
                value: linked,
                dispose: function(){
                    comparator.dispose();
                    linked.dispose();
                }
            };

            function wrapper() {
                var unwrappedParams = createComputed(
                    params.params, map);

                return comparator.calculate(unwrappedParams);
            }
        }

        function createStereotype(root, ou) {
            var s = new custom(root, ou);
            s.name = params.name;
            return s;
        }


        function createComputed(stereotypes, map) {
            var obj = {};

            stereotypes.forEach(function (item) {
                obj[item] = ko.unwrap(map[item].value());
            });

            return obj;
        }
    };
});