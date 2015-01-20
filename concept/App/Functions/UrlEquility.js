/**
 * Created by steb on 15.01.15.
 */
define({
    name: '.02.UrlEquility',
    calculate: function (snapshot) {
        return [
            {
                path: 'ou.vm',
                method: 'isLoading',
                params: [true]
            },
            {
                path: 'ou.m.requester.actions',
                method: 'load',
                params: [snapshot.uiUrl]
            }
        ];
    }
});