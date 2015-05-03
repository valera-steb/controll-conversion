/**
 * Created by steb on 19.02.2015.
 */
groupSteps('нативная реализация')
    .before(function (ctx) {
        var
            done = ctx.async(),
            featureCtx = this;

        require(['OU/M', 'OU/VM',
                'native/M', 'native/VM',
                'text!native/vm.html'],
            function(M, VM, nativeM, nativeVM, html){
            var
                m = new M(),
                vm = new VM(m);

            m = new nativeM(m);

            featureCtx.m = m;
            featureCtx.vm = new nativeVM(m, vm);

            featureCtx.jUi = $(
                '<div>{0}</div>'.format(html)
            );
            $('body').append(featureCtx.jUi);
            ko.applyBindings(vm, featureCtx.jUi[0]);
            setTimeout(done, 200);
        })
    })
    .after(function(ctx){
        //debugger;
        this.jUi.remove();
    });