/**
 * Created on 19.05.2015.
 */
define([], function(){
    return function MappedList(){
        var mp = this;

        mp.map = {};
        mp.list =  ko.observableArray([]);

        mp.add = function(key, item){
            mp.map[key] = item;
            mp.list.push(item);
        };

        mp.removeByKey = function(key){
            var item = mp.map[key];
            mp.list.remove(item);
        }
    }
});
