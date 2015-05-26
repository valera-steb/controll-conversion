/**
 * Created on 26.05.2015.
 */
define([
    'SI/executor/ComparatorsWatcher'
], function(ComparatorsWatcher){
    describe('Si/Executor - parts', function(){

        describe('ComparatorsWatcher', function () {
            var cw, stub = {
                callback: function(){}
            };

            beforeEach(function(){
                spyOn(stub, 'callback');
                cw = new ComparatorsWatcher()
            });

            it('должен отлавливать события от добавленных компораторов, вызывая коллбэк по выходу значение за рамки допустимого', function(){

            });

            it('должен отключаться от заданного ключём компаратора', function(){

            });

            it('должен освобождать все компараторы', function(){

            });
        });
    });
});
