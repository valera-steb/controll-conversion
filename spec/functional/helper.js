/**
 * Created on 08.05.2015.
 */
define({
    waitOnce: (function(){
        var activated = false;

        return function start(done){
            setTimeout(done, activated ? 10 : 1000); //wait while scripts loading
            activated = true;
        }
    })()
});