/**
 * Created by steb on 10.02.2015.
 */
define([
    'OU/m/ServerContext'
], function(ServerContext){
    /*
    итого, интерфейс и модель сервера:
    .можно толкнуть один гет.
    .пока гетиться можно запросить отмену.

    .гет может:
    ..отработать, и вернуть данные.
    ..выдать ошибку.

    .отмена может:
    ..отработать - и запустить ошибку гета.
    ..отмениться - и выполнить гет !!!- нет, отмениться может и в случае падения сервера
     */
    describe('OU/m/ServerContext', function(){
       it('should be', function(){
           expect(true).toBeTruthy();
       });
    });
});