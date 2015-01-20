/**
 * Created by steb on 07.01.15.
 */
require.config({
    paths:{
        'OU':'OU'
    },
    callback:function(){
        require(['OU/M', 'OU/VM'], function(M, VM){
            var
                m = new M(),
                vm = new VM(m);

            ko.applyBindings(vm);
        })
    }
});
