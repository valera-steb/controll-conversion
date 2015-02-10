/**
 * Created by steb on 07.01.15.
 */
require.config({
    paths:{
        'OU':'OU',
        'text': 'lib/requirejs/text'
    },
    callback:function(){
        //факт: есть ответственность всех создать в самом начале
        require(['OU/M', 'OU/VM'], function(M, VM){
            var
                m = new M(),
                vm = new VM(m);

            window.vm = vm;

            ko.applyBindings(vm);
        })
    }
});
