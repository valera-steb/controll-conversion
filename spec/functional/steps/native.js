/**
 * Created by steb on 19.02.2015.
 */
featureSteps('отправка запроса')
    .then('пошла загрузка', function () {
        expect(this.vm.ou.isLoading()).toBeTruthy();
    })
    .then('урл будет "(.*)"', function (url) {
        expect(this.vm.ou.url()).toBe(url);
    });


featureSteps('отмена отправленного запроса')
    .when('клиент отменил запрос', function () {
        this.vm.ou.cancel();
    })
    .when('сервер _(.*)_ отмену', function (state) {
        // state: подтвердил/отклонил
        if (state == 'подтвердил')
            this.vm.serverModel.makeCancel();
        else if (state == 'отклонил')
            this.vm.serverModel.cancelCancel();
        else
            throw new Error('Undefined state: ' + state);
    })
    .then('уточнён статус - ещё и отменяем', function () {
        expect(this.vm.ou.isCanceling()).toBeTruthy();
        //TODO: может ещё в модели что проверить... - хотя есть проверка в модели на доступ к диалогу отмены
    })
    .then('в моделе сервера _(.*)_ доступ к диалогу отмены', function (state) {
        // state: открыт/закрыт
        expect(['открыт', 'закрыт']).toContain(state);

        if (state == 'открыт')
            expect(this.vm.serverModel.isCanceling()).toBeTruthy();

        if (state == 'закрыт')
            expect(this.vm.serverModel.isCanceling()).toBeFalsy();
    })
    .then('запрос доступен для отмены', function () {
        expect(this.vm.ou.isCanceling()).toBeFalsy();
        expect(this.vm.ou.isLoading()).toBeTruthy();
    })
    .then('запрос закончен', function () {
        expect(this.vm.ou.isCanceling()).toBeFalsy();
        expect(this.vm.ou.isLoading()).toBeFalsy();
        expect(this.vm.serverModel.hasRequest()).toBeFalsy();
    });