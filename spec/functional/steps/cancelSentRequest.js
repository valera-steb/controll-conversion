/**
 * Created on 08.05.2015.
 */
featureSteps('отмена отправленного запроса')
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
    });
