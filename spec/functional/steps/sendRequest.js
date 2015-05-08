/**
 * Created on 08.05.2015.
 */
backgroundSteps('отправка запроса background')
    .then('пошла загрузка', function () {
        expect(this.vm.ou.isLoading()).toBeTruthy();
    })
    .then('урл будет "(.*)"', function (url) {
        expect(this.vm.ou.url()).toBe(url);
    });
