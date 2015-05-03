/**
 * Created by steb on 19.02.2015.
 */
featureSteps('отправка запроса')
    .given('инициализированный объект', function () {
        expect(this.m).toBeDefined();
        expect(this.vm).toBeDefined();
    })
    .when('ввели урл "(.*)"', function(url){
        this.vm.ou.url(url);
    })
    .then('пошла загрузка', function(){
        expect(this.vm.ou.isLoading()).toBeTruthy();
    })
    .then('урл будет "(.*)"', function(url){
        expect(this.vm.ou.url()).toBe(url);
    });