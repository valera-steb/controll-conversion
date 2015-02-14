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
        require(['OU/M', 'OU/VM', 'native/M'], function(M, VM, nativeM){
            var
                m = new M(),
                vm = new VM(m);

            new nativeM(m);

            ko.applyBindings(vm);
        })
    }
});
