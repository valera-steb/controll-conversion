/**
 * Created by steb on 12.02.15.
 */
define([
], function () {
    return function Tasker() {
        var
            _queue = [],
            tasker = $.extend(this, {
            isWorking: ko.observable(),
            isInAction: ko.observable()
        });

        tasker.addAction = function(){

        };

        tasker.enter = function(){};

        tasker.exit = function(){};


        return tasker;
    };
});