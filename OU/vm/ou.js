/**
 * Created by steb on 27.01.2015.
 */
define([
    'text!OU/v/ou.html'
], function(html){
    function Ou(p){
        debugger;

        var vm = $.extend(this, {
            url: ko.observable(''),
            data: ko.observable(''),
            isLoading: ko.observable(false),
            hasError: ko.observable(false)
        });

        p.parent.ou=vm;
        return vm;
    };

    return {
        viewModel: Ou,
        template: html
    };
});
