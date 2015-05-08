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
                'text!native/vm.html', 'helper'],
            function (M, VM, nativeM, nativeVM, html, helper) {
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
                helper.waitOnce(done);
            })
    })
    .given('инициализированный объект', function () {
        expect(this.m).toBeDefined();
        expect(this.vm).toBeDefined();
    })
    .when('ввели урл "(.*)"', function (url) {
        this.vm.ou.url(url);
    })
    .when('клиент отменил запрос', function () {
        this.vm.ou.cancel();
    })
    .when('сервер _(.*)_', function (action) {
        var withData = 'ответил с данными';

        expect(['отклонил', withData]).toContain(action);

        if (action == withData) {
            this.vm.serverModel.data('data');
            this.vm.serverModel.send()
        }
        else
            this.vm.serverModel.makeError();
    })
    .then('запрос закончен _(.*)_', function (data) {
        var withData = 'с данными';

        expect(['без данных', withData]).toContain(data);

        expect(this.vm.ou.isCanceling()).toBeFalsy();
        expect(this.vm.ou.isLoading()).toBeFalsy();
        expect(this.vm.serverModel.hasRequest()).toBeFalsy();

        if (data == withData)
            expect(this.vm.ou.data()).toBe('data');
    })
    .after(function (ctx) {
        this.jUi.remove();
    });