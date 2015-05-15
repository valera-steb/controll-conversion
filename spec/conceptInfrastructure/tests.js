/**
 * Created on 15.05.2015.
 */
define([
    'conceptInfrastructure/fixtures/M'
], function(M){
    describe('Чёто из conceptInfrastructure', function(){
        var m;

        beforeEach(function(done){
            m = {};

            M(m).always(done);
        });

        it('компаратор должен надстраиваться над стереотипами из текущего состояния', function(){
            m.testConcept.state.s1 = m.testConcept.stereotypes.map.s1.create(m.testConcept, m.testModel);
            m.testConcept.state.s4 = m.testConcept.stereotypes.map.s4.create(m.testConcept, m.testModel);
            var comparator = m.testConcept.stereotypes.map.c1.create(m.testConcept);

            m.testModel.core.setUp(11);
            expect(comparator.value()).toBeFalsy();

            m.testModel.core.setUp(NaN);
            expect(comparator.value()).toBeTruthy();
        });
    })
});
