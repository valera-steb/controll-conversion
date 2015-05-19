/**
 * Created on 19.05.2015.
 */
define(function () {
    return function (files, callback, prefix) {
        var
            deferred = new $.Deferred(),
            added = files.length;
        prefix = prefix || '';

        for (var i in files) {
            var item = files[i];

            require([prefix + item.path], makeCallback(item));
        }

        return deferred.promise();

        function makeCallback(item) {
            return function (c) {
                callback(c, item);

                added--;
                if (added < 1)
                    deferred.resolve();
            }
        }
    }
});
