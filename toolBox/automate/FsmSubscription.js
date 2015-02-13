/**
 * Created by steb on 20.12.14.
 */
define([
    'toolBox/automate/DelegatesMap'
], function (DelegatesMap) {
    return function FsmSubscription(fsm) {
        var
            delegatesMap = new DelegatesMap(),

            fsmSubscription = $.extend(this, {
                onTransition: function(from, to, handler, context){
                    return delegatesMap.add(makeTransitKey(from, to), handler, context)
                },
                onLeaveState: function(state, handler, context){
                    return delegatesMap.add(makeOutKey(state), handler, context)
                },
                onEnterState: function(state, handler, context){
                    return delegatesMap.add(makeInKey(state), handler, context)
                },

                delegatesMapErrors: delegatesMap.exceptions
            });

        fsm.state.current.subscribe(function FsmSubscriptionHandler(v){
            var s = {
                prev: fsm.state.prev,
                current: v
            };

            delegatesMap.activate(makeOutKey(s.prev), fsm.params, s);
            delegatesMap.activate(makeTransitKey(s.prev, s.current), fsm.params, s);
            delegatesMap.activate(makeInKey(s.current), fsm.params, s);
        });

        return fsmSubscription;


        //-------------------
        // helpers
        function makeOutKey(state){
            return 'out =>' + state;
        }

        function makeTransitKey(from, to){
            return from + '=>' + to;
        }

        function makeInKey(state){
            return 'in =>' + state;
        }
    };
});