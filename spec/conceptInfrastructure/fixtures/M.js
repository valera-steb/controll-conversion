/**
 * Created on 13.05.2015.
 */
define([
    'conceptInfrastructure/fixtures/conceptConfig',
    'conceptInfrastructure/fixtures/ou',
    'SI/M'
], function (conceptConfig, Ou, SiM) {
    return function Init(container){
        c = container || window;

        c.testModel = new Ou();
        c.testConcept = new SiM(c.testModel);

        return c.testConcept.additional.loadConfig(conceptConfig);
    };
});
