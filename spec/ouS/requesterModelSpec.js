/**
 * Created by steb on 13.02.2015.
 */
define([
    'OU/m/Requester/Model',
    'toolBox/automate/Tasker'
], function (Requester, Tasker) {
    describe('Requester (во взаимодействии с моделью срвера)', function () {
        var
            r, states;

        beforeEach(function () {
            r = new Requester(new Tasker());
            states = r.state.all;
        });

        it('по умолчанию свободен', function () {
            validateFree(r, states);
        });

        it('get-cancel-any => loaded с данными', function () {
            r.actions.get({url: 'url'});
            r.actions.cancel();
            r.server.getDeferred().resolve('data');

            expect(r.state.current()).toBe(states.loaded);
            expect(r.params.data).toBe('data');
        });

        it('get-cancel-done => canceled', function () {
            r.actions.get({url: 'url'});
            r.actions.cancel();
            r.server.cancelDeferred().resolve();

            expect(r.state.current()).toBe(states.canceled);
        });

        it('get-cancel-fail-any-free => свободен', function () {
            with (r.actions)
                get({url: 'url'}), cancel();

            with(r.server)
                cancelDeferred().reject(),
                getDeferred().resolve('data');

            r.actions.free();

            validateFree(r, states);
        });
    });

    function validateFree(r, states) {
        expect(r.state.current()).toBe(states.free);
        expect(JSON.stringify(r.params)).toBe('{}');
    }
});
