/**
 * Created by steb on 16.01.15.
 */
define([
], function () {
    return function ObjectTree(item, name) {
        var
            isObservable = ko.isObservable(item),
            objectTree = $.extend(this, {
                expand: expand,
                value: getValue(),
                name: name,
                type: isObservable
                    ? 'ko.observable'
                    : item.constructor.name,
                items: ko.observable([])
            });

        return objectTree;

        function expand() {
            if (objectTree.items().length)
                objectTree.items([]);
            else
                objectTree.items(
                    $.map(
                        isObservable
                            ? item()
                            : item,
                        function (i, n) {
                            return new ObjectTree(i, n);
                        })
                );
        }

        function getValue() {
            var
                _item = isObservable ? item() : item,
                notObject = typeof _item != 'object';

            return (_item && notObject)
                ? _item.toString().replace(/\n+/g, '<br/>')
                : null;
        }
    };
});