/**
 * Created on 26.05.2015.
 */
/*
 обязанность?
 .выбратьт функцию
 .вызвать её
 .с результатом вызвать коллбэк

 альтернативно:
 .выполнить срез
 .выбрать функции
 .выдернуть функции параметры из среза
 .вызвать коллбэк с результатом вызова функции

 либо ещё:
 .получив текущий номер пульсации, с ним далее
 .выбрать функцию, как наиболее приоритетный на тот момент компаратор
 .вызвать функцию, с номером пульсации: инициатором и текущим
 .результат подсунуть в коллбэк

 другими словами, во всех вариантах есть:
 .вызов на входе - который запускает процедуру.
 .коллбэк на выходе, который либо задаёт результаты, либо говорит что всё ок.
 */

define([], function () {
        return function (callbacks, targetVector) {

            return function () {
                var f = search(targetVector()), controlImpact;

                if (f)
                    controlImpact = f();

                if (controlImpact)
                    callbacks.has({controlImpact: controlImpact});
                else
                    callbacks.allComparatorsOk();
            };

            function search(vector) {
                for (var i in vector) {
                    var target = vector[i];

                    if (target.c.value())
                        return target.f;
                }
            };
        }
    }
)
;
