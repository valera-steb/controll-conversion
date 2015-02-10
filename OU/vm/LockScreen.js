/**
 * Created by steb on 10.02.2015.
 */
define([
    'text!OU/v/lock_screen.html'
], function(html){
    function LockScreen(p){
        var _ls = $.extend(this, {
            message: ko.observable(''),
            isVisible: ko.observable(false)
        });

        _ls.show = function(msg){
            _ls.message(msg);
            _ls.isVisible(true);
        };

        _ls.hide = function(){
            _ls.message('');
            _ls.isVisible(false);
        };

        p.setUpLS(_ls);

        return _ls;
    }

    return {
        viewModel: LockScreen,
        template: html
    };
});
