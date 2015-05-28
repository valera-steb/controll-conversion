/**
 * Created by steb on 20.12.14.
 */
define([
], function () {
    var ids_count = 0;

    return function DelegatesMap() {
        var delegatesMap = $.extend(this, {
                exceptions: ko.observableArray([])
            }),
            map={};

        delegatesMap.add = function(key, delegate, context){
            ids_count ++;
            var delegates = map[key] || (map[key] = []);

            delegates.push({action:delegate, ctx:context, id: ids_count});

            return new relation(key, ids_count);
        };

        delegatesMap.activate = function(key, params, newState){
            var delegates = map[key];

            if(delegates != undefined){
                $.each(delegates, function(i, d){
                    try {
                        d.action.call(d.ctx, params, newState);
                    }
                    catch (exception){
                        console.error('Exception in handler', exception);

                        delegatesMap.exceptions.push({
                            delegate: d,
                            exception: exception
                        });
                    }
                });
            }
        };

        return delegatesMap;



        function relation(key, id){
            var relation = this;

            relation.remove = function(){
                var delegates = map[key];

                removeItem(delegates, id);
            };

            return relation;
        };

        function removeItem(array, id){
            for(var i in array){
                if(array[i].id==id){
                    array.splice(i,1);
                    break;
                }
            }
        };
    };
});
