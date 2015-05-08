/**
 * Created on 08.05.2015.
 */
featureSteps('отпадание сервера')
    .when('сервер _(.*)_', function (action) {
        var fall = 'отпал';

        expect(['вернулся', fall]).toContain(action);

        this.vm.serverModel.isActive(action!=fall);
    })
    .when('клиент отменил запрос', function(){

    });