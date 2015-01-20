/**
 * Created by steb on 10.01.15.
 */
define([
    'SI/M'
], function (M) {
    return function Root(ou) {
        var
            base = new M(ou),
            root = $.extend(
                this,
                base
            );


        base.appRoot = root;
        loadStereotypes(root)
            .done(function () {
                loadFunctions(root)
                    .done(setUpTargetVector)
            });

        window.root = root;
        return root;


        function setUpTargetVector() {
            require([
                'App/Targets/UrlEquility/UrlEquility',
                'App/Targets/UrlEquility/UiLock',
                'App/Targets/ErrorHandeled',
                'App/Targets/RequesterFree'
            ], function (UrlEquility, UiLock, ErrorHandeled, RequesterFree) {
                with (root.targetVector.items) {
                    push((new ErrorHandeled(root))._.
                            addSubTarget(
                            new UiLock(root)._.
                                cFunctionId('.UiLocker')
                        )
                    );

                    push(new RequesterFree()._.
                            cFunctionId('.RequesterFree')
                    );

                    push(new UrlEquility(root)._.
                            cFunctionId('.02.UrlEquility')
                    );
                }
            });
        }
    };


    function loadStereotypes(root) {
        return root.stereotypes.addUrls(
            'App/Stereotypes/',
            ['Urls', 'LoadingState', 'UiState']
        );
    }

    function loadFunctions(root) {
        return root.generalConcept.registrateFunctions(
            'App/Functions/',
            ['UrlEquility', 'RequesterFree', 'UiLocker']
        );
    }
});